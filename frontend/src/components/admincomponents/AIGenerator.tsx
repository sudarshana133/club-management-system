import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Input } from '../ui/input';
import { Events } from '../../utils/types';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Textarea } from '../ui/textarea';

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

  const handleAI = async () => {
    const { title, description, date, venue, fees } = event;
    const json = {
      title,
      description,
      date,
      venue,
      fees
    };
    const prompt = `${customMsg} ${JSON.stringify(json)}`;
    try {
      const result = await model.generateContent(prompt);
      setGeneratedMessage(result.response.text()); // Display the generated message
    } catch (error) {
      console.error("Error generating content:", error);
      setGeneratedMessage("An error occurred while generating content.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-800 text-gray-100">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-blue-400">AI Message Generator</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="p-4">
          <form className="space-y-4">
            <div>
              <label className="block">Custom Message</label>
              <Textarea
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="Enter your message here..."
                className="mt-1 bg-gray-700 text-gray-200"
              />
            </div>
            {generatedMessage && (
              <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded">
                <h3 className="text-lg font-semibold mb-2 text-blue-400">Generated Message:</h3>
                <p>{generatedMessage}</p>
              </div>
            )}
          </form>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleAI} // Only handle AI generation, do not close the modal
            className="bg-blue-600 text-white hover:bg-blue-500"
          >
            Generate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AIGenerator;
