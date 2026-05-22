# Personal Portfolio Website - PRD

## 1. Product Overview

### 1.1 Product Name
Mikhil Sai N Personal Portfolio

### 1.2 Product Description
A modern, responsive personal portfolio website showcasing Mikhil Sai N's skills, projects, experience, achievements, and contact information. Targeted at potential employers, collaborators, and recruiters in AI/ML, full-stack development, and tech fields. Features smooth animations, dark/light theme support, particle backgrounds, scroll progress indicator, and a functional contact form with backend email/DB integration.

### 1.3 Version
1.0

### 1.4 Owner
Mikhil Sai N (Developer)

## 2. Objectives & Goals

### 2.1 Business Objectives
- Increase inbound opportunities (job offers, collaborations, freelance)
- Showcase AI/ML and full-stack expertise through live projects
- Establish professional online presence
- Demonstrate modern web development skills (Next.js, Tailwind, animations)

### 2.2 Success Metrics
- Contact form submissions: 5+/month
- Resume downloads: 10+/month
- GitHub repo views/referrals increase
- Page views: 100+/month (via Vercel Analytics)
- Bounce rate < 40%

## 3. Target Audience

- Tech Recruiters / HR at AI/ML companies
- Engineering Managers
- Potential collaborators on open-source/hackathons
- Students/peers seeking inspiration/portfolio examples

## 4. Key Features & Sections

### 4.1 Core Sections (from app/page.tsx)
| Section | Purpose | Key Elements |
|---------|---------|--------------|
| Navbar | Navigation | Home, Projects, Experience, Contact; Theme toggle |
| Hero | First impression | Name, tagline ('Building the Future with AI'), typing animation (Full Stack Developer \| AI/ML Enthusiast \| Problem Solver), CTAs (View Projects, Download Resume, Contact) |
| About | Background | Passion for AI/ML, problem-solving, stats (2+ years exp, 10+ projects, 4 hackathon wins) |
| Skills | Technical stack | Icons/animations for tech skills |
| Projects | Portfolio showcase | 6 featured projects (CrimeRadar AI, EcoWattAI, Nokia OptiFlow, S.H.A.D.O.W deepfake detection, Smart Wildlife IoT, Web LMS); GitHub/live links |
| Experience | Timeline | Professional/academic experience |
| Achievements | Credibility | Hackathon wins, awards |
| Certifications | Qualifications | Relevant certs |
| Publication | Thought leadership | Research papers/publications |
| Contact | Lead gen | Form → Email + MongoDB save |
| Footer | Legal/Links | ©, social links |

### 4.2 UI/UX Features
- Dark/Light/System theme toggle (next-themes)
- Particle background + floating orbs + scan lines
- Framer Motion animations (staggered reveals, mouse tracking, hover effects)
- Scroll progress bar
- Responsive (mobile-first, Tailwind)
- Glassmorphism effects, gradient glows
- Typing animation in Hero

### 4.3 Backend Features
- Express.js server on port 4000
- /api/contact POST: Rate-limited form handling (validator, sanitize)
- Email via Nodemailer (Gmail SMTP)
- MongoDB persistence (mongoose Message model)
- Health check endpoint

## 5. Technical Stack

### 5.1 Frontend
- Next.js 16.2 (App Router)
- TypeScript
- Tailwind CSS 4 + shadcn/ui components
- Framer Motion (animations)
- Lucide React (icons)
- React Hook Form + Zod (forms)
- Recharts (potential charts)
- Custom hooks (useInView, useMobile, etc.)

### 5.2 Backend
- Node.js / Express.js
- MongoDB / Mongoose
- Nodemailer
- express-rate-limit
- cors, dotenv, validator

### 5.3 Deployment
- Vercel (frontend + Analytics)
- Local Node server (backend)

### 5.4 Fonts & Assets
- Geist / Geist Mono (next/font/google)
- Public assets: Resume PDF, project images (CREONIX.jpeg, RedShield.png, etc.)

## 6. User Flows

### 6.1 Primary Flow: Visitor → Lead
1. Land on Hero → Impressed by animations/tagline
2. Scroll to Projects/About → Review work
3. Download Resume → or Contact form → Submit → Email/DB saved → Success toast

### 6.2 Admin Flow
- npm run dev (frontend:3000)
- npm run server (backend:4000)
- Monitor Vercel Analytics

## 7. Non-Functional Requirements

- Performance: Core Web Vitals >90
- Accessibility: ARIA labels, keyboard nav
- SEO: Metadata, OpenGraph
- Security: Rate limiting, input sanitization, CORS
- Mobile: Fully responsive
- Lighthouse: 95+ scores

## 8. Future Enhancements (MVP+)

- Blog section (MDX)
- Interactive project demos (iframes)
- Testimonials carousel
- Analytics dashboard
- PWA support
- Multi-language
- API for projects (CMS integration)

## 9. Risks & Dependencies

- Backend env vars (.env): EMAIL_USER/PASS, MONGODB_URI
- Vercel deployment for prod analytics
- Image optimization (Next Image)

## 10. Timeline (Completed)

- MVP: Built & functional
- Polish: Animations, UI refinements
- Backend: Contact integration

---