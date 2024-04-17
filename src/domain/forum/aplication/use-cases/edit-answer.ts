import { Either, left, right } from "@/core/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepos } from "../respository/answer-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface EditAnswerRequest{

    authorId: string,
    answerId: string,
    content: string,
}

type EditAnswerResponse = Either< NotAllowedError | ResourceNotFoundError, { answer: Answer }>

export class EditAnswerUseCase{

    constructor(private answerRepos: AnswerRepos){}
    
    async execute({ content, authorId, answerId }: EditAnswerRequest): Promise<EditAnswerResponse>{

        const answer = await this.answerRepos.findById(answerId);

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString()) {
            return left(new NotAllowedError())
        }

        answer.content = content

        await this.answerRepos.save(answer)

        return right({ answer })
    }
}