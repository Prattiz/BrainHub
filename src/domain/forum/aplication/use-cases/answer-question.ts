import { UniqueEntityID } from "@/core/entities/unique-entitie-id";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepos } from "../respository/answer-repository";

interface AnswerQuestionRequest{

    instructorId: string,
    questionId: string,
    content: string,
}

interface AnswerQuestionResponse{
    
}

export class AnswerQuestionUseCase{
    constructor(private answersRepos: AnswerRepos){}
    
    async execute({ instructorId, questionId, content }: AnswerQuestionRequest){

        const answer = Answer.create({

            content,
            authorId: new UniqueEntityID(instructorId),
            questionId: new UniqueEntityID(questionId)
        })

        await this.answersRepos.create(answer)

        return answer
    }
}