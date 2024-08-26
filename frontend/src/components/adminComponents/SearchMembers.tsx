import { useEffect } from "react";
import { useDebounce } from "../../lib/debounce";
import { Input } from "../ui/input";


interface SearchMembersProps {
  setMemberName: React.Dispatch<React.SetStateAction<string | null>>;
  memberName: string | null;
  setMemberEmails: React.Dispatch<React.SetStateAction<string[]>>;
  debounceVal: string | null;
  setDebounceVal: React.Dispatch<React.SetStateAction<string | null>>;
  setMemberIds: React.Dispatch<React.SetStateAction<string[]>>;
  searchFunc: () => void;
}
const SearchMembers: React.FC<SearchMembersProps> = ({
  memberName,
  setMemberName,
  debounceVal,
  setDebounceVal,
  searchFunc
}) => {
  useDebounce({
    value: memberName,
    delay: 300,
    setDebouncedValue: setDebounceVal,
  });
  useEffect(() => {
    searchFunc();
  }, [debounceVal]);

  return (
    <div>
      <Input
        placeholder="Search email..."
        className="w-full p-3 rounded-t-lg border border-gray-700 bg-gray-800 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
        type="text"
        onChange={(e) => setMemberName(e.target.value)}
      />
    </div>
  );
};
export default SearchMembers;
