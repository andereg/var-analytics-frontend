import { api } from "./client";
import {Competition} from "./types";

export const getCompetitions = async (): Promise<Competition[]> => {
    const response = await api.get<Competition[]>("/Competition");
    return response.data;
};
