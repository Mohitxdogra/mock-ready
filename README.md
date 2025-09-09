Mock Ready

Mock Ready is a modern web application for technical and behavioral interview preparation, resume building, and job readiness. It features live AI feedback, scoring, webcam/mic support, and seamless data storage with Firebase.

## Features

- 🧑‍💻 Mock Interview Practice (Technical & Behavioral)
- 📝 Resume Builder & Preview
- 🎤 Answer via Microphone or Webcam
- 🤖 Live AI Feedback & Scoring
- 🔒 Authentication with Clerk
- ☁️ Data storage with Firebase
- ⚡ Built with React, Vite, Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- pnpm (or npm/yarn)
- Firebase project (Firestore enabled)
- Clerk account (for authentication)

### Installation

```bash
pnpm install
```

### Environment Setup

Create a `.env.local` file and add your Firebase and Clerk credentials:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### Running Locally

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

- Sign in with Clerk authentication.
- Choose a mock interview or resume builder.
- Answer questions by speaking (mic) or recording (webcam).
- Get instant AI feedback and score.
- Save your answers and resume to Firebase.

## Project Structure

- `src/components/` – UI components (interview, resume, webcam, mic, etc.)
- `src/routes/` – Application pages
- `src/config/` – Firebase configuration
- `src/context/` – Global state/context
- `public/` – Static assets

## Deployment

You can deploy to Vercel, Netlify, or any static hosting provider.

## Contributing

Pull requests and issues are welcome! Please follow conventional commit messages and code style.

## License

MIT

## Contact

For questions or support, open an issue or contact [Mohitxdogra](https://github.com/Mohitxdogra).
