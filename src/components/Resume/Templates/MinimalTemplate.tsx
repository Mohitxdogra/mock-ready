import { ResumeData } from '../types'

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-gray-50 p-6 rounded-lg text-gray-800 max-w-3xl mx-auto font-light">
      <div className="border-b pb-4 mb-4">
        <h1 className="text-3xl font-semibold">{data.personalInfo.fullName}</h1>
        <div className="text-sm text-gray-600 mt-1">
          {data.personalInfo.email} • {data.personalInfo.phone} • {data.personalInfo.location}
        </div>
        <div className="text-sm text-gray-500">{data.personalInfo.github} | {data.personalInfo.linkedin}</div>
      </div>

      {data.personalInfo.summary && (
        <div className="mb-4">
          <h2 className="text-md font-medium text-gray-700">Summary</h2>
          <p className="text-sm">{data.personalInfo.summary}</p>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-md font-medium text-gray-700">Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-2">
            <div className="font-medium">{exp.title} - {exp.company}</div>
            <div className="text-sm text-gray-600">{exp.startDate} to {exp.endDate}</div>
            <p className="text-sm">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-md font-medium text-gray-700">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="font-medium">{edu.school}</div>
            <div className="text-sm text-gray-600">{edu.degree}, {edu.field}</div>
            <div className="text-sm">{edu.startDate} - {edu.endDate}</div>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-md font-medium text-gray-700">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mb-2">
            <div className="font-medium">{project.name}</div>
            <p className="text-sm">{project.description}</p>
            {project.link && <a href={project.link} className="text-blue-500 text-sm underline">View</a>}
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-md font-medium text-gray-700">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {data.skills.map((skill, index) => (
            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-xs">{skill}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
