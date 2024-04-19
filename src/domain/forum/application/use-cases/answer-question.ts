import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepos } from "../respository/answer-repository";
import { Either, right } from "@/core/utils/either";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";

interface AnswerQuestionRequest{

    instructorId: string,
    questionId: string,
    content: string,
    attachmentsIds: string[]
}

type AnswerQuestionResponse = Either< null, { answer: Answer } >

export class AnswerQuestionUseCase{
    
    constructor(private answersRepos: AnswerRepos){}
    
    async execute({ instructorId, questionId, content, attachmentsIds }: AnswerQuestionRequest): Promise<AnswerQuestionResponse>{

        const answer = Answer.create({

            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId),
        })

        const answerAttachments = attachmentsIds.map((attachmentId) => {
            return AnswerAttachment.create({
              attachmentId: new UniqueEntityID(attachmentId),
              answerId: answer.ID,
            })
          })
      
          answer.attachments = new AnswerAttachmentList(answerAttachments)

        await this.answersRepos.create(answer)

        return right({ answer })
    }
}