import { Either, left, right } from "@/core/either";
import { Question } from "../../enterprise/entities/question";
import { QuestionRepos } from "../respository/question-repository";
import { NotAllowedError } from "./errors/not-allowed-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";


interface EditQuestionRequest{

    authorId: string,
    questionId: string,
    title?: string,
    content?: string,
}

type EditQuestionResponse = Either< NotAllowedError | ResourceNotFoundError, { question: Question } >

export class EditQuestionUseCase{

    constructor(private questionRepos: QuestionRepos){}
    
    async execute({ content, authorId, title, questionId }: EditQuestionRequest): Promise<EditQuestionResponse>{

        const question = await this.questionRepos.findById(questionId);

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        if(title){ question.title = title };

        if(content){ question.content = content};

        await this.questionRepos.save(question)

        return right({ question })
    }
}