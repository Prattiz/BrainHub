import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { AnswerCommentsRepos } from '../respository/answerComment-repository';


interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}


export class FetchAnswerCommentsUseCase {

    constructor(private answerCommentsRepository: AnswerCommentsRepos) {}

    async execute({ answerId, page }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {

        const answerComments = await this.answerCommentsRepository.findManyByAnswerId(answerId, { page })

        return { answerComments }
    }
}