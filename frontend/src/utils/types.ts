type Coordinator = {
    uid:string;
    email: string;
}
type Events = {
    uId: string;
    title: string;
    description: string;
    date: Date;
    venue: string;
    fees: number | null;
    clubId: string;
    coordinators : Coordinator[];
}
type Club = {
    uId: string;
    clubName: string;
    adminId: string;
} | null
export type { Events,Club,Coordinator }