import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { useState } from "react";
import AddCoordinatorsModal from "../../../components/adminComponents/AddCoordinatorsModal";

export type Coordinators = {
  email: string;
  id: string;
};

const AboutEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCoordinators, setSelectedCoordinators] = useState<Coordinators[]>([]);

  if (!event) {
    return <div>No event data found.</div>;
  }

  const handleAddCoordinators = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-2xl bg-gray-900 text-white shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-300 to-blue-400 text-center py-5">
          <h2 className="text-3xl font-bold text-white">{event.title}</h2>
        </div>
        <div className="p-6 space-y-6">
          <Button className="bg-gradient-to-r from-blue-700 to-blue-500" onClick={handleAddCoordinators}>
            Add Coordinators
          </Button>
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Description</h3>
            <p className="text-gray-300">{event.description}</p>
          </div>
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Date</h3>
            <p className="text-gray-300">
              {new Date(event.date).toLocaleDateString()}
            </p>
          </div>
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Venue</h3>
            <p className="text-gray-300">{event.venue}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Fees</h3>
            <p>{event.fees ? `₹${event.fees}` : "Free"}</p>
          </div>
        </div>
        <div className="bg-gray-800 text-center py-4">
          <Button
            onClick={() => navigate("/admin/events")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition transform hover:scale-105"
          >
            Back to Events
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <AddCoordinatorsModal 
          open={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          setSelectedCoordinators={setSelectedCoordinators}
          selectedCoordinators={selectedCoordinators}
          eventId={event.uId}
        />
      )}
    </div>
  );
};

export default AboutEvent;
