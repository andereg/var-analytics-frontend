export interface Competition {
    id: number;
    name: string;
    description: string;
    logo: string;
    abbreviation: string;
    controversies: Controversy[];
}

export interface Season {
    id: number;
    seasonName: string;
}

export interface ControversyType {
    id: number;
    code: string;
    description: string;
}

// Base Club (used inside controversy to avoid infinite nesting)
export interface ClubBase {
    id: number;
    abbreviation: string;
    name: string;
    description: string;
    logo: string;
}

export interface Controversy {
    id: number;
    date: string; // ISO string
    description: string;
    referenceLink: string;

    beneficiary: ClubBase;
    victim: ClubBase;

    result: string;

    competition: Competition;
    season: Season;
    controversyType: ControversyType;

    mainReferee: RefereeBase;
    varReferee: RefereeBase;
    firstAssistantReferee: RefereeBase;
    secondAssistantReferee: RefereeBase;
}

export interface ControversyDto {
    date: string;
    description: string;
    referenceLink: string;

    beneficiaryId: number;
    victimId: number;

    result: string;

    competitionId: number;
    seasonId: number;
    controversyTypeId: number;

    mainRefereeId: number;
    varRefereeId: number;
    firstAssistantRefereeId: number;
    secondAssistantRefereeId: number;
}

export interface RefereeBase {
    id: number;
    name: string;
    surname: string;
}

export interface Referee {
    id: number;
    name: string;
    surname: string;

    mainRefereeControversies: Controversy[];
    varRefereeControversies: Controversy[];
    firstAssistantRefereeControversies: Controversy[];
    secondAssistantRefereeControversies: Controversy[];
}

// Main Club Interface (for full object)
export interface Club {
    id: number;
    abbreviation: string;
    name: string;
    description: string;
    logo: string;

    againstControversies: Controversy[];
    forControversies: Controversy[];

    currentSeasonAgainstControversies: Controversy[];
    currentSeasonForControversies: Controversy[];
}