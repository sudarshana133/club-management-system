import { Trash } from "lucide-react";

interface ShowCoordinatorsProps {
  coordinators: string[];
  onDelete?: (email: string) => void;
  isOnDeletePresent?: boolean;
}

const ShowCoordinators: React.FC<ShowCoordinatorsProps> = ({
  coordinators,
  onDelete,
  isOnDeletePresent = false,
}) => {
  return (
    <div className="mt-1 flex flex-wrap gap-2">
      {coordinators.length > 0 ? (
        coordinators.map((email) => (
          <div
            key={email}
            className="flex items-center text-blue-400 text-sm bg-slate-700 rounded-md px-2 py-1 mb-1 hover:bg-slate-600 transition-colors"
          >
            <span>{email}</span>
            {isOnDeletePresent && onDelete && (
              <button
                onClick={() => onDelete(email)}
                className="text-red-400 hover:text-red-600 ml-2"
              >
                <Trash size={16} />
              </button>
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