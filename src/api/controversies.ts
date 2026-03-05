import { api } from "./client";
import {Controversy} from "./types";

export const getControversies = async (): Promise<Controversy[]> => {
    const response = await api.get<Controversy[]>("/Competition");
    return response.data;
};
