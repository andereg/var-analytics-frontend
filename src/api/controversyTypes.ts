import { api } from "./client";
import {ControversyType} from "./types";

export const getControversyTypes = async (): Promise<ControversyType[]> => {
    const response = await api.get<ControversyType[]>("/ControversyType");
    return response.data;
};
