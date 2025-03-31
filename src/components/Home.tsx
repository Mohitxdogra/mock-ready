import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to MockReady</h1>
      <p className="text-xl text-gray-300 mb-8">
        Your one-stop solution for resume building and interview preparation
      </p>
      <div className="space-x-4">
        <Link
          to="/resume"
          className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
        >
          Build Resume
        </Link>
        <Link
          to="/interview"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start Interview
        </Link>
      </div>
    </div>
  )
} 