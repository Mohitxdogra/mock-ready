import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Volume2, VolumeX } from "lucide-react";
import { RecordAnswer } from "./record-answer";

interface Question {
  question: string;
  answer: string;
}

interface QuestionSectionProps {
  questions: Question[];
}

export const QuestionSection = ({ questions }: QuestionSectionProps) => {
  const [playingQuestion, setPlayingQuestion] = useState<string | null>(null);
  const [isWebCam, setIsWebCam] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<string>(
    questions.length > 0 ? questions[0].question : ""
  );

  useEffect(() => {
    // Stop speech when active question changes
    window.speechSynthesis.cancel();
  }, [activeQuestion]);

  const handlePlayQuestion = (qst: string) => {
    window.speechSynthesis.cancel();
    
    if (playingQuestion === qst) {
      setPlayingQuestion(null);
    } else {
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(qst);
        window.speechSynthesis.speak(speech);
        setPlayingQuestion(qst);
        
        speech.onend = () => setPlayingQuestion(null);
      }
    }
  };

  return (
    <div className="w-full min-h-96 border rounded-md p-4">
      <Tabs
        value={activeQuestion}
        className="w-full space-y-12"
        orientation="vertical"
        onValueChange={(value) => setActiveQuestion(value)}
      >
        <TabsList className="bg-transparent w-full flex flex-wrap items-center justify-start gap-4">
          {questions.map((tab, i) => (
            <TabsTrigger
              className={cn(
                "data-[state=active]:bg-emerald-200 data-[state=active]:shadow-md text-xs px-2"
              )}
              key={tab.question}
              value={tab.question}
            >
              {`Question #${i + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>

        {questions.map((tab) => (
          <TabsContent key={tab.question} value={tab.question}>
            <p className="text-base text-left tracking-wide text-neutral-500">
              {tab.question}
            </p>

            <div className="w-full flex items-center justify-end">
              <TooltipButton
                content={playingQuestion === tab.question ? "Stop" : "Start"}
                icon={
                  playingQuestion === tab.question ? (
                    <VolumeX className="min-w-5 min-h-5 text-muted-foreground" />
                  ) : (
                    <Volume2 className="min-w-5 min-h-5 text-muted-foreground" />
                  )
                }
                onClick={() => handlePlayQuestion(tab.question)}
              />
            </div>

            <RecordAnswer
              question={tab}
              isWebCam={isWebCam}
              setIsWebCam={setIsWebCam}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};