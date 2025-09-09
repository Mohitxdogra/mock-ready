# Mock Ready

![Vite](https://img.shields.io/badge/Vite-6.2.2-blue?logo=vite)
![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-blue?logo=tailwindcss)

A modern, full-stack mock interview and resume builder platform powered by AI. Practice interviews, build professional resumes, and get real-time feedback to ace your next job opportunity.

## ✨ Features

- 🧑‍💻 **AI-Powered Mock Interviews** - Technical & behavioral interview practice with Gemini and Groq APIs
- 📝 **Resume Builder** - Interactive resume creation with live preview and multiple templates
- 🎤 **Voice & Video Recording** - Answer questions via microphone or webcam
- 🤖 **Real-Time AI Feedback** - Instant scoring and personalized improvement suggestions
- 📊 **Performance Analytics** - Track your progress with detailed statistics
- 🔒 **Secure Authentication** - User management with Clerk
- ☁️ **Cloud Storage** - Save your data securely with Firebase
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 📄 **PDF Export** - Download your resume and interview feedback
- 🔔 **Smart Notifications** - Toast notifications for better UX

## 🚀 Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for blazing fast development
- TailwindCSS for styling
- Radix UI for accessible components
- Framer Motion for smooth animations

**Backend & Services:**
- Firebase (Firestore, Authentication)
- Clerk for user management
- Gemini API for AI interviews
- Groq API for chat-based interactions

**Additional Tools:**
- React Router for navigation
- React Hook Form for form handling
- Zod for validation
- Axios for API calls
- Sonner for notifications

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm/yarn
- Firebase project with Firestore enabled
- Clerk account for authentication
- Gemini API key
- Groq API key

## ⚡ Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Mohitxdogra/mock-ready.git
cd mock-ready
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GROQ_API_KEY=your_groq_api_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
```

### 4. Start the development server

```bash
pnpm run dev
```

Visit [http://localhost:5173](http://localhost:5173) to see your app in action! 🎉

## 🏗️ Project Structure

```
mock-ready/
├── public/
│   ├── index.html
│   └── assets/
│       ├── img/
│       ├── svg/
│       └── client.svg
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   │   ├── Chatbot.tsx          # Groq chat integration
│   │   ├── ContactForm.tsx      # Contact form component
│   │   ├── Resume/              # Resume builder components
│   │   ├── ui/                  # Reusable UI components
│   │   └── motion/              # Animation components
│   ├── config/
│   │   └── firebase.config.ts   # Firebase configuration
│   ├── context/
│   │   └── ResumeContext.tsx    # Resume state management
│   ├── handlers/
│   │   └── auth-handler.tsx     # Authentication logic
│   ├── hooks/
│   │   └── use-toast.ts         # Toast notification hook
│   ├── layouts/
│   │   ├── main-layout.tsx
│   │   ├── auth-layout.tsx
│   │   ├── protected-routes.tsx
│   │   └── public-layout.tsx
│   ├── routes/
│   │   ├── home.tsx             # Landing page
│   │   ├── dashboard.tsx        # User dashboard
│   │   ├── mock-interview-page.tsx
│   │   ├── sign-in.tsx          # Authentication pages
│   │   ├── sign-up.tsx
│   │   └── ...
│   ├── scripts/
│   │   └── index.ts             # Gemini API integration
│   └── types/
│       └── index.ts             # TypeScript definitions
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## 🎯 How to Use

1. **Sign Up/Sign In** - Create an account using Clerk authentication
2. **Choose Your Path**:
   - **Mock Interview**: Practice technical or behavioral questions
   - **Resume Builder**: Create a professional resume with live preview
3. **Record Your Responses** - Use microphone or webcam to answer questions
4. **Get AI Feedback** - Receive instant scoring and improvement suggestions
5. **Track Progress** - View your performance analytics on the dashboard
6. **Export Results** - Download your resume or interview feedback as PDF

## 🔧 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint
- `pnpm preview` - Preview production build

## 🚀 Deployment

This project is optimized for deployment on modern platforms:

### Vercel (Recommended)

```bash
pnpm build
vercel --prod
```

### Other Platforms

The project works with Netlify, Railway, and other static hosting providers. Just run `pnpm build` and deploy the `dist` folder.

## 🔑 API Setup Guide

### Firebase Setup
1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Firestore Database
3. Get your configuration keys from Project Settings
4. Add them to your `.env` file

### Clerk Setup
1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy the publishable key to your `.env` file
4. Configure sign-in/sign-up components

### AI API Setup
- **Gemini**: Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Groq**: Get API key from [Groq Console](https://console.groq.com)

## 🤝 Contributing

We love contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow conventional commit messages
- Use TypeScript for type safety
- Write meaningful component names
- Test your changes thoroughly
- Update documentation when needed

## 🐛 Troubleshooting

### Common Issues

**API Key Errors**
- Double-check all environment variables in your `.env` file
- Ensure API keys have proper permissions

**Firebase Connection Issues**
- Verify Firebase project configuration
- Check Firestore security rules
- Ensure billing is enabled for Firebase project

**Clerk Authentication Problems**
- Confirm publishable key is correct
- Check Clerk dashboard configuration
- Verify domain settings in Clerk

**Build Errors**
- Run `pnpm install` to ensure dependencies are installed
- Clear node_modules and reinstall if needed
- Check Node.js version compatibility

### Getting Help

- 🐛 [Report Issues](https://github.com/Mohitxdogra/mock-ready/issues)
- 💬 [Start a Discussion](https://github.com/Mohitxdogra/mock-ready/discussions)
- 📧 Contact: [Mohitxdogra](https://github.com/Mohitxdogra)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who helped build Mock Ready
- Inspired by the need for accessible interview preparation tools
- Special thanks to the open-source community for the amazing tools and libraries

---

<div align="center">

**Made with ❤️ by [Mohitxdogra](https://github.com/Mohitxdogra)**

If this project helped you, please consider giving it a ⭐!

</div>
