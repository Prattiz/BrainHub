import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepos } from "../respository/question-repository";
import { Either, right } from "@/core/either";


interface CreateQuestionRequest{

    authorId: string,
    title: string,
    content: string,
}

type CreateQuestionResponse = Either< null, { question: Question }>

export class CreateQuestionUseCase{

    constructor(private questionRepos: QuestionRepos){}
    
    async execute({ content, authorId, title }: CreateQuestionRequest): Promise<CreateQuestionResponse>{

        const question = Question.create({

            authorId: new UniqueEntityID(authorId),
            content,
            title,
        });

        await this.questionRepos.create(question)

        return right({ question })
    }
}