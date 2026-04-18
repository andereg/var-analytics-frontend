import { api } from "./client";
import {ClubBase, Competition, Controversy, ControversyDto, ControversyType, RefereeBase, Season} from "./types";

export const getControversies = async (): Promise<Controversy[]> => {
    const response = await api.get<Controversy[]>("/Controversy");
    return response.data;
};

export const createControversy = async (controversy: ControversyDto) => {
    const response = await api.post("/Controversy", {
        date: controversy.date,
        description: controversy.description,
        referenceLink: controversy.referenceLink,

        beneficiary: controversy.beneficiaryId,
        victim: controversy.victimId,

        competitionId: controversy.competitionId,
        seasonId: controversy.seasonId,
        controversyTypeId: controversy.controversyTypeId,

        mainRefereeId: controversy.mainRefereeId,
        varRefereeId: controversy.varRefereeId,
        firstAssistantRefereeId: controversy.firstAssistantRefereeId,
        secondAssistantRefereeId: controversy.secondAssistantRefereeId,
    });

    return response.data;
};

