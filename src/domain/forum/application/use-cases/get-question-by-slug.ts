import { Either, left, right } from "@/core/utils/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepos } from "../respository/question-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface GetQuestionBySlugRequest{

    slug: string
}


type GetQuestionBySlugResponse = Either< ResourceNotFoundError, { question: Question } >

export class GetQuestionBySlugUseCase{

    constructor(private questionRepos: QuestionRepos){}
    
    async execute({ slug }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse>{

        const question = await this.questionRepos.findBySlug(slug);


        if(!question){
            return left(new ResourceNotFoundError())
        }


        return right({ question })
    }
}