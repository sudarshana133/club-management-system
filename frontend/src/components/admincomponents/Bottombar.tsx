import { useNavigate } from 'react-router-dom';
import sidebarItems from '../../constants/sidebar';

const Bottombar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="fixed bottom-0 left-0 z-40 w-full h-12 bg-gray-800 border-t border-gray-700 flex justify-evenly items-center"
    >
      {sidebarItems.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(item.href)}
          className="text-white flex flex-col items-center text-sm"
        >
          <item.icon className="w-5 h-5" />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Bottombar;