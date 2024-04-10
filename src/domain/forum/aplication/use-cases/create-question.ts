import { UniqueEntityID } from "@/core/entities/unique-entitie-id";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepos } from "../respository/question-repository";


interface CreateQuestionRequest{

    authorId: string,
    title: string,
    content: string,
}

interface CreateQuestionResponse{
    question: Question
}

export class CreateQuestionUseCase{

    constructor(private questionRepos: QuestionRepos){}
    
    async execute({ content, authorId, title }: CreateQuestionRequest): Promise<CreateQuestionResponse>{

        const question = Question.create({

            authorId: new UniqueEntityID(authorId),
            content,
            title,
        });

        await this.questionRepos.create(question)

        return { question }
    }
}