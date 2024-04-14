import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { QuestionCommentsRepos } from '../respository/questionComment-repository';


interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}


export class FetchQuestionCommentsUseCase {

    constructor(private questionCommentsRepository: QuestionCommentsRepos) {}

    async execute({ questionId, page }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {

        const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page })

        return { questionComments }
    }
}