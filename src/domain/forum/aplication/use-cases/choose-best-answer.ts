import { AnswerRepos } from "../respository/answer-repository";

import { Question } from "../../enterprise/entities/question";
import { QuestionRepos } from "../respository/question-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { NotAllowedError } from "./errors/not-allowed-error";


interface ChooseBestAnswerRequest{

    answerId: string,
    authorId: string
}

type ChooseBestAnswerResponse = Either<NotAllowedError | ResourceNotFoundError, { question: Question }>

export class ChooseBestAnswerUseCase{
    
    constructor(private answersRepos: AnswerRepos, private questionsRepos: QuestionRepos){}
    
    async execute({ answerId, authorId }: ChooseBestAnswerRequest): Promise<ChooseBestAnswerResponse>{

        const answer = await this.answersRepos.findById(answerId);

        if(!answer){
            return left(new ResourceNotFoundError())
        }

        const question = await this.questionsRepos.findById(answer.questionId.toString());

        if(!question){
            return left(new ResourceNotFoundError())
        }

        if(authorId !== question.authorId.toString()){
            return left(new NotAllowedError())
        }

        question.bestAnswerId = answer.ID

        await this.answersRepos.save(answer)

        return right({ question })
    }
}