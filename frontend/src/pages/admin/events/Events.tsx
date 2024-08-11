import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Edit, Trash, Loader, Sparkles } from "lucide-react";
import DeleteAlert from "../../../components/adminComponents/DeleteAlert";
import UpdateModal from "../../../components/adminComponents/UpdateEvent";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../components/ui/use-toast";
import { useNavigate } from "react-router-dom";

type Events = {
  uId: string;
  title: string;
  description: string;
  date: Date;
  venue: string;
  fees: number | null;
  clubId: string;
};

const Events = () => {
  const [events, setEvents] = useState<Events[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Events | null>(null);
  const { toast } = useToast();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const getClubEvents = async () => {
    try {
      const res = await axios.get("http://localhost:8000/event/getEvent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(res.data.msg[0].events);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (updatedEvent: Events) => {
    if (selectedEvent) {
      setLoadingId(selectedEvent.uId);
      try {
        await axios.put(
          `http://localhost:8000/event/updateEvent/${selectedEvent.uId}`,
          updatedEvent,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEvents(
          events.map((event) =>
            event.uId === selectedEvent.uId ? updatedEvent : event
          )
        );
        toast({
          title: "Updated event",
          description: "Successfully updated event",
        });
      } catch (error) {
        console.error("Error updating event:", error);
        toast({
          title: "Error!",
          description: "Error while updating event",
          variant: "destructive",
        });
      } finally {
        setLoadingId(null);
        setUpdateModalOpen(false);
        setSelectedEvent(null);
      }
    }
  };

  const handleDelete = async () => {
    if (deleteId) {
      setLoadingId(deleteId);
      try {
        await axios.request({
          url: `http://localhost:8000/event/deleteEvent/${deleteId}`,
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            clubId: events.find((event) => event.uId === deleteId)?.clubId,
          },
        });

        setEvents(events.filter((event) => event.uId !== deleteId));
        toast({
          title: "Delete",
          description: "Deleted event successfully",
        });
      } catch (error) {
        console.error("Error deleting event:", error);
        toast({
          title: "Error!",
          description: "Error while deleting event",
          variant: "destructive",
        });
      } finally {
        setLoadingId(null);
        setAlertOpen(false);
        setDeleteId(null);
      }
    }
  };

  const expandClubDetails = (event: Events) => {
    navigate("/admin/event", { state: { event } });
  };
  const handleAI = async()=>{
    
  }
  useEffect(() => {
    getClubEvents();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white mb-10 md:mb-0">
      <div className="space-y-6">
        {events.map((event) => (
          <div
            key={event.uId}
            onClick={() => expandClubDetails(event)}
            className="border border-gray-700 p-6 rounded-lg cursor-pointer hover:shadow-lg hover:border-teal-400 transition-shadow duration-200 ease-in-out bg-gray-800"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-300 capitalize">
                {event.title}
              </h2>
              <div className="flex space-x-2">
                <Button className="relative bg-gradient-to-tr ai" onClick={handleAI}>
                  <Sparkles />
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                    setUpdateModalOpen(true);
                  }}
                  className="text-blue-400 hover:text-blue-600 p-2 rounded flex items-center"
                  disabled={loadingId === event.uId}
                >
                  {loadingId === event.uId ? (
                    <Loader size={20} />
                  ) : (
                    <Edit size={20} />
                  )}
                </Button>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(event.uId);
                    setAlertOpen(true);
                  }}
                  className="text-red-400 hover:text-red-600 p-2 rounded flex items-center"
                  disabled={loadingId === event.uId}
                >
                  {loadingId === event.uId ? (
                    <Loader size={20} />
                  ) : (
                    <Trash size={20} />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-gray-400 mb-4">{event.description}</p>
            <div className="flex justify-between items-center text-gray-500">
              <span className="flex-1 text-left capitalize">{event.venue}</span>
              <span className="flex-1 text-center">
                {new Date(event.date).toLocaleDateString()}
              </span>
              <span className="flex-1 text-right">
                <span
                  className={event.fees ? "text-green-400" : "text-red-400"}
                >
                  {event.fees ? `₹${event.fees}` : "Free"}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <DeleteAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleDelete}
      />
      {selectedEvent && (
        <UpdateModal
          open={updateModalOpen}
          onClose={() => setUpdateModalOpen(false)}
          event={selectedEvent}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default Events;
