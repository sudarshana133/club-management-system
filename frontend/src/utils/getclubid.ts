import axios from "axios";

export async function getClubId(token: string) {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/getClubId`, {
            token
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const clubId = res.data.msg;
        return clubId;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "An error occurred while fetching the club ID");
        }
        throw new Error("An unexpected error occurred");
    }
}