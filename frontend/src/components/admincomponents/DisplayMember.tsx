import { useState } from "react";
import ChipComponent from "../shared/ChipComponent";
import { Coordinators } from "../../pages/admin/events/AboutEvent";

interface DisplayMemberProps {
  emails: string[];
  setSelectedCoordinators: React.Dispatch<React.SetStateAction<Coordinators[]>>;
  memberIds:string[];
}

const DisplayMember: React.FC<DisplayMemberProps> = ({ emails, setSelectedCoordinators,memberIds }) => {
  const [selected, setSelected] = useState<string>("");
  const [isSelected, setIsSelected] = useState<boolean>(false);


  if (!Array.isArray(emails)) return null;

  const handleClick = (email: string,memberId:string) => {
    setSelected(email);
    setIsSelected(true);
    setSelectedCoordinators(prev => [...prev, { email, id: memberId }]);
  };

  const handleRemove = () => {
    setIsSelected(false);
    setSelectedCoordinators(prev => prev.filter(coordinator => coordinator.email !== selected));
    setSelected("");
  };
  let i=0;
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
              className={`p-2 border-b border-gray-700 last:border-b-0 hover:bg-gray-800 transition-colors cursor-pointer ${
                selected === email ? "bg-gray-800" : ""
              }`}
              onClick={() => {handleClick(email,memberIds[i++])}}
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
      {isSelected && <ChipComponent value={selected} onRemove={handleRemove} />}
    </div>
  );
};

export default DisplayMember;
