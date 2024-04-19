import { PaginationParams } from "@/core/repository/pagination-params";

import { Question } from "../../enterprise/entities/question";

export interface QuestionRepos{

    findBySlug(slug: string): Promise<Question | null>
    create(question: Question): Promise<void>
    findById(id: string): Promise<Question | null>
    delete(question: Question): Promise<void>
    save(question: Question): Promise<void>
    findManyRecent(params: PaginationParams): Promise<Question[]>
}