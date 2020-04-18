export interface NameMatchResponse{
    results: NameMatchResult[];
}

export interface NameMatchResult {
    name1: string;
    name2: string;
    score: number;
    results: AlgoOutputDetail[];
}


export interface AlgoOutputDetail{
    algorithm: string;
    weight: number;
    absolute_score: number;
    weighted_score: number;
}