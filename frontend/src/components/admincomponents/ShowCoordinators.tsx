import { Trash } from "lucide-react";
import { Coordinator } from "../../utils/types";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface ShowCoordinatorsProps {
  coordinators: Coordinator[];
  isOnDeletePresent?: boolean;
  eventId?: string;
  setCoordinators?: React.Dispatch<React.SetStateAction<Coordinator[]>>;
}

const ShowCoordinators: React.FC<ShowCoordinatorsProps> = ({
  coordinators,
  isOnDeletePresent = false,
  eventId,
  setCoordinators,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = Cookies.get("token");

  const deleteCoordinator = async (coordinatorId: string) => {
    setIsLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/deleteCoordinator/${eventId}`,
        { coordinatorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCoordinators?.(coordinators.filter(coordinator => coordinator.uId !== coordinatorId));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-1 flex flex-wrap gap-2">
      {coordinators.length > 0 ? (
        coordinators.map((coordinator) => (
          <div
            key={coordinator.uId}
            className="flex items-center text-blue-400 text-sm bg-slate-700 rounded-md px-2 py-1 mb-1 hover:bg-slate-600 transition-colors"
          >
            <span>{coordinator.email}</span>
            {isOnDeletePresent && (
              <Button
                disabled={isLoading}
                onClick={() => deleteCoordinator(coordinator.uId)}
                className={`text-red-400 hover:text-red-600 ml-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Trash size={16} />
              </Button>
            )}
          </div>
        ))
      ) : (
        <div className="text-gray-500 text-sm">No coordinators available</div>
      )}
    </div>
  );
};

export default ShowCoordinators;
