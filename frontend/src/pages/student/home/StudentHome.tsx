import AllClubs from "../../../components/studentComponents/AllClubs";
import LatestEvents from "../../../components/studentComponents/LatestEvents";

const StudentHome: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen text-white">
      <LatestEvents />
      <div>
        <h1 className="pl-4 mt-6 text-4xl font-bold">Clubs of BMSCE</h1>
        <AllClubs />
      </div>
    </div>
  );
};

export default StudentHome;
