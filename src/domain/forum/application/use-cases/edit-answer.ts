import { Either, left, right } from "@/core/utils/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepos } from "../respository/answer-repository";
import { NotAllowedError } from "../../../../core/errors/not-allowed-error";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { AnswerAttachmentsRepos } from "../respository/answer-attachment-repository";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";


interface EditAnswerRequest{

    authorId: string,
    answerId: string,
    content: string,
    attachmentsIds: string[]
}

type EditAnswerResponse = Either< NotAllowedError | ResourceNotFoundError, { answer: Answer }>

export class EditAnswerUseCase{

    constructor(
        private answersRepository: AnswerRepos,
        private answerAttachmentsRepository: AnswerAttachmentsRepos,
      ) {}
    
    async execute({ content, authorId, answerId, attachmentsIds }: EditAnswerRequest): Promise<EditAnswerResponse>{

        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAllowedError())
        }

        const currentAnswerAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

        const answerAttachmentList = new AnswerAttachmentList(currentAnswerAttachments);

        const answerAttachments = attachmentsIds.map((attachmentId) => {

            return AnswerAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                answerId: answer.ID,
            })  
        })

        answerAttachmentList.update(answerAttachments)

        answer.attachments = answerAttachmentList

        answer.content = content

        await this.answersRepository.save(answer)

        return right({ answer })
    }
}