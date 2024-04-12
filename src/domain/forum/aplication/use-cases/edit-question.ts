import { Question } from "../../enterprise/entities/question";
import { QuestionRepos } from "../respository/question-repository";


interface EditQuestionRequest{

    authorId: string,
    questionId: string,
    title?: string,
    content?: string,
}

interface EditQuestionResponse{
    
    question: Question
}

export class EditQuestionUseCase{

    constructor(private questionRepos: QuestionRepos){}
    
    async execute({ content, authorId, title, questionId }: EditQuestionRequest): Promise<EditQuestionResponse>{

        const question = await this.questionRepos.findById(questionId);

        if (!question) {
            throw new Error('Question not found.')
        }

        if (authorId !== question.authorId.toString()) {
            throw new Error('Not allowed.')
        }

        if(title){ question.title = title };

        if(content){ question.content = content};

        await this.questionRepos.save(question)

        return { question }
    }
}