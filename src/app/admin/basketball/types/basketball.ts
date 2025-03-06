export interface IBasketball {
    id: number;
    team_A: ITeam
    team_B: ITeam
    status: string;
    timeStart: string;
    timeEnd: string;
}

interface ITeam {
    uniName: string;
    score_Q1: number;
    score_Q2: number;
    score_OT: number;
    totalScore: number;
}

export interface IBaskballUpdate {
    score_A_Q1: number
    score_B_Q1: number
    score_A_Q2: number
    score_B_Q2: number
    score_A_OT: number
    score_B_OT: number
    id?: number
}