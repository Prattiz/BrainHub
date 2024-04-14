import { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentsRepos {
  create(questionComment: QuestionComment): Promise<void>
}