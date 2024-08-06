import AllClubs from "../../components/admincomponents/AllClubs";

const AdminHome: React.FC = () => {
  
  return (
    <div className="grid grid-cols-1 bg-slate-900 p-4 justify-items-center md:grid-cols-2 lg:grid-cols-3 h-screen">
      <AllClubs/>
    </div>
  );
};

export default AdminHome;
