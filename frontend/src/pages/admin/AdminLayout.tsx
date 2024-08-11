import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/adminComponents/Sidebar';
import Bottombar from '../../components/adminComponents/Bottombar';

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Large screen mode */}
        <div className="hidden md:block w-56">
          <Sidebar />
        </div>
        {/* Small screen mode */}
        <div className="fixed flex justify-center bottom-0 w-full md:hidden">
          <Bottombar />
        </div>
        <main className="flex-1 bg-slate-600 md:pl-6 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
