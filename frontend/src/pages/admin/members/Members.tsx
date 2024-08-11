// import axios from "axios"
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";

// const token = Cookies.get("token");;
// type Member = {
//     email:string
// }
// const Members = ()=>{
//     const [members,setMembers] = useState<Member[]>([]);
//     const getMemberDetails = async ()=>{
//         const response = await axios.get("http://localhost:8000/admin/viewMembers",{
//             headers:{
//                 Authorization:"Bearer "+token
//             }
//         });
//         console.log(response.data.msg);
//         setMembers(response.data.msg);
//     }
//     useEffect(
//         ()=>{
//             getMemberDetails();
//         },[]
//     )
//     return (
        
//         <div>
//             {
//                 members.map((member)=>(
//                     <div>
//                         email:{member.email}
//                     </div>
//                 ))
//             }
//         </div>
//     )
// }

// export default Members;

import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Loader } from "lucide-react"; // Alternative icon for loading

const token = Cookies.get("token");

type Member = {
  email: string;
};

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMemberDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8000/admin/viewMembers", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setMembers(response.data.msg);
    } catch (err) {
      setError("Failed to fetch member details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMemberDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-blue-400">Members</h1>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        {members.length > 0 ? (
          <ul className="space-y-4">
            {members.map((member, index) => (
              <li key={index} className="flex items-center p-4 bg-gray-700 rounded-lg">
                <span className="text-lg font-medium">{member.email}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No members found.</p>
        )}
      </div>
    </div>
  );
};

export default Members;
