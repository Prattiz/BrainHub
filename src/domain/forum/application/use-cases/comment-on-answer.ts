import { AnswerRepos } from '../respository/answer-repository';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { AnswerCommentsRepos } from '../respository/answerComment-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import { Either, left, right } from '@/core/utils/either';


interface CommentOnAnswerUseCaseRequest {

  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either< ResourceNotFoundError, { answerComment: AnswerComment }>


export class CommentOnAnswerUseCase {
  constructor(private answersRepository: AnswerRepos, private answerCommentsRepository: AnswerCommentsRepos) {}


  async execute({ authorId, answerId, content }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse>{
    
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({ answerComment })
  }
}