import { useState, useEffect } from 'react'
import { Mic, MicOff } from 'lucide-react'

interface SpeechToTextProps {
  onTextChange: (text: string) => void
  field: string
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default function SpeechToText({ onTextChange, field }: SpeechToTextProps) {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition() as unknown as SpeechRecognition
        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = 'en-US'

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          const transcript = event.results[event.resultIndex][0].transcript
          onTextChange(transcript)
          setIsListening(false)
        }

        recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        setRecognition(recognition)
      }
    }
  }, [onTextChange])

  const toggleListening = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in your browser.')
      return
    }

    if (isListening) {
      recognition.stop()
    } else {
      recognition.start()
      setIsListening(true)
    }
  }

  return (
    <button
      onClick={toggleListening}
      className={`p-2 rounded-full ${
        isListening ? 'bg-red-500' : 'bg-blue-500'
      } text-white hover:opacity-80 transition-opacity`}
      title={`${isListening ? 'Stop' : 'Start'} speech recognition for ${field}`}
    >
      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
    </button>
  )
} 