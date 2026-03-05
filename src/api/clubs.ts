import { api } from "./client";
import { Club, ClubBase } from "./types";

export const getClubs = async (): Promise<ClubBase[]> => {
    const response = await api.get<ClubBase[]>("/Club");
    return response.data;
};

export const getClubById = async (id: number): Promise<Club> => {
    const response = await api.get<Club>(`/Club/${id}`);
    return response.data;
};
