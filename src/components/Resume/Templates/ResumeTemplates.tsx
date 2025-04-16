import { ResumeData } from '../types'
import ModernTemplate from './ModernTemplate'
import ClassicTemplate from './ClassicTemplate'
import MinimalTemplate from './MinimalTemplate'

interface Props {
  data: ResumeData
  selectedTemplate: 'modern' | 'classic' | 'minimal'
}

export default function ResumeTemplates({ data, selectedTemplate }: Props) {
  switch (selectedTemplate) {
    case 'classic':
      return <ClassicTemplate data={data} />
    case 'minimal':
      return <MinimalTemplate data={data} />
    case 'modern':
    default:
      return <ModernTemplate data={data} />
  }
}
