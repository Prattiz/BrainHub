import { Question } from "../../enterprise/entities/question";
import { QuestionRepos } from "../respository/question-repository";


interface GetQuestionBySlugRequest{

    slug: string
}

interface GetQuestionBySlugResponse{

    question: Question
}

export class GetQuestionBySlugUseCase{

    constructor(private questionRepos: QuestionRepos){}
    
    async execute({ slug }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse>{

        const question = await this.questionRepos.findBySlug(slug);


        if(!question){
            throw new Error('question not found...')
        }


        return { question }
    }
}