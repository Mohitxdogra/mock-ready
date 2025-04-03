import { useState } from 'react'
import { ResumeData } from './types'
import SpeechToText from './SpeechToText'

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [] = useState('personal')

  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    })
  }

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          title: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    })
  }

  const updateExperience = (index: number, field: string, value: string) => {
    const newExperience = [...data.experience]
    newExperience[index] = {
      ...newExperience[index],
      [field]: value
    }
    onChange({
      ...data,
      experience: newExperience
    })
  }

  const addEducation = () => {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          school: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          description: '',
          percentage: '',
          cgpa: ''
        }
      ]
    })
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const newEducation = [...data.education]
    newEducation[index] = {
      ...newEducation[index],
      [field]: value
    }
    onChange({
      ...data,
      education: newEducation
    })
  }



  const updateSkills = (skills: string) => {
    const skillsArray = skills.split(',').map(skill => skill.trim()).filter(Boolean)
    onChange({
      ...data,
      skills: skillsArray
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Personal Information</h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Full Name"
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
            <SpeechToText onTextChange={(text) => updatePersonalInfo('fullName', text)} field="Full Name" />
          </div>
          <input
            type="email"
            placeholder="Email"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="text"
            placeholder="Location"
            value={data.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="LinkedIn Username"
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
              />
              <SpeechToText onTextChange={(text) => updatePersonalInfo('linkedin', text)} field="LinkedIn Username" />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="GitHub Username"
                value={data.personalInfo.github}
                onChange={(e) => updatePersonalInfo('github', e.target.value)}
                className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
              />
              <SpeechToText onTextChange={(text) => updatePersonalInfo('github', text)} field="GitHub Username" />
            </div>
          </div>
          <div className="flex gap-2">
            <textarea
              placeholder="Professional Summary"
              value={data.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700 h-32"
            />
            <SpeechToText onTextChange={(text) => updatePersonalInfo('summary', text)} field="Professional Summary" />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Experience</h2>
          <button
            onClick={addExperience}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Add Experience
          </button>
        </div>
        {data.experience.map((exp, index) => (
          <div key={index} className="space-y-4 mb-6 p-4 bg-gray-800 rounded">
            <input
              type="text"
              placeholder="Job Title"
              value={exp.title}
              onChange={(e) => updateExperience(index, 'title', e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => updateExperience(index, 'company', e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="text"
              placeholder="Location"
              value={exp.location}
              onChange={(e) => updateExperience(index, 'location', e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Start Date"
                value={exp.startDate}
                onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="text"
                placeholder="End Date"
                value={exp.endDate}
                onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div className="flex gap-2">
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600 h-32"
              />
              <SpeechToText onTextChange={(text) => updateExperience(index, 'description', text)} field="Experience Description" />
            </div>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Education</h2>
          <button
            onClick={addEducation}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Add Education
          </button>
        </div>
        {data.education.map((edu, index) => (
          <div key={index} className="space-y-4 mb-6 p-4 bg-gray-800 rounded">
            <input
              type="text"
              placeholder="School"
              value={edu.school}
              onChange={(e) => updateEducation(index, 'school', e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="text"
              placeholder="Field of Study"
              value={edu.field}
              onChange={(e) => updateEducation(index, 'field', e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Start Date"
                value={edu.startDate}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="text"
                placeholder="End Date"
                value={edu.endDate}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Percentage (e.g., 85%)"
                value={edu.percentage}
                onChange={(e) => updateEducation(index, 'percentage', e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
              <input
                type="text"
                placeholder="CGPA (e.g., 8.5)"
                value={edu.cgpa}
                onChange={(e) => updateEducation(index, 'cgpa', e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>
            <div className="flex gap-2">
              <textarea
                placeholder="Description"
                value={edu.description}
                onChange={(e) => updateEducation(index, 'description', e.target.value)}
                className="flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600 h-32"
              />
              <SpeechToText onTextChange={(text) => updateEducation(index, 'description', text)} field="Education Description" />
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Skills</h2>
        <div className="flex gap-2">
          <textarea
            placeholder="Enter skills (comma-separated)"
            value={data.skills.join(', ')}
            onChange={(e) => updateSkills(e.target.value)}
            className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700 h-32"
          />
          <SpeechToText onTextChange={(text) => updateSkills(text)} field="Skills" />
        </div>
      </div>
    </div>
  )
}