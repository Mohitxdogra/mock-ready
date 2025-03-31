import { createContext, useContext, useState, ReactNode } from 'react'

interface Question {
  id: number
  text: string
}

interface QuestionContextType {
  currentQuestion: Question | null
  questions: Question[]
  nextQuestion: () => void
}

const defaultQuestions: Question[] = [
  { id: 1, text: 'Tell me about yourself.' },
  { id: 2, text: 'What are your strengths and weaknesses?' },
  { id: 3, text: 'Why do you want to work here?' },
  { id: 4, text: 'Where do you see yourself in 5 years?' },
  { id: 5, text: 'Why should we hire you?' },
  { id: 6, text: 'What is your greatest achievement?' },
  { id: 7, text: 'How do you handle stress and pressure?' },
  { id: 8, text: 'What are your salary expectations?' },
  { id: 9, text: 'Do you have any questions for us?' },
  { id: 10, text: 'What makes you unique?' }
]

const QuestionContext = createContext<QuestionContextType | undefined>(undefined)

export function QuestionProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [questions] = useState<Question[]>(defaultQuestions)

  const nextQuestion = () => {
    setCurrentIndex(prev => prev + 1)
  }

  return (
    <QuestionContext.Provider value={{
      currentQuestion: questions[currentIndex] || null,
      questions,
      nextQuestion
    }}>
      {children}
    </QuestionContext.Provider>
  )
}

export function useQuestion() {
  const context = useContext(QuestionContext)
  if (context === undefined) {
    throw new Error('useQuestion must be used within a QuestionProvider')
  }
  return context
} 