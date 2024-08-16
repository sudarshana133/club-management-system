import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Club, Events } from "../../../utils/types";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "../../../components/ui/button";
import { useToast } from "../../../components/ui/use-toast";

import placeholderVideo from "/not-found.mp4";
import placeholderImage from "/loading.jpg";

const AboutEvent = () => {
  const { clubId, eventId } = useParams();
  const [event, setEvent] = useState<Events>();
  const [club, setClub] = useState<Club>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("token");
  const { toast } = useToast();
  const [isSubmitting,setIsSubmitting] = useState<boolean>(false);

  const getEvent = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/event/getEvent/${clubId}/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvent(res.data.msg);
    } catch (error) {
      setError("Error fetching event details.");
      console.log("Error fetching event:", error);
    }
  };

  const getClub = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/club/clubs/${clubId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setClub(res.data.msg);
    } catch (error) {
      setError("Error fetching club details.");
      console.log("Error fetching club:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([getEvent(), getClub()]);
      } catch (error) {
        setError("Error fetching data.");
        console.log("Error in fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clubId, eventId, token]);

  const handleRegister = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/event/register`,
        {
          eventId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: res.data.msg,
        description: res.data.msg,
      });
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Error!",
        description: "Some error occurred while registering for the event",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 flex justify-center flex-col items-center">
        <img src={placeholderImage} alt="loading" width={350} />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <video
          src={placeholderVideo}
          autoPlay
          loop
          className="mx-auto mb-4 w-64 h-auto"
        />
        <p>{error}</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="mx-auto p-6 max-w-3xl text-center">
        <video
          src={placeholderVideo}
          autoPlay
          loop
          muted
          playsInline
          className="mx-auto mb-4 w-64 h-auto"
        />
        <p className="text-lg text-gray-500">Event not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4 text-gray-100">
          {event?.title}
        </h1>
        <p className="text-xl mb-2 text-gray-300">
          {event?.date
            ? new Date(event.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Date not available"}
        </p>
        <p className="text-lg mb-4 text-gray-400">{event?.venue}</p>
        <p className="text-base text-gray-200">{event?.description}</p>
        <div className="mt-6 border-t border-gray-700 pt-4">
          <p className="text-lg font-semibold text-gray-300">
            Organized by:{" "}
            <span className="text-teal-400">{club?.clubName}</span>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Button
          disabled={isSubmitting}
          onClick={handleRegister}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Register for Event
        </Button>
      </div>
    </div>
  );
};

export default AboutEvent;
