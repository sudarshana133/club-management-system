import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

type Member = {
  uId: string;
  email: string;
};

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [deleteIds, setDeleteIds] = useState<string[]>([]);

  const getMemberDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/viewMembers`,
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

  const addMemberToDelete = (id: string) => {
    setDeleteIds([...deleteIds, id]);
  };

  const deleteMembers = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/deleteMembers`,
        {
          uIds: deleteIds,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setMembers(members.filter(member=>!deleteIds.includes(member.uId)));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-400">Members</h1>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        {members.length > 0 ? (
          <ul className="space-y-4">
            {members.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <li>
                  <span className="text-lg font-medium">{member.email}</span>
                </li>
                <input
                  type="checkbox"
                  onChange={() => {
                    addMemberToDelete(member.uId);
                  }}
                  className="ml-4 w-4 h-4"
                />
              </div>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No members found.</p>
        )}
        <div className="mt-4">
          <button
            onClick={deleteMembers}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Delete Members
          </button>
        </div>
      </div>
    </div>
  );
};

export default Members;
