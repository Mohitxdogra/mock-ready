import { ResumeData } from './types'
// Removed unused React import

interface ResumePreviewProps {
  data: ResumeData
}

// Create styles for PDF  

// Create PDF Document component

export default function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg text-gray-800">
      {/* Personal Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          <p>{data.personalInfo.email}</p>
          <p>{data.personalInfo.phone}</p>
          <p>{data.personalInfo.location}</p>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Professional Summary</h2>
          <p className="text-gray-700">{data.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{exp.title}</h3>
              <p className="text-gray-600">{exp.company} | {exp.location}</p>
              <p className="text-gray-500 text-sm">{exp.startDate} - {exp.endDate}</p>
              <p className="mt-2 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{edu.school}</h3>
              <p className="text-gray-600">{edu.degree} in {edu.field}</p>
              <p className="text-gray-500 text-sm">{edu.startDate} - {edu.endDate}</p>
              {(edu.percentage || edu.cgpa) && (
                <p className="text-gray-600">
                  {edu.percentage && `Percentage: ${edu.percentage}`}
                  {edu.percentage && edu.cgpa && ' | '}
                  {edu.cgpa && `CGPA: ${edu.cgpa}`}
                </p>
              )}
              <p className="mt-2 text-gray-700">{edu.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-gray-700">{project.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="bg-gray-100 px-2 py-1 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 inline-block"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 