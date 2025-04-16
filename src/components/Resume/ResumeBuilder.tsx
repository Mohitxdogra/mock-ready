import { useState, useRef } from 'react'
import { useResume } from '../../context/ResumeContext'
import ResumeForm from './ResumeForm'
import ResumePreview from './ResumePreview'
import toPDF from 'react-to-pdf'

export default function ResumeBuilder() {
  const { resumeData, updateResumeData } = useResume()
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form')
  const [selectedTemplate, setSelectedTemplate] = useState<'modern' | 'classic' | 'minimal'>('modern')
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Resume Builder</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Create a professional resume in minutes with our easy-to-use builder
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
              activeTab === 'form'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Edit Resume
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-3 rounded-lg transition-all transform hover:scale-105 ${
              activeTab === 'preview'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Preview
          </button>

          {activeTab === 'preview' && (
            <button
              onClick={handleDownloadPDF}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg shadow-green-500/30"
            >
              Download PDF
            </button>
          )}
        </div>

        {/* Template Switcher */}
        {activeTab === 'preview' && (
          <div className="flex justify-center gap-4 mb-8">
            {['modern', 'classic', 'minimal'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedTemplate(type as 'modern' | 'classic' | 'minimal')}
                className={`px-4 py-2 rounded-md border ${
                  selectedTemplate === type
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-blue-600 border-blue-600'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)} Template
              </button>
            ))}
          </div>
        )}

        {/* Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 max-w-full mx-auto">
          <div className={`transition-all duration-300 ${activeTab === 'form' ? 'block' : 'hidden xl:block'}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700">
              <ResumeForm data={resumeData} onChange={updateResumeData} />
            </div>
          </div>

          <div className={`transition-all duration-300 ${activeTab === 'preview' ? 'block' : 'hidden xl:block'}`}>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-gray-700">
              <div ref={previewRef} className="bg-white rounded-lg">
                <ResumePreview data={resumeData} selectedTemplate={selectedTemplate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
