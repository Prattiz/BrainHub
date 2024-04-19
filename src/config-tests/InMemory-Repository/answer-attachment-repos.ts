import { AnswerAttachmentsRepos } from '@/domain/forum/aplication/respository/answer-attachment-repository';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';


export class InMemoryAnswerAttachmentsRepos implements AnswerAttachmentsRepos {

  public items: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {

    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = answerAttachments
  }
}