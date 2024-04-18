import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentsRepos {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}