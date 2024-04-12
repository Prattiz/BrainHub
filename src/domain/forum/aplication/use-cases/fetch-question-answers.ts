import { AnswerRepos } from "../respository/answer-repository"
import { Answer } from '@/domain/forum/enterprise/entities/answer'

interface FetchQuestionAnswersUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {

  constructor(private answersRepository: AnswerRepos) {}

  async execute({ questionId, page }: FetchQuestionAnswersUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {

    const answers = await this.answersRepository.findManyByQuestionId( questionId, { page });

    return { answers }
  }
}