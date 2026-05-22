const express = require('express')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')
const validator = require('validator')
const Message = require('./models/message')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000'

const requiredEnv = ['EMAIL_USER', 'EMAIL_PASS']
const missingEnv = requiredEnv.filter((key) => !process.env[key])
if (missingEnv.length > 0) {
  console.warn(`Missing EMAIL vars - email disabled: ${missingEnv.join(', ')}`)
}

let mailTransport = null
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  mailTransport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: Number(process.env.EMAIL_PORT || 465),
    secure: process.env.EMAIL_SECURE !== 'false',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
  console.log('Email transport ready')
} else {
  console.log('Email disabled')
}

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests. Try later.' },
})

app.use(cors({ origin: CLIENT_ORIGIN }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/contact', limiter)

function sanitize(value) {
  return validator.escape(String(value || '')).trim()
}

function createResponse(res, status, success, message) {
  return res.status(status).json({ success, message })
}

function isValidMongoUri(uri) {
  if (!uri) return false
  const trimmed = uri.trim()
  if (!trimmed.startsWith('mongodb://') && !trimmed.startsWith('mongodb+srv://')) return false

  // Fixed regex - proper escapes for JS string
  const regexStr = '^mongodb(?:\\+srv)?:\\/\\/([^\\/:@]+)(?::([^@\\/]*))?@([^@\\/]+)(?:\\/.*)?$'
  const match = trimmed.match(regexStr)
  if (!match) return false

  const host = match[3]
  if (!host || !host.includes('.')) return false
  return true
}

async function connectMongo() {
  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) {
    console.log('No MONGODB_URI set')
    return null
  }
  if (!isValidMongoUri(uri)) {
    console.warn('Invalid MONGODB_URI, skipping DB')
    return null
  }

  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')
    return Message
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    return null
  }
}

let MessageModel = null
connectMongo().then((model) => {
  MessageModel = model
})

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return createResponse(res, 400, false, 'Fill all fields')
  }

  const cleanName = sanitize(name)
  const cleanEmail = sanitize(email)
  const cleanMessage = sanitize(message)

  if (!validator.isEmail(cleanEmail)) {
    return createResponse(res, 400, false, 'Invalid email')
  }

  if (cleanName.length < 2 || cleanMessage.length < 10) {
    return createResponse(res, 400, false, 'Name/message too short')
  }

  const mailOptions = {
    from: process.env.EMAIL_USER || cleanEmail,
    to: process.env.EMAIL_RECIPIENT || 'mikhilsai526@gmail.com',
    subject: `Contact from ${cleanName}`,
    text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nMessage:\n${cleanMessage}`,
    replyTo: cleanEmail,
  }

  try {
    if (mailTransport) {
      await mailTransport.sendMail(mailOptions)
      console.log('Email sent successfully')
    }

    if (MessageModel) {
      await MessageModel.create({ name: cleanName, email: cleanEmail, message: cleanMessage })
      console.log('Saved to database')
    }

    createResponse(res, 200, true, 'Message processed successfully')
  } catch (error) {
    console.error('Contact form error:', error)
    createResponse(res, 500, false, 'Server error')
  }
})

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'Contact server ready',
    email: !!mailTransport,
    mongodb: !!MessageModel,
  })
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
  console.log('Contact endpoint ready')
})

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Stop the other process or set PORT to a different value.`)
  } else {
    console.error('Server startup error:', error)
  }
  process.exit(1)
})

