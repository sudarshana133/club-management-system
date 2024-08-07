import { Outlet } from "react-router-dom";

const StudentLayout: React.FC = () => {
  return (
    <div className="bg-slate-900 min-h-screen flex flex-col">
      <header className="p-4 bg-gray-800 text-white">Student Header</header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="p-4 bg-gray-800 text-white">Student Footer</footer>
    </div>
  );
};

export default StudentLayout;