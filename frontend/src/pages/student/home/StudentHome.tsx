import AllClubs from "../../../components/studentComponents/AllClubs";
import LatestEvents from "../../../components/studentComponents/LatestEvents";

const StudentHome: React.FC = () => {
  
  return (
    <div className="bg-slate-900 min-h-screen">
      <LatestEvents/>
      <AllClubs/>
    </div>
  );
};

export default StudentHome;
