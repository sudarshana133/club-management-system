import { Events as EventType } from "../utils/types";

// src/constants/eventDetails.js
export const eventDetails = (event:EventType) => [
    {
      title: "Description",
      value: event.description,
    },
    {
      title: "Date",
      value: new Date(event.date).toLocaleDateString(),
    },
    {
      title: "Venue",
      value: event.venue,
    },
    {
      title: "Fees",
      value: event.fees ? `₹${event.fees}` : "Free",
    },
    {
      title: "Event Type",
      value: event.type === "SOLO" ? "SOLO EVENT" : "TEAM EVENT",
    },
    ...(event.type === "TEAM"
      ? [
          {
            title: "Team Member Count",
            value: event.memberCount,
          },
        ]
      : []),
  ];
  