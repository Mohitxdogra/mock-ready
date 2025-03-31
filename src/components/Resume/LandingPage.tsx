import { Link } from 'react-router-dom'
import { useTheme } from './theme-provider'
import { FAQ } from './FAQ'
import { Testimonials } from './Testimonials'
import { MarqueeLogos } from './MarqueeLogos'


export default function LandingPage() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-pink-500">Mock</span>
              <span className="text-white">Ready</span>
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/create" className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-md text-white">
              Create Resume
            </Link>
            <a href="#features" className="text-gray-300 hover:text-white">Features</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white">Testimonials</a>
            <a href="#faq" className="text-gray-300 hover:text-white">FAQ</a>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-300 hover:text-white"
            >
              {theme === "dark" ? "🌞" : "🌙"}
            </button>
          </div>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">
                <span className="text-pink-500">Mock Ready</span>{' '}
                <span className="text-white">Master Your</span>
                <br />
                <span className="text-[#3B82F6]">Career Journey</span>
              </h1>
              <p className="text-gray-400 text-xl mb-8">
                Create Professional Resumes in Minutes with Our Smart Builder!
              </p>
              <Link
                to="/create"
                className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-md text-lg font-semibold"
              >
                Start Free Trial Now!
              </Link>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-white">Free Forever</h3>
                  <p className="text-gray-400">Create unlimited resumes at no cost</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-white">PDF Export</h3>
                  <p className="text-gray-400">Download in professional format</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-2 text-white">No Login</h3>
                  <p className="text-gray-400">Start instantly, no registration</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-white">Free Forever Plan</h3>
                <p className="text-white/90 mb-4">Perfect for students and job seekers</p>
                <Link
                  to="/create"
                  className="block w-full bg-white text-pink-500 hover:bg-gray-100 py-2 rounded-md font-semibold text-center"
                >
                  Start Creating Now
                </Link>
                <div className="mt-6 space-y-2">
                  {[
                    "Unlimited Resume Creation",
                    "Professional PDF Export",
                    "Multiple Templates",
                    "Real-time Preview",
                    "No Credit Card Required",
                    "No Hidden Fees"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center text-white">
                      <svg className="h-5 w-5 text-white mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <MarqueeLogos />
        <Testimonials />
        <FAQ />
      </main>
    </div>
  )
} 