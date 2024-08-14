import { useEffect } from "react";
import { useDebounce } from "../../lib/debounce";
import { Input } from "../ui/input";
import axios from "axios";
import Cookies from "js-cookie";

interface SearchMembersProps {
  setMemberName: React.Dispatch<React.SetStateAction<string | null>>;
  memberName: string | null;
  setMemberEmails: React.Dispatch<React.SetStateAction<string[]>>;
  debounceVal: string | null;
  setDebounceVal: React.Dispatch<React.SetStateAction<string | null>>;
  setMemberIds: React.Dispatch<React.SetStateAction<string[]>>;
}
const SearchMembers: React.FC<SearchMembersProps> = ({
  memberName,
  setMemberName,
  setMemberEmails,
  debounceVal,
  setDebounceVal,
  setMemberIds,
}) => {
  const token = Cookies.get("token");
  useDebounce({
    value: memberName,
    delay: 300,
    setDebouncedValue: setDebounceVal,
  });
  useEffect(() => {
    getMembers();
  }, [debounceVal]);
  const getMembers = async () => {
    try {
      if (!debounceVal?.trim()) {
        setMemberEmails([]);
        return;
      }

      const res = await axios.post(
        "http://localhost:8000/admin/searchmembers",
        { emailName: debounceVal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 404) {
        setMemberEmails([]);
      } else {
        const arrayOfMembers = res.data.msg;
        const emails: string[] = arrayOfMembers.map(
          (member: any) => member.user.email
        );
        const ids: string[] = arrayOfMembers.map(
          (member: any) => member.user.uId
        );
        console.log(ids);
        setMemberEmails(emails);
        setMemberIds(ids);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setMemberEmails([]);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <Input
        placeholder="Enter coordinator name"
        className="w-full p-3 rounded-t-lg border border-gray-700 bg-gray-800 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all"
        type="text"
        onChange={(e) => setMemberName(e.target.value)}
      />
    </div>
  );
};
export default SearchMembers;
