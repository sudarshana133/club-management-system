import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import SearchMembers from "../../../components/adminComponents/SearchMembers";
import DisplayMember from "../../../components/adminComponents/DisplayMember";
import { Coordinators } from "../events/AboutEvent";
import { Member } from "../../../utils/types";
import { Button } from "../../../components/ui/button";

const token = Cookies.get("token");

const AddMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [memberName, setMemberName] = useState<string | null>("");
  const [debounceVal, setDebounceVal] = useState<string | null>(memberName);
  const [emails, setMemberEmails] = useState<string[]>([]);
  const [memberIds, setMemberIds] = useState<string[]>([]);
  const [selectedCoordinators, setSelectedCoordinators] = useState<
    Coordinators[]
  >([]);

  const getMemberDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/viewAllMembers`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setMembers(response.data.msg);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMemberDetails();
  }, []);

  const addMembers = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/addMembers`,
        {
          uIds: selectedCoordinators.map((coordinantor) => coordinantor.id),
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const getUsers = async () => {
    try {
      if (!debounceVal?.trim()) {
        setMemberEmails([]);
        return;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/searchusers`,
        { emailName: debounceVal },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 404) {
        setMemberEmails([]);
      } else {
        const arrayOfMembers = res.data.msg;
        const emails: string[] = arrayOfMembers.map(
          (member: Member) => member.email
        );
        const ids: string[] = arrayOfMembers.map(
          (member: Member) => member.uId
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
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-400">Members</h1>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <SearchMembers
          memberName={memberName}
          debounceVal={debounceVal}
          setDebounceVal={setDebounceVal}
          setMemberEmails={setMemberEmails}
          setMemberIds={setMemberIds}
          setMemberName={setMemberName}
          searchFunc={getUsers}
        />
        <DisplayMember
          emails={emails}
          memberIds={memberIds}
          setSelectedCoordinators={setSelectedCoordinators}
        />
        <div className="mt-4">
          <Button
            onClick={addMembers}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Members
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
