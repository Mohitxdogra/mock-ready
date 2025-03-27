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
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isWebCam, setIsWebCam] = useState(false);
  const [currentSpeech, setCurrentSpeech] =
    useState<SpeechSynthesisUtterance | null>(null);
  const [activeTab, setActiveTab] = useState(questions[0]?.question || "");

  // 🛑 Stop speech when switching questions
  useEffect(() => {
    if (currentSpeech) {
      window.speechSynthesis.cancel();
      setPlayingIndex(null);
      setCurrentSpeech(null);
    }
  }, [activeTab]); // Runs when activeTab changes

  const handlePlayQuestion = (qst: string, index: number) => {
    if (playingIndex === index && currentSpeech) {
      // Stop current speech
      window.speechSynthesis.cancel();
      setPlayingIndex(null);
      setCurrentSpeech(null);
    } else {
      // Stop any ongoing speech before playing new
      window.speechSynthesis.cancel();

      const speech = new SpeechSynthesisUtterance(qst);
      window.speechSynthesis.speak(speech);
      setPlayingIndex(index);
      setCurrentSpeech(speech);

      // Reset state when speech ends
      speech.onend = () => {
        setPlayingIndex(null);
        setCurrentSpeech(null);
      };
    }
  };

  return (
    <div className="w-full min-h-96 border border-gray-300 rounded-lg p-6 shadow-md bg-white">
      <Tabs
        defaultValue={questions[0]?.question}
        className="w-full space-y-6"
        orientation="vertical"
        onValueChange={(value) => setActiveTab(value)} // ⬅️ Track active tab
      >
        {/* Tabs List */}
        <TabsList className="bg-gray-100 w-full flex overflow-x-auto items-center gap-3 p-3 rounded-lg shadow-sm">
          {questions?.map((tab, i) => (
            <TabsTrigger
              key={tab.question}
              value={tab.question}
              aria-label={`Question ${i + 1}`}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                "hover:bg-gray-200",
                "data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
              )}
            >
              {`Question #${i + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Question Sections */}
        {questions?.map((tab, i) => (
          <TabsContent key={i} value={tab.question} className="p-4">
            <p className="text-lg font-medium text-gray-800">{tab.question}</p>

            {/* Play/Stop Button */}
            <div className="flex items-center justify-end mt-3">
              <TooltipButton
                content={playingIndex === i ? "Stop" : "Play"}
                icon={
                  playingIndex === i ? (
                    <VolumeX className="w-6 h-6 text-red-500" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-green-500" />
                  )
                }
                onClick={() => handlePlayQuestion(tab.question, i)}
              />
            </div>

            {/* Answer Recording Section */}
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
