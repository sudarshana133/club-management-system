import ClubCard from "../studentComponents/clubCard";
import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface clubData{
  adminId:string,
  clubName:string,
  uId:string
}

const AllClubs: React.FC = () => {

  const [clubData,setClubData] = useState<clubData[]>([]);
    useEffect(()=>{
    const getClubDetails = async ()=>{
      const response = await axios.get("http://localhost:8000/club/clubs",{
        headers:{
          'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjBiZmM2NmQ2LTQxNTUtNGM2OS05ZjVjLTA0Yzc0ODIxNzdmYyIsImVtYWlsIjoiYWJjQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyMjc2NTc2NH0.j906DRLdeix3bI3TpKUDPZiYLh3M_DfgKkIiSc2fUh0"
        }
      });
      setClubData(response.data.msg);
    }
    getClubDetails();
  },[])

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-2">
      {
        clubData.map((club)=>(
          <ClubCard clubName={club.clubName} key={club.uId}></ClubCard>
        ))
      }
    </div>
  );
};

export default AllClubs;
