import { Answer } from "../../enterprise/entities/answer";

export interface AnswerRepos{
    create(answer: Answer): Promise<void>
}