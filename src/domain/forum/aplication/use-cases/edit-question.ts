import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepos } from "../respository/question-repository";

import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { QuestionAttachmentsRepos } from "../respository/question-attachment-repository";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";


interface EditQuestionRequest{

    authorId: string,
    questionId: string,
    title?: string,
    content?: string,
    attachmentsIds: string[],
}

type EditQuestionResponse = Either< NotAllowedError | ResourceNotFoundError, { question: Question } >


export class EditQuestionUseCase{

    constructor(
        private questionsRepository: QuestionRepos,
        private questionAttachmentsRepository: QuestionAttachmentsRepos,
    ){}
    
    async execute({ content, authorId, title, questionId, attachmentsIds }: EditQuestionRequest): Promise<EditQuestionResponse>{

        const question = await this.questionsRepository.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId);
  
        const questionAttachmentList = new QuestionAttachmentList( currentQuestionAttachments );
    
        const questionAttachments = attachmentsIds.map((attachmentId) => {

            return QuestionAttachment.create({
                attachmentId: new UniqueEntityID(attachmentId),
                questionId: question.ID,
            })
        })
    
        questionAttachmentList.update(questionAttachments);
        
        question.attachments = questionAttachmentList 
        
        if(title){ question.title = title };
        
        if(content){ question.content = content };


        await this.questionsRepository.save(question)

        return right({ question })
    }
}