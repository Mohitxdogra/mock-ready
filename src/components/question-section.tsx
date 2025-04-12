import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Volume2, VolumeX } from "lucide-react";
import { RecordAnswer } from "./record-answer";

interface QuestionSectionProps {
  questions: { question: string; answer: string }[];
}

export const QuestionSection = ({ questions }: QuestionSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWebCam, setIsWebCam] = useState(false);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);

  const [currentSpeech, setCurrentSpeech] =
    useState<SpeechSynthesisUtterance | null>(null);

  // Add useEffect to stop audio when question changes
  useEffect(() => {
    // Stop any ongoing speech when the current question changes
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    }
  }, [currentQuestionNumber]);

  const handlePlayQuestion = (qst: string) => {
    if (isPlaying && currentSpeech) {
      // stop the speech if already playing
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        setIsPlaying(true);
        setCurrentSpeech(speech);

        // handle the speech end
        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  return (
    <div className="w-full border rounded-lg bg-white shadow-sm">
      <Tabs
        defaultValue={questions[0]?.question}
        className="w-full"
        orientation="vertical"
        onValueChange={(value) => {
          const index = questions.findIndex(q => q.question === value);
          setCurrentQuestionNumber(index + 1);
        }}
      >
        <div className="sticky top-0 z-10 bg-white border-b">
          <div className="w-full overflow-x-auto py-2 md:py-3 px-3 md:px-4">
            <TabsList className="bg-gray-50/80 w-full flex items-center justify-start md:justify-center gap-2 min-w-max p-1 rounded-lg">
              {questions?.map((tab, i) => (
                <TabsTrigger
                  className={cn(
                    "data-[state=active]:bg-blue-500 data-[state=active]:text-white",
                    "data-[state=active]:shadow-sm data-[state=active]:border-transparent",
                    "hover:bg-gray-100 border border-gray-200",
                    "text-sm md:text-base px-4 py-1.5 md:py-2 rounded-lg font-medium",
                    "transition-all duration-300 whitespace-nowrap",
                    "min-w-[90px] md:min-w-[110px] text-center"
                  )}
                  key={tab.question}
                  value={tab.question}
                >
                  {`Question ${i + 1}`}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {questions?.map((tab, i) => (
          <TabsContent key={i} value={tab.question} className="p-3 md:p-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 md:p-4 shadow-sm border border-blue-100">
              <div className="space-y-2">
                <h3 className="font-bold text-blue-900 text-base md:text-lg">Question {i + 1}</h3>
                <p className="text-gray-800 md:text-lg font-medium leading-relaxed">
                  {tab.question}
                </p>
              </div>

              <div className="w-full flex items-center justify-end mt-3">
                <TooltipButton
                  content={isPlaying ? "Stop Audio" : "Play Question"}
                  icon={
                    isPlaying ? (
                      <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-blue-700" />
                    ) : (
                      <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-blue-700" />
                    )
                  }
                  onClick={() => handlePlayQuestion(tab.question)}
                  buttonClassName="bg-white hover:bg-blue-50 p-1.5 md:p-2 rounded-lg transition-all duration-300 border border-blue-200"
                />
              </div>
            </div>

            <RecordAnswer
              question={tab}
              isWebCam={isWebCam}
              setIsWebCam={setIsWebCam}
              totalQuestions={questions.length}
              currentQuestionNumber={currentQuestionNumber}
              setCurrentQuestionNumber={setCurrentQuestionNumber}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};