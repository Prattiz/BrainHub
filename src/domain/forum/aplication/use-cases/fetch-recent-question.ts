import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionRepos } from '../respository/question-repository'


interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

interface FetchRecentQuestionsUseCaseResponse {
  questions: Question[]
}


export class FetchRecentQuestionsUseCase {

  constructor(private questionsRepository: QuestionRepos) {}

  async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {

    const questions = await this.questionsRepository.findManyRecent({ page });

    return { questions }
  }
}