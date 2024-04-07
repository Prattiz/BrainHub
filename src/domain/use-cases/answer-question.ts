import { Answer } from "../entities/answer"

interface AnswerQuestionRequest{

    instructorId: string,
    questionId: string,
    content: string
}

interface AnswerQuestionResponse{
    
}

export class AnswerQuestionUseCase{
    
    execute({ instructorId, questionId, content }: AnswerQuestionRequest){

        const answer = new Answer(content);

        return answer
    }
}