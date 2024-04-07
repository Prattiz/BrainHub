import { Answer } from "../entities/answer"
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

        const answer = new Answer(content, instructorId, questionId);

        await this.answersRepos.create(answer)

        return answer
    }
}