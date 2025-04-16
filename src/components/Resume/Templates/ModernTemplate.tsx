import { ResumeData } from '../types'

export default function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-2xl text-gray-800 space-y-8 font-sans tracking-wide">
      <div>
        <h1 className="text-4xl font-extrabold text-blue-800">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
          <span>{data.personalInfo.github}</span>
          <span>{data.personalInfo.linkedin}</span>
        </div>
      </div>

      {data.personalInfo.summary && (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Summary</h2>
          <p>{data.personalInfo.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{exp.title}</h3>
              <p className="text-gray-600">{exp.company} | {exp.location}</p>
              <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
              <p className="mt-2">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.education.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{edu.school}</h3>
              <p className="text-gray-600">{edu.degree} in {edu.field}</p>
              <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
              {(edu.percentage || edu.cgpa) && (
                <p className="text-sm">
                  {edu.percentage && `Percentage: ${edu.percentage}`}
                  {edu.percentage && edu.cgpa && ' | '}
                  {edu.cgpa && `CGPA: ${edu.cgpa}`}
                </p>
              )}
              <p>{edu.description}</p>
            </div>
          ))}
        </div>
      )}

      {data.projects.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-bold">{project.name}</h3>
              <p>{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="bg-blue-100 px-2 py-1 rounded text-xs">{tech}</span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm underline">
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 rounded">{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
