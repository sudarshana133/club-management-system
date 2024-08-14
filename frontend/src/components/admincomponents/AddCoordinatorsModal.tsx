import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@radix-ui/react-alert-dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DisplayMember from "./DisplayMember";
import { Coordinators } from "../../pages/admin/events/AboutEvent";
import SearchMembers from "./SearchMembers";

interface AddCoordinatorsModalProps {
  open: boolean;
  onClose: () => void;
  setSelectedCoordinators: React.Dispatch<React.SetStateAction<Coordinators[]>>;
  selectedCoordinators: Coordinators[];
  eventId: string;
}

const AddCoordinatorsModal: React.FC<AddCoordinatorsModalProps> = ({
  open,
  onClose,
  setSelectedCoordinators,
  selectedCoordinators,
  eventId,
}) => {
  const [memberName, setMemberName] = useState<string | null>("");
  const [debounceVal, setDebounceVal] = useState<string | null>(memberName);
  const [emails, setMemberEmails] = useState<string[]>([]);
  const [memberIds,setMemberIds] = useState<string[]>([]);
  const token = Cookies.get("token");

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      // Extract IDs from selectedCoordinators
      const ids = selectedCoordinators.map(coordinator => coordinator.id);
      
      const res = await axios.post(
        `http://localhost:8000/admin/addCoordinator/${eventId}`,
        { ids },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-900 text-gray-100 max-w-md mx-auto p-6 rounded-lg shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold mb-3">
            Add Coordinators
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 mb-6">
            Search and add coordinators for this event.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mb-6">
          <SearchMembers
            memberName={memberName}
            debounceVal={debounceVal}
            setDebounceVal={setDebounceVal}
            setMemberEmails={setMemberEmails}
            setMemberIds={setMemberIds}
            setMemberName={setMemberName}
          />
          <DisplayMember
            emails={emails}
            setSelectedCoordinators={setSelectedCoordinators}
            memberIds = {memberIds}
          />
        </div>
        <AlertDialogFooter className="flex justify-end gap-1">
          <AlertDialogCancel
            onClick={onClose}
            className="bg-gray-600 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-700 transition-all"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition-all"
          >
            Save
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddCoordinatorsModal;