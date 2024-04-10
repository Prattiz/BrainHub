import { Question } from "../../enterprise/entities/question";

export interface QuestionRepos{
    create(question: Question): Promise<void>
}