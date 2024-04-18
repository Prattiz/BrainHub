import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepos } from "../respository/question-repository";
import { Either, right } from "@/core/either";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";


interface CreateQuestionRequest{

    authorId: string,
    title: string,
    content: string,
    attachmentIds: string[]
}

type CreateQuestionResponse = Either< null, { question: Question }>

export class CreateQuestionUseCase{

    constructor(private questionRepos: QuestionRepos){}
    
    async execute({ content, authorId, title, attachmentIds }: CreateQuestionRequest): Promise<CreateQuestionResponse>{

        
        const question = Question.create({
            
            authorId: new UniqueEntityID(authorId),
            content,
            title,
            
        });
        
        const questionAttachments = attachmentIds.map(id => {
            return QuestionAttachment.create({
                attachmentId: new UniqueEntityID(id),
                questionId: question.ID
            })
        })

        question.attachments = new QuestionAttachmentList(questionAttachments)

        await this.questionRepos.create(question)

        return right({ question })
    }
}