import { useState, useRef } from 'react'
import { useResume } from '../../context/ResumeContext'
import ResumeForm from './ResumeForm'
import ResumePreview from './ResumePreview'
import toPDF from 'react-to-pdf'

export default function ResumeBuilder() {
  const { resumeData, updateResumeData } = useResume()
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form')
  const previewRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return

    try {
      await toPDF(previewRef, {
        filename: `${resumeData.personalInfo.fullName || 'resume'}.pdf`,
        page: {
          format: 'a4',
          orientation: 'portrait'
        }
      })
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Resume Builder
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Create a professional resume in minutes with our easy-to-use builder
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
              activeTab === 'form'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
              Edit Resume
            </span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <span className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              Preview
            </span>
          </button>
          {activeTab === 'preview' && (
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg shadow-green-500/30 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download PDF
            </button>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-full mx-auto">
          <div className={`transition-all duration-300 ${activeTab === 'form' ? 'block' : 'hidden xl:block'}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700">
              <ResumeForm data={resumeData} onChange={updateResumeData} />
            </div>
          </div>
          <div className={`transition-all duration-300 ${activeTab === 'preview' ? 'block' : 'hidden xl:block'}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700">
              <div ref={previewRef} className="bg-white rounded-lg">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 