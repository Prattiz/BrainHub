import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';
import { QuestionCommentsRepos } from '../respository/questionComment-repository';
import { Either, right } from '@/core/utils/either';


interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either< null, { questionComments: QuestionComment[] } >


export class FetchQuestionCommentsUseCase {

    constructor(private questionCommentsRepository: QuestionCommentsRepos) {}

    async execute({ questionId, page }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {

        const questionComments = await this.questionCommentsRepository.findManyByQuestionId(questionId, { page })

        return right({ questionComments })
    }
}