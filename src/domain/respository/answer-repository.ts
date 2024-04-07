import { Answer } from "../entities/answer";

export interface AnswerRepos{
    create(answer: Answer): Promise<void>
}