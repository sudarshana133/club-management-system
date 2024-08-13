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
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "../../lib/debounce";
import axios from "axios";
import Cookies from "js-cookie";
import DisplayMember from "./DisplayMember";

interface AddCoordinatorsModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCoordinatorsModal: React.FC<AddCoordinatorsModalProps> = ({
  open,
  onClose,
}) => {
  const [memberName, setMemberName] = useState<string | null>("");
  const [debounceVal, setDebounceVal] = useState<string | null>(memberName);
  const [emails, setMemberEmails] = useState<string[]>([]);
  const token = Cookies.get("token");
  useDebounce({
    value: memberName,
    delay: 1000,
    setDebouncedValue: setDebounceVal,
  });
  const getMembers = async () => {
    try {
      if (!debounceVal.trim()) {
        setMemberEmails([]);
        return;
      }

      const res = await axios.post(
        "http://localhost:8000/admin/searchmembers",
        {
          emailName: debounceVal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 404) {
        // Handle 404 status code by clearing emails
        setMemberEmails([]);
      } else {
        // Assuming that `res.data.msg` is an array of member objects
        const arrayOfMembers = res.data.msg;
        const emails: string[] = arrayOfMembers.map(
          (member: any) => member.user.email
        );
        setMemberEmails(emails);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setMemberEmails([]);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getMembers();
  }, [debounceVal]);
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="bg-gray-900 text-gray-100 max-w-md mx-auto p-6 rounded-lg shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold mb-3">
            Add Coordinators
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 mb-6">
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="mb-6">
          <Input
            placeholder="Enter coordinator name"
            className="w-full p-3 rounded-t-lg border border-gray-700 bg-gray-800 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
            type="text"
            onChange={(e) => setMemberName(e.target.value)}
          />
          <DisplayMember emails={emails} />
        </div>
        <AlertDialogFooter className="flex justify-end gap-1">
          <AlertDialogCancel
            onClick={onClose}
            className="bg-gray-600 text-gray-200 py-2 px-4 rounded-lg hover:bg-gray-700 transition-all"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onClose}
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
