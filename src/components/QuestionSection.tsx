import { useState, useEffect, useRef } from 'react'
import { useQuestion } from '../context/QuestionContext'
import { toast } from 'react-hot-toast'

export default function QuestionSection() {
  const { currentQuestion, nextQuestion, questions } = useQuestion()
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: true
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      streamRef.current = stream
      setIsCameraOn(true)
    } catch (error) {
      console.error('Error accessing camera:', error)
      toast.error('Failed to access camera. Please check permissions.')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
      streamRef.current = null
      setIsCameraOn(false)
    }
  }

  const startRecording = () => {
    if (!streamRef.current) {
      toast.error('Please start camera first')
      return
    }

    const recorder = new MediaRecorder(streamRef.current)
    const chunks: Blob[] = []

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunks.push(e.data)
      }
    }

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/webm' })
      // Here you would typically send the blob to your backend
      console.log('Recording saved:', blob)
    }

    recorder.start()
    setMediaRecorder(recorder)
    setIsRecording(true)
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop()
      setIsRecording(false)
    }
  }

  const handleNext = async () => {
    if (!currentQuestion) return

    setIsProcessing(true)
    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Here you would typically send the video to your backend
      // For now, we'll just simulate a successful response
      toast.success('Answer recorded successfully!')
      nextQuestion()
    } catch (error) {
      console.error('Error processing answer:', error)
      toast.error('Failed to process answer. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <h2 className="text-3xl font-bold text-white mb-4">Interview Complete!</h2>
        <p className="text-xl text-gray-300 text-center">
          Thank you for completing the interview. Your responses have been recorded.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
          >
            Return to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-white">Question {currentQuestion.id}</h2>
            <span className="text-gray-400">
              {currentQuestion.id} of {questions.length}
            </span>
          </div>
          <p className="text-xl text-gray-300">{currentQuestion.text}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
              {isCameraOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">Camera is off</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={isCameraOn ? stopCamera : startCamera}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  isCameraOn
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                {isCameraOn ? 'Stop Camera' : 'Start Camera'}
              </button>

              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={!isCameraOn}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Interview Tips</h3>
              <div className="space-y-2 text-gray-300">
                <p>• Take your time to think before answering</p>
                <p>• Be clear and concise in your responses</p>
                <p>• Maintain good eye contact with the camera</p>
                <p>• Speak clearly and at a good pace</p>
                <p>• Be honest and authentic in your answers</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={isProcessing || !isRecording}
                className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Next Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 