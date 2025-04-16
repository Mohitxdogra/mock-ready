import { ResumeData } from '../types'

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div className="bg-white p-6 font-serif text-black">
      <h1 className="text-3xl font-bold border-b pb-2">{data.personalInfo.fullName}</h1>
      <p className="mt-1 text-sm">{data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}</p>
      <p className="text-sm">{data.personalInfo.github} | {data.personalInfo.linkedin}</p>

      {data.personalInfo.summary && (
        <section className="mt-6">
          <h2 className="text-lg font-bold border-b">Summary</h2>
          <p className="mt-1">{data.personalInfo.summary}</p>
        </section>
      )}

      <section className="mt-6">
        <h2 className="text-lg font-bold border-b">Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mt-2">
            <strong>{exp.title}</strong>, {exp.company} - {exp.location}
            <div className="text-sm text-gray-700">{exp.startDate} - {exp.endDate}</div>
            <p className="mt-1">{exp.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold border-b">Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mt-2">
            <strong>{edu.school}</strong> – {edu.degree} in {edu.field}
            <div className="text-sm">{edu.startDate} - {edu.endDate}</div>
            {(edu.percentage || edu.cgpa) && (
              <div className="text-sm">
                {edu.percentage && `Percentage: ${edu.percentage}`}
                {edu.percentage && edu.cgpa && ' | '}
                {edu.cgpa && `CGPA: ${edu.cgpa}`}
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold border-b">Projects</h2>
        {data.projects.map((project, index) => (
          <div key={index} className="mt-2">
            <strong>{project.name}</strong>
            <p>{project.description}</p>
            <p className="text-sm">Technologies: {project.technologies.join(', ')}</p>
            {project.link && <a href={project.link} className="text-blue-600 underline text-sm">View</a>}
          </div>
        ))}
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-bold border-b">Skills</h2>
        <p>{data.skills.join(', ')}</p>
      </section>
    </div>
  )
}
