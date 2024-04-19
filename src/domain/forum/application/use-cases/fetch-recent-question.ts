import { Question } from '@/domain/forum/enterprise/entities/question'
import { QuestionRepos } from '../respository/question-repository'
import { Either, right } from '@/core/utils/either';


interface FetchRecentQuestionsUseCaseRequest {
  page: number
}

type FetchRecentQuestionsUseCaseResponse = Either< null, { questions: Question[] } >

export class FetchRecentQuestionsUseCase {

  constructor(private questionsRepository: QuestionRepos) {}

  async execute({ page }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {

    const questions = await this.questionsRepository.findManyRecent({ page });

    return right({ questions })
  }
}