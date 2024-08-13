import { useState } from "react";
import ChipComponent from "../shared/ChipComponent";

interface DisplayMemberProps {
  emails: string[];
}

const DisplayMember: React.FC<DisplayMemberProps> = ({ emails }) => {
  const [selected, setSelected] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);
  if (!Array.isArray(emails)) return null;

  const handleClick = (email: string) => {
    setSelected(email);
    setIsSelected(true);
  };
  return (
    <div>
      <div
        className={`transition-opacity duration-500 bg-gray-900 ${
          isSelected ? "hidden" : "block"
        } text-gray-100 rounded-lg shadow-lg ${
          emails.length > 0 ? "opacity-100" : "opacity-0"
        } p-4`}
      >
        {emails.length > 0 ? (
          emails.map((email) => (
            <div
              key={email}
              className={`p-2 border-b border-gray-700 last:border-b-0 hover:bg-gray-800 transition-colors ${
                selected === email ? "bg-gray-800" : ""
              }`}
              onClick={() => handleClick(email)}
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
      {
        isSelected && (
          <ChipComponent value={selected}/>
        )
      }
    </div>
  );
};

export default DisplayMember;
