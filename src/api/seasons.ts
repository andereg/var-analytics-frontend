import { api } from "./client";
import { Season } from "./types";

export const getSeasons = async (): Promise<Season[]> => {
    const response = await api.get<Season[]>("/Season");
    return response.data;
};
