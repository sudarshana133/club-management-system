import ClubCard from "../studentComponents/clubCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
interface ClubData {
  adminId: string;
  clubName: string;
  uId: string;
}
const AllClubs: React.FC = () => {
  const [clubData, setClubData] = useState<ClubData[]>([]);
  const token = Cookies.get("token");
  useEffect(() => {
    const getClubDetails = async () => {
      const response = await axios.get("http://localhost:8000/club/clubs", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setClubData(response.data.msg);
    };
    getClubDetails();
  }, []);
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2">
      {clubData.map((club) => (
        <ClubCard clubName={club.clubName} key={club.uId}></ClubCard>
      ))}
    </div>
  );
};

export default AllClubs;
