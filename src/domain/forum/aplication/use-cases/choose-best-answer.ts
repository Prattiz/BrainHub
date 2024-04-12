import { AnswerRepos } from "../respository/answer-repository";

import { Question } from "../../enterprise/entities/question";
import { QuestionRepos } from "../respository/question-repository";


interface ChooseBestAnswerRequest{

    answerId: string,
    authorId: string
}

interface ChooseBestAnswerResponse{

    question: Question 
}

export class ChooseBestAnswerUseCase{
    
    constructor(private answersRepos: AnswerRepos, private questionsRepos: QuestionRepos){}
    
    async execute({ answerId, authorId }: ChooseBestAnswerRequest): Promise<ChooseBestAnswerResponse>{

        const answer = await this.answersRepos.findById(answerId);

        if(!answer){
            throw new Error('Answer not found...')
        }

        const question = await this.questionsRepos.findById(answer.questionId.toString());

        if(!question){
            throw new Error('Question not found...')
        }

        if(authorId !== question.authorId.toString()){
            throw new Error('Not allowed...')
        }

        question.bestAnswerId = answer.ID

        await this.answersRepos.save(answer)

        return { question }
    }
}