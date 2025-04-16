import { ResumeData } from './types'
// Removed unused React import

interface ResumePreviewProps {
  data: ResumeData
}

// Create styles for PDF  

// Create PDF Document component

export default function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="bg-white p-10 rounded-xl shadow-xl max-w-4xl mx-auto text-gray-800 font-sans">
      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-4xl font-bold text-blue-800">{data.personalInfo.fullName}</h1>
        <div className="text-sm text-gray-600 mt-2 space-y-1">
          <div>{data.personalInfo.email} | {data.personalInfo.phone}</div>
          <div>{data.personalInfo.location}</div>
          <div className="space-x-2">
            {data.personalInfo.linkedin && (
              <a href={data.personalInfo.linkedin} className="text-blue-500 hover:underline">LinkedIn</a>
            )}
            {data.personalInfo.github && (
              <a href={data.personalInfo.github} className="text-blue-500 hover:underline">GitHub</a>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">Professional Summary</h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">

          {/* Experience */}
          {data.experience.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-blue-700 mb-2">Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-md font-bold">{exp.title}</h3>
                  <p className="text-sm text-gray-600">{exp.company} - {exp.location}</p>
                  <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-sm mt-1 text-gray-700">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-blue-700 mb-2">Projects</h2>
              {data.projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-md font-bold">{project.name}</h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      className="text-blue-500 hover:underline text-sm mt-1 inline-block"
                    >
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-blue-700 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-200 text-sm px-3 py-1 rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-blue-700 mb-2">Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-md font-bold">{edu.school}</h3>
                  <p className="text-sm text-gray-600">{edu.degree}, {edu.field}</p>
                  <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  {(edu.percentage || edu.cgpa) && (
                    <p className="text-sm text-gray-700">
                      {edu.percentage && `Percentage: ${edu.percentage}`}
                      {edu.percentage && edu.cgpa && ' | '}
                      {edu.cgpa && `CGPA: ${edu.cgpa}`}
                    </p>
                  )}
                  <p className="text-sm text-gray-700 mt-1">{edu.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
