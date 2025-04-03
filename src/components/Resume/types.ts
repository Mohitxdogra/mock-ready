export interface Experience {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
  description: string
  percentage: string
  cgpa: string
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  link: string
}

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  location: string
  summary: string
  linkedin: string
  github: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  projects: Project[]
  skills: string[]
} 