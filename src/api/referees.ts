import { api } from "./client";
import {Referee} from "./types";

export const getReferees = async (): Promise<Referee[]> => {
    const response = await api.get<Referee[]>("/Referee");
    return response.data;
};

export const getRefereeById = async (id: number): Promise<Referee> => {
    const response = await api.get<Referee>(`/Referee/${id}`);
    return response.data;
};
