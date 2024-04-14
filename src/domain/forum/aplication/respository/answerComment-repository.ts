import { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentsRepos {
  create(answerComment: AnswerComment): Promise<void>
}