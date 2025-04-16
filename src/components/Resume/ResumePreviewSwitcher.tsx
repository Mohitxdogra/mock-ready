import { useState } from 'react'
import ModernTemplate from './Templates/ModernTemplate'
import ClassicTemplate from './Templates/ClassicTemplate'
import MinimalTemplate from './Templates/MinimalTemplate'
import { ResumeData } from './types'

interface Props {
  data: ResumeData
}

export default function ResumePreviewSwitcher({ data }: Props) {
  const [selectedTemplate, setSelectedTemplate] = useState('modern')

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate data={data} />
      case 'classic':
        return <ClassicTemplate data={data} />
      case 'minimal':
        return <MinimalTemplate data={data} />
      default:
        return <ModernTemplate data={data} />
    }
  }

  return (
    <div>
      <div className="flex gap-4 mb-4">
        <button onClick={() => setSelectedTemplate('modern')} className="btn">Modern</button>
        <button onClick={() => setSelectedTemplate('classic')} className="btn">Classic</button>
        <button onClick={() => setSelectedTemplate('minimal')} className="btn">Minimal</button>
      </div>
      {renderTemplate()}
    </div>
  )
}
