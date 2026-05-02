# DigiTeach Hub - University of Mindanao

A modern blended learning platform built with React, TypeScript, and Tailwind CSS for the University of Mindanao's digital transformation initiative.

## 🎯 Features

- **Centralized Learning Hub**: Unified platform for online and offline learning
- **Interactive Modules**: Engaging multimedia-rich lessons and assessments
- **Student Dashboard**: Track progress and access lessons
- **Teacher Tools**: Create and manage interactive content
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Digital Portfolio**: Showcase student achievements

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Topor24k/DigiTeachHub2.git
cd DigiTeachHub2

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript type checking
- `npm run clean` - Clean distribution files

## 🏗️ Project Structure

```
src/
├── components/
│   ├── LandingPage.tsx      # Main landing page with marquee team section
│   ├── LessonModule.tsx     # Lesson content viewer
│   ├── StudentDashboard.tsx # Student progress tracking
│   └── Login.tsx            # Authentication page
├── context/
│   └── ProgressContext.tsx  # Global progress state management
├── App.tsx                  # Main app component
├── main.tsx                 # Entry point
└── index.css               # Global styles and animations
```

## 🎨 Design System

- **Colors**: University of Mindanao branding (UM Red #A31E22, UM Gold #FFD700)
- **Typography**: Inter, Outfit, Cormorant Garamond, JetBrains Mono
- **Framework**: Tailwind CSS v4 with custom theme
- **Animations**: Framer Motion for smooth interactions

## 🔄 Team Carousel

The Hub Leadership & Mentorship section features a horizontal marquee scroll displaying verified facilitators:

- 7 team members with professional photos
- Smooth infinite scroll animation
- Pause on hover for detailed viewing
- Fully responsive layout

## 📱 Pages

- **Landing Page** (`/`) - Overview and team showcase
- **Login** (`/login`) - User authentication
- **Dashboard** (`/dashboard`) - Student progress tracking
- **Lessons** (`/lessons/:id`) - Interactive lesson modules

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4 with @tailwindcss/vite
- **Build Tool**: Vite 6
- **Routing**: React Router DOM v7
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI Integration**: Google GenAI SDK

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git push origin main

# Connect repository to Vercel Dashboard
# Deployment happens automatically on push
```

### Manual Build & Deployment

```bash
npm run build
# Output in dist/ folder
```

## 📦 Environment Variables

Create a `.env.local` file for development:

```
VITE_API_URL=http://localhost:3001
```

For production, set environment variables in Vercel Dashboard.

## 👥 Team

**Hub Leadership & Mentorship:**
- Hershey Nicolle Tabanao - UI/UX Facilitator
- Shuvy Miles Espiritouso - Dev Facilitator
- John Louise Clark A. Panes - Tech Specialist
- Donna Faye A. Casakit - Design Lead
- Richard Jr. R. Layar - Multimedia Strategist
- Reyshil M. Manibad - Assessment Expert
- Ruvie Ann C. Alba - Mentorship Coordinator

## 📜 License

Proprietary - University of Mindanao

## 📧 Support

For inquiries about DigiTeach Hub:
- Email: digiteach@umindanao.edu.ph
- Location: UM CTE Office, Main University Campus

---

**© 2026 UM DigiTeach Hub · University of Mindanao. All rights reserved.**
