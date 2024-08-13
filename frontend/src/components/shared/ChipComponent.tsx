import { X } from "lucide-react";

interface ChipComponentProps {
  value: string;
}

const ChipComponent: React.FC<ChipComponentProps> = ({ value }) => {
  return (
    <div>
        <h5>{value}</h5>
        <X/>
    </div>
  )
};

export default ChipComponent;
