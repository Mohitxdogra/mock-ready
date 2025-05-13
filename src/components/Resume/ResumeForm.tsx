import { useState } from 'react'
import { ResumeData } from './types'

interface ResumeFormProps {
  data: ResumeData
  onChange: (data: ResumeData) => void
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [skillInput, setSkillInput] = useState('')

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

  const deleteExperience = (index: number) => {
    const newExperience = data.experience.filter((_, i) => i !== index)
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

  const deleteEducation = (index: number) => {
    const newEducation = data.education.filter((_, i) => i !== index)
    onChange({
      ...data,
      education: newEducation
    })
  }


  const deleteSkill = (skill: string) => {
    const newSkills = data.skills.filter((s) => s !== skill)
    onChange({
      ...data,
      skills: newSkills
    })
  }

  // Project handlers
  const addProject = () => {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        {
          name: '',
          description: '',
          technologies: [],
          link: ''
        }
      ]
    })
  }

  const updateProject = (index: number, field: string, value: string) => {
    const newProjects = [...data.projects]
    if (field === 'technologies') {
      newProjects[index].technologies = value.split(',').map((tech: string) => tech.trim()).filter(Boolean)
    } else if (field === 'name') {
      newProjects[index].name = value
    } else if (field === 'description') {
      newProjects[index].description = value
    } else if (field === 'link') {
      newProjects[index].link = value
    }
    onChange({
      ...data,
      projects: newProjects
    })
  }

  const deleteProject = (index: number) => {
    const newProjects = data.projects.filter((_, i) => i !== index)
    onChange({
      ...data,
      projects: newProjects
    })
  }

  const addSkill = () => {
    const newSkill = skillInput.trim()
    if (newSkill && !data.skills.includes(newSkill)) {
      onChange({
        ...data,
        skills: [...data.skills, newSkill]
      })
      setSkillInput('')
    }
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
          <input
            type="text"
            placeholder="LinkedIn Profile"
            value={data.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
          <input
            type="text"
            placeholder="GitHub Profile"
            value={data.personalInfo.github}
            onChange={(e) => updatePersonalInfo('github', e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
          <div className="flex gap-2">
            <textarea
              placeholder="Professional Summary"
              value={data.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700 h-32"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Experience</h2>
          <button
            onClick={addExperience}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
            </div>
            <button
              onClick={() => deleteExperience(index)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
            >
              Delete Experience
            </button>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Education</h2>
          <button
            onClick={addEducation}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
            </div>
            <button
              onClick={() => deleteEducation(index)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
            >
              Delete Education
            </button>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Projects</h2>
          <button
            onClick={addProject}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Project
          </button>
        </div>
        {data.projects.map((project, index) => (
          <div key={index} className="space-y-4 mb-6 p-4 bg-gray-800 rounded">
            <input
              type="text"
              placeholder="Project Name"
              value={project.name}
              onChange={(e) => updateProject(index, 'name', e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <textarea
              placeholder="Project Description"
              value={project.description}
              onChange={(e) => updateProject(index, 'description', e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 h-24"
            />
            <input
              type="text"
              placeholder="Technologies (comma-separated)"
              value={project.technologies.join(', ')}
              onChange={(e) => updateProject(index, 'technologies', e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <input
              type="text"
              placeholder="Project Link (optional)"
              value={project.link}
              onChange={(e) => updateProject(index, 'link', e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
            />
            <button
              onClick={() => deleteProject(index)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mt-2"
            >
              Delete Project
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Skills</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter a skill"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
            className="flex-1 p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add Skill
          </button>
        </div>
        {data.skills.length > 0 && (
          <div className="mt-4">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex justify-between items-center mb-2">
                <span className="text-white">{skill}</span>
                <button
                  onClick={() => deleteSkill(skill)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete Skill
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
