import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Events } from "../../utils/types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Check, Copy, Trash } from "lucide-react";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

interface AIGeneratorProps {
  open: boolean;
  onClose: () => void;
  event: Events;
}

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const AIGenerator: React.FC<AIGeneratorProps> = ({ open, onClose, event }) => {
  const [customMsg, setCustomMsg] = useState<string>("");
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleAI = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const { title, description, date, venue, fees } = event;
    const json = {
      title,
      description,
      date,
      venue,
      fees,
    };
    const prompt = `${customMsg} ${JSON.stringify(json)}`;
    try {
      const result = await model.generateContent(prompt);
      setGeneratedMessage(result.response.text());
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      console.error("Error generating content:", error);
      setGeneratedMessage("An error occurred while generating content.");
      setIsLoading(false);
    }
  };
  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (generatedMessage) {
      navigator.clipboard
        .writeText(generatedMessage)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 1000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogDescription className="hidden">This is AI Generator</AlertDialogDescription>
      <AlertDialogContent className="bg-gray-800 text-gray-100 max-w-screen-sm sm:mx-6 lg:mx-auto p-4 max-h-[90vh] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-blue-400 text-xl font-semibold">
            AI Message Generator
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="flex flex-col">
          <form className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label className="block text-sm font-medium">
                Custom Message
              </label>
              <Textarea
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Enter your message here..."
                className="mt-1 bg-gray-700 text-gray-200 w-full h-24"
              />
              <AlertDialogFooter className="mt-2">
                <AlertDialogCancel
                  onClick={() => {
                    setCustomMsg("");
                    onClose();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={(e) => {
                    handleAI(e);
                    setIsError(false);
                  }}
                  disabled={isLoading}
                  className="bg-blue-600 text-white hover:bg-blue-500"
                >
                  Generate
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
            <div className="flex-1">
              {generatedMessage && (
                <div className="p-4 bg-gray-800 border border-gray-700 rounded">
                  <div className="flex">
                    <h3 className="text-lg font-semibold mb-2 text-blue-400">
                      Generated Message:
                    </h3>
                    {!isError && (
                      <div className="flex">
                        <Button variant="ghost" onClick={(e) => handleCopy(e)}>
                          {copied ? <Check color="#04ff00" /> : <Copy />}
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={(e) => {
                            e.preventDefault();
                            setGeneratedMessage(null);
                          }}
                        >
                          <Trash />
                        </Button>
                      </div>
                    )}
                  </div>
                  <p>{generatedMessage}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AIGenerator;
