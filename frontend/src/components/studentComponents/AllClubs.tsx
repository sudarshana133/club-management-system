import ClubCard from "../studentComponents/clubCard";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

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
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/club/clubs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClubData(response.data.msg);
      } catch (error) {
        console.error("Error fetching club details:", error);
      }
    };
    getClubDetails();
  }, [token]);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center">
      {clubData.map((club) => (
        <ClubCard clubName={club.clubName} key={club.uId} />
      ))}
    </div>
  );
};

export default AllClubs;
