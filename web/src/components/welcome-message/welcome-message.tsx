"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useWelcomeStore } from "@/src/stores/welcome-store";
import { useRouter } from "next/navigation";

const WelcomeMessage = () => {
  const { welcomeMessage } = useWelcomeStore();
  const router = useRouter();
  // const [isSpeaking, setIsSpeaking] = useState(false);

  // // Clean up speech synthesis when component unmounts
  // useEffect(() => {
  //   return () => {
  //     window.speechSynthesis.cancel();
  //   };
  // }, []);

  // const speak = () => {
  //   if ("speechSynthesis" in window && welcomeMessage) {
  //     // Cancel any ongoing speech
  //     window.speechSynthesis.cancel();

  //     // Get available voices and select a male voice
  //     const voices = window.speechSynthesis.getVoices();
  //     const maleVoice = voices.find(
  //       (voice) =>
  //         voice.name.toLowerCase().includes("male") ||
  //         voice.name.toLowerCase().includes("david") ||
  //         voice.name.toLowerCase().includes("james"),
  //     );

  //     const maxChunkLength = 200;
  //     const chunks: string[] = [];
  //     let start = 0;

  //     while (start < welcomeMessage.length) {
  //       let end = Math.min(start + maxChunkLength, welcomeMessage.length);
  //       if (end < welcomeMessage.length && /\S/.test(welcomeMessage[end])) {
  //         end = welcomeMessage.lastIndexOf(" ", end) + 1;
  //       }
  //       chunks.push(welcomeMessage.slice(start, end));
  //       start = end;
  //     }

  //     setIsSpeaking(true);

  //     chunks.forEach((chunk) => {
  //       const utterance = new SpeechSynthesisUtterance(chunk);
  //       if (maleVoice) {
  //         utterance.voice = maleVoice;
  //       }

  //       utterance.rate = 1.1;
  //       utterance.pitch = 1.1;
  //       utterance.volume = 1.0;

  //       utterance.onend = () => {
  //         if (chunk === chunks[chunks.length - 1]) {
  //           setIsSpeaking(false);
  //         }
  //       };
  //       utterance.onerror = () => setIsSpeaking(false);

  //       window.speechSynthesis.speak(utterance);
  //     });
  //   }
  // };

  // const stopSpeaking = () => {
  //   window.speechSynthesis.cancel();
  //   setIsSpeaking(false);
  // };

  return (
    <Card className="max-w-2xl sm:mx-auto mx-2 mt-10">
      <CardHeader>
        <CardTitle>Welcome!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{welcomeMessage}</p>
        <div className="space-y-2">
          {/* {isSpeaking ? (
            <Button onClick={stopSpeaking} variant="outline" className="w-full">
              Stop Speaking
            </Button>
          ) : (
            <Button onClick={speak} variant="outline" className="w-full">
              Listen to message
            </Button>
          )} */}
          <Button
            onClick={() => router.push("/course/N8YSKpN6QzewFrRkXq5x")}
            className="w-full"
          >
            Continue to Course
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WelcomeMessage;
