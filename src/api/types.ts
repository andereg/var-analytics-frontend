export interface Competition {
    id: number;
    name: string;
    description: string;
    logo: string;
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

    competition: Competition;
    season: Season;
    controversyType: ControversyType;

    mainReferee: Referee;
    varReferee: Referee;
    firstAssistantReferee: Referee;
    secondAssistantReferee: Referee;
}

export interface Referee {
    id: number;
    name: string;
    surname: string;
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