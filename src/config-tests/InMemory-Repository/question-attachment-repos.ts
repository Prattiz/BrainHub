import { QuestionAttachmentsRepos } from "@/domain/forum/aplication/respository/question-attachment-repository";
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';


export class InMemoryQuestionAttachmentsRepository implements QuestionAttachmentsRepos{

  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    
    const questionAttachments = this.items.filter((item) => item.questionId.toString() === questionId);

    return questionAttachments
  }
}