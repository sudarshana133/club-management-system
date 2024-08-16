type Events = {
    uId: string;
    title: string;
    description: string;
    date: Date;
    venue: string;
    fees: number | null;
    clubId: string;
    coordinators: string[];
}
type Club = {
    uId: string;
    clubName: string;
    adminId: string;
} | null
type Member = {
    uId: string;
    email: string;
    password: string;
    clubName: string | null;
    eventId: string | null;
    role: string;
};
type tokenPayload = {
    id: string;
    email: string;
    role: "ADMIN" | "STUDENT";  
}
export type { Events, Club, Member,tokenPayload }