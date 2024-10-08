import { Input } from "../ui/input"; // Adjust the import path as needed
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from "react";
import { Events } from "../../utils/types";
import { Textarea } from "../ui/textarea";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

interface UpdateModalProps {
  open: boolean;
  onClose: () => void;
  event: Events | null;
  onUpdate: (updatedEvent: Events) => void;
}

const UpdateModal = ({ open, onClose, event, onUpdate }: UpdateModalProps) => {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [venue, setVenue] = useState(event?.venue || "");
  const [date, setDate] = useState(event?.date || new Date());
  const [fees, setFees] = useState(event?.fees || 0);
  const [type, setType] = useState<"SOLO" | "TEAM">(event?.type || "SOLO");
  const [memberCount, setMemberCount] = useState(event?.memberCount);

  const handleUpdate = () => {
    if (event && memberCount !== undefined) {
      onUpdate({
        ...event,
        title,
        description,
        venue,
        date,
        fees,
        type,
        memberCount: type === "TEAM" ? memberCount : 1,
      });
      onClose();
    }
  };

  const handleEventTypeChange = (value: "SOLO" | "TEAM") => {
    setType(value);
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogDescription className="hidden">
        This is update event
      </AlertDialogDescription>
      <AlertDialogContent className="bg-gray-800 text-gray-100  overflow-y-scroll max-h-screen pb-16 md:pb-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-blue-400">
            Update Event
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="p-4">
          <form className="space-y-4">
            <div>
              <label className="block">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 bg-gray-700 text-gray-200"
              />
            </div>
            <div>
              <label className="block">Description</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 bg-gray-700 text-gray-200"
              />
            </div>
            <div>
              <label className="block">Venue</label>
              <Input
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="mt-1 bg-gray-700 text-gray-200"
              />
            </div>
            <div>
              <label className="block">Date</label>
              <Input
                type="date"
                value={new Date(date).toISOString().split("T")[0]}
                onChange={(e) => setDate(new Date(e.target.value))}
                className="mt-1 bg-gray-700 text-gray-200"
              />
            </div>
            <div>
              <label className="block">Fees</label>
              <Input
                type="number"
                value={fees || ""}
                onChange={(e) => setFees(Number(e.target.value))}
                className="mt-1 bg-gray-700 text-gray-200"
              />
            </div>
            <div>
              <label className="block">Event Type</label>
              <select
                className="bg-gray-700 text-gray-100 w-full py-2 pl-3 pr-8 rounded-md border border-gray-600 focus:outline-none focus:ring-2 mt-1 transition-colors duration-200 ease-in-out"
                onChange={(e) =>
                  handleEventTypeChange(e.target.value as "SOLO" | "TEAM")
                }
                value={type}
              >
                <option value="SOLO" className="bg-gray-800 text-gray-200">
                  Solo Event
                </option>
                <option value="TEAM" className="bg-gray-800 text-gray-200">
                  Team Event
                </option>
              </select>
            </div>
            {type === "TEAM" && (
              <div>
                <label className="block">Number of Members</label>
                <Input
                  type="number"
                  value={memberCount}
                  onChange={(e) => setMemberCount(parseInt(e.target.value))}
                  className="mt-1 bg-gray-700 text-gray-200"
                />
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
            onClick={handleUpdate}
            className="bg-blue-600 text-white hover:bg-blue-500"
          >
            Update
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateModal;
