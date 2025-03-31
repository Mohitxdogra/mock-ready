import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-white">
          MockReady
        </Link>
        <div className="space-x-4">
          <Link to="/resume" className="text-gray-300 hover:text-white">
            Resume
          </Link>
          <Link to="/interview" className="text-gray-300 hover:text-white">
            Interview
          </Link>
        </div>
      </div>
    </nav>
  )
} 