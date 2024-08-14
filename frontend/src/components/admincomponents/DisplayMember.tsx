import { useState } from "react";
import ChipComponent from "../shared/ChipComponent";
import { Coordinators } from "../../pages/admin/events/AboutEvent";

interface DisplayMemberProps {
  emails: string[];
  setSelectedCoordinators: React.Dispatch<React.SetStateAction<Coordinators[]>>;
  memberIds: string[];
}

const DisplayMember: React.FC<DisplayMemberProps> = ({ emails, setSelectedCoordinators, memberIds }) => {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

  if (!Array.isArray(emails)) return null;

  const handleClick = (email: string, memberId: string) => {
    if (!selectedEmails.includes(email)) {
      setSelectedEmails(prev => [...prev, email]);
      setSelectedCoordinators(prev => [...prev, { email, id: memberId }]);
    }
  };

  const handleRemove = (emailToRemove: string) => {
    setSelectedEmails(prev => prev.filter(email => email !== emailToRemove));
    setSelectedCoordinators(prev => prev.filter(coordinator => coordinator.email !== emailToRemove));
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {selectedEmails.map((email, index) => (
          <ChipComponent key={index} value={email} onRemove={() => handleRemove(email)} />
        ))}
      </div>
      <div
        className={`transition-opacity duration-500 bg-gray-900 text-gray-100 rounded-lg shadow-lg ${
          emails.length > 0 ? "opacity-100" : "opacity-0"
        } p-4`}
      >
        {emails.length > 0 ? (
          emails.map((email, index) => (
            <div
              key={email}
              className={`p-2 border-b border-gray-700 last:border-b-0 hover:bg-gray-800 transition-colors cursor-pointer ${
                selectedEmails.includes(email) ? "bg-gray-800" : ""
              }`}
              onClick={() => handleClick(email, memberIds[index])}
            >
              {email}
            </div>
          ))
        ) : (
          <p className="p-2 text-gray-400 hover:text-gray-300 transition-colors">
            No results found
          </p>
        )}
      </div>
    </div>
  );
};

export default DisplayMember;