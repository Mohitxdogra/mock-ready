import { createContext, useContext, useState, ReactNode } from 'react'
import { ResumeData } from '../components/Resume/types'

interface ResumeContextType {
  resumeData: ResumeData
  updateResumeData: (data: ResumeData) => void
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: ''
  },
  experience: [],
  education: [],
  projects: [],
  skills: []
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    // Try to load saved data from localStorage
    const savedData = localStorage.getItem('resumeData')
    return savedData ? JSON.parse(savedData) : defaultResumeData
  })

  const updateResumeData = (data: ResumeData) => {
    setResumeData(data)
    // Save to localStorage
    localStorage.setItem('resumeData', JSON.stringify(data))
  }

  return (
    <ResumeContext.Provider value={{ resumeData, updateResumeData }}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
} 