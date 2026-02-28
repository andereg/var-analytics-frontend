import { api } from "./client";
import { Club } from "./types";

export const getClubs = async (): Promise<Club[]> => {
    const response = await api.get<Club[]>("/club");
    return response.data;
};

export const getClubById = async (id: number): Promise<Club> => {
    const response = await api.get<Club>(`/club${id}`);
    return response.data;
};
