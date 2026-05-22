import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'
import validator from 'validator'

let isConnected = false
let MessageModel: mongoose.Model<any> | null = null

// Initialize MongoDB Connection (Serverless optimized)
const connectMongo = async () => {
  if (isConnected && MessageModel) return MessageModel

  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) {
    console.warn('Backend warning: No MONGODB_URI set')
    return null
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 3000, // Time out after 3 seconds instead of 30s
      })
      isConnected = true
    }

    // Define schema safely for hot-reloads
    const messageSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true },
      message: { type: String, required: true },
      date: { type: Date, default: Date.now }
    })

    MessageModel = mongoose.models.Message || mongoose.model('Message', messageSchema)
    return MessageModel
  } catch (error) {
    console.error('MongoDB connection failed:', error)
    return null
  }
}

// Helper to sanitize input
function sanitize(value: string) {
  return validator.escape(String(value || '')).trim()
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, message: 'Please fill all fields' }, { status: 400 })
    }

    const cleanName = sanitize(name)
    const cleanEmail = sanitize(email)
    const cleanMessage = sanitize(message)

    if (!validator.isEmail(cleanEmail)) {
      return NextResponse.json({ success: false, message: 'Invalid email address' }, { status: 400 })
    }

    if (cleanName.length < 2 || cleanMessage.length < 10) {
      return NextResponse.json({ success: false, message: 'Name or message is too short' }, { status: 400 })
    }

    // 1. Send Email using Nodemailer
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const mailTransport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: Number(process.env.EMAIL_PORT || 465),
        secure: process.env.EMAIL_SECURE !== 'false',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      })

      await mailTransport.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECIPIENT || 'mikhilsai526@gmail.com',
        subject: `Portfolio Contact from ${cleanName}`,
        text: `Name: ${cleanName}\nEmail: ${cleanEmail}\nMessage:\n${cleanMessage}`,
        replyTo: cleanEmail,
      })
    }

    // 2. Save to Database Safely (Don't let this crash the response)
    try {
      const Model = await connectMongo()
      if (Model) {
        await Model.create({ name: cleanName, email: cleanEmail, message: cleanMessage })
      }
    } catch (dbError) {
      console.error('Database save failed/timeout, but email was sent:', dbError)
    }

    // Always return success if the email works
    return NextResponse.json({ success: true, message: 'Message sent successfully!' }, { status: 200 })
    
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json({ success: false, message: 'Something went wrong.' }, { status: 500 })
  }
}
