import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepos } from "../respository/answer-repository";


interface EditAnswerRequest{

    authorId: string,
    answerId: string,
    content: string,
}

interface EditAnswerResponse{
    
    answer: Answer
}

export class EditAnswerUseCase{

    constructor(private answerRepos: AnswerRepos){}
    
    async execute({ content, authorId, answerId }: EditAnswerRequest): Promise<EditAnswerResponse>{

        const answer = await this.answerRepos.findById(answerId);

        if (!answer) {
            throw new Error('Answer not found.')
        }

        if (authorId !== answer.authorId.toString()) {
            throw new Error('Not allowed.')
        }

        answer.content = content

        await this.answerRepos.save(answer)

        return { answer }
    }
}