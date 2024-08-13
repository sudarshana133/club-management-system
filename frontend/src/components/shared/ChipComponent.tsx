import { X } from "lucide-react";

interface ChipComponentProps {
  value: string;
  onRemove: () => void;
}

const ChipComponent: React.FC<ChipComponentProps> = ({ value, onRemove }) => {
  return (
    <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-700 to-blue-500 text-white py-1 px-3 rounded-full shadow-lg w-fit mt-4">
      <span className="text-sm">{value}</span>
      <X
        className="w-4 h-4 cursor-pointer hover:text-gray-200 transition-colors"
        onClick={onRemove}
      />
    </div>
  );
};

export default ChipComponent;