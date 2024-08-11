import { useNavigate } from 'react-router-dom';
import sidebarItems from '../../constants/sidebar';
import { Button } from '../ui/button';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      id="drawer-navigation"
      className="fixed top-0 left-0 z-40 w-64 h-screen p-6 bg-gray-900 border-r border-gray-700"
      tabIndex={-1}
      aria-labelledby="drawer-navigation-label"
    >
      <div className="text-center text-2xl font-bold mb-6 text-blue-300">
        BMSCE EVENTS
      </div>
      <ul className="space-y-2">
        {sidebarItems.map((item, index) => (
          <li key={index}>
            <Button
              onClick={() => navigate(item.href)}
              variant="ghost"
              className="flex items-center w-full text-white justify-start hover:bg-gray-700 rounded-lg transition duration-150"
            >
              <item.icon className="w-6 h-6 mr-3" />
              <span className="text-lg font-medium">{item.label}</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
