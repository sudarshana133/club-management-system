import { z } from "zod";
const EventType = z.enum(["SOLO", "TEAM"]);
export const addEventFormSchema = z.object({
    title: z.string()
        .min(4, { message: "Title should be at least 4 characters long" })
        .max(25, { message: "Title should be a maximum of 25 characters" }),
    description: z.string()
        .min(10, { message: "Description should be at least 10 characters long" })
        .max(500, { message: "Description should be a maximum of 500 characters" }),
    venue: z.string()
        .min(5, { message: "Venue should be at least 10 characters long" })
        .max(500, { message: "Venue should be a maximum of 500 characters" }),
    date: z.string().min(1,{ message: "Date is required" }),
    clubId: z.string({ required_error: "Club ID is required" }),
    fee:z.string()||z.number(),
    eventType: EventType,
    numberOfMembers: z.string().min(1, { message: "Please mention number of members" }).optional(),
});