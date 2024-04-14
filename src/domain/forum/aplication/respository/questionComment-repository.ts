import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepos {
  create(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  delete(questionComment: QuestionComment): Promise<void>
}