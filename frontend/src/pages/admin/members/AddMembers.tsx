import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import SearchMembers from "../../../components/adminComponents/SearchMembers";
import DisplayMember from "../../../components/adminComponents/DisplayMember";

const token = Cookies.get("token");

type Member = {
  uId: string;
  email: string;
};

const AddMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [deleteIds, setDeleteIds] = useState<string[]>([]);
  const [memberName, setMemberName] = useState<string | null>("");
  const [debounceVal, setDebounceVal] = useState<string | null>(memberName);
  const [emails, setMemberEmails] = useState<string[]>([]);
  const [memberIds, setMemberIds] = useState<string[]>([]);
  const getMemberDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/admin/viewAllMembers",
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

  const addMemberToAdd = (id: string) => {
    setDeleteIds([...deleteIds, id]);
  };

  const addMembers = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/admin/addMembers",
        {
          uIds: deleteIds,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
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
        />
        {/* <DisplayMember
          emails={emails}
        /> */}
        <div className="mt-4">
          <button
            onClick={addMembers}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Members
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMembers;
