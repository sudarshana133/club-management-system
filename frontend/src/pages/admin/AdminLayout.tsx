import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admincomponents/Sidebar';
import Bottombar from '../../components/admincomponents/Bottombar';

const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1">
        {/* Large screen mode */}
        <div className="hidden md:block min-w-56">
          <Sidebar />
        </div>
        {/* Small screen mode */}
        <div className="fixed flex justify-center bottom-0 w-full md:hidden">
          <Bottombar />
        </div>
        <main className="flex-1 pl-6 bg-slate-600">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
