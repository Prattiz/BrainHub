import { Question } from "../../enterprise/entities/question";

export interface QuestionRepos{

    findBySlug(slug: string): Promise<Question | null>
    create(question: Question): Promise<void>
    findById(id: string): Promise<Question | null>
    delete(question: Question): Promise<void>
}