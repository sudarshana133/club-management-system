import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type Event = {
  uId: string;
  title: string;
  description: string;
  date: Date;
  venue: string;
  fees: number | null;
  clubId: string;
};

interface EventCardProps {
  id: string;
  title: string;
  description: string;
  date: Date;
  venue: string;
}

const LatestEvents = () => {
  const [latestEvents, setLatestEvents] = useState<Event[]>([]);
  const token = Cookies.get("token");
  const getLatestEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8000/event/latestevents", {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      });
      setLatestEvents(res.data.msg);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    getLatestEvents();
  }, []);

  return (
    <div className="text-white p-6 bg-gray-900">
      <h1 className="text-4xl font-bold text-white mb-8 drop-shadow-lg">
        Latest Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {latestEvents.length > 0 ? (
          latestEvents.map((event) => (
            <EventCard
              id={event.uId}
              key={event.uId}
              title={event.title}
              description={event.description}
              date={event.date}
              venue={event.venue}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400">
            No events available.
          </p>
        )}
      </div>
    </div>
  );
};

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  date,
  venue,
  id
}) => {
    const navigate = useNavigate();
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-gray-800 text-white transition transform hover:-translate-y-2 hover:shadow-2xl flex flex-col">
      <div className="p-6 flex-1">
        <h1 className="font-bold text-2xl mb-2 text-blue-400 capitalize">
          {title}
        </h1>
        <p className="text-gray-400 text-base mb-4 capitalize">{description}</p>
        <div className="text-sm text-gray-500 mb-4">
          <div>
            <strong>Date:</strong> {new Date(date).toLocaleDateString()}
          </div>
          <div>
            <strong>Venue:</strong> {venue}
          </div>
        </div>
      </div>
      <div className="p-6">
        <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
            onClick={()=>{navigate(`/events/${id}`)}}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default LatestEvents;
