import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";
import AddCoordinatorsModal from "../../../components/adminComponents/AddCoordinatorsModal";
import ShowCoordinators from "../../../components/adminComponents/ShowCoordinators";
import { Coordinator } from "../../../utils/types";
import { Events as EventType } from "../../../utils/types";
import axios from "axios";
import { getToken } from "../../../utils/auth";
import { eventDetails } from "../../../constants/aboutevent";

// todo -> remove this state ka thing and fetch particular event only from backend
// DONT USE STATE
const AboutEvent = () => {
  const navigate = useNavigate();
  const { clubId, eventId } = useParams();
  const [event, setEvent] = useState<EventType>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [coordinators, setCoordinators] = useState<Coordinator[]>([]);
  const token = getToken();
  const getEvent = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/event/getEvent/${clubId}/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setEvent(res.data.msg);
      setCoordinators(res.data.msg.coordinators);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEvent();
  }, []);

  if (!event) {
    return <div>No event data found.</div>;
  }

  const handleAddCoordinators = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <div className="w-full max-w-2xl bg-gray-900 text-white shadow-2xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-center py-5">
          <h2 className="text-4xl font-bold">{event.title}</h2>
        </div>
        <div className="p-8 space-y-8">
          <div className="space-y-4">
            {eventDetails(event).map((detail, index) => (
              <div key={index} className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  {detail.title}
                </h3>
                <p className="text-gray-300">{detail.value}</p>
              </div>
            ))}
            <div className="border-b border-gray-700 pb-4">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                Coordinators
              </h3>
              {coordinators && coordinators.length > 0 ? (
                <ShowCoordinators
                  coordinators={coordinators}
                  setCoordinators={setCoordinators}
                  isOnDeletePresent
                  eventId={event.uId}
                />
              ) : (
                <p className="text-gray-400">No coordinators found</p>
              )}
            </div>
          </div>
          <Button
            className="bg-gradient-to-r from-blue-700 to-blue-500 hover:from-blue-600 hover:to-blue-400 transition-colors text-white font-semibold px-6 py-3"
            onClick={handleAddCoordinators}
          >
            Add Coordinators
          </Button>
        </div>
        <div className="bg-gray-800 text-center py-6">
          <Button
            onClick={() => navigate("/admin/events")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full transition-transform transform hover:scale-105"
          >
            Back to Events
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <AddCoordinatorsModal
          setCoordinators={setCoordinators}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          eventId={event.uId}
        />
      )}
    </div>
  );
};

export default AboutEvent;
