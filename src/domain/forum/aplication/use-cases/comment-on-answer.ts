import { AnswerRepos } from '../respository/answer-repository';
import { UniqueEntityID } from '@/core/entities/unique-entitie-id';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { AnswerCommentsRepos } from '../respository/answerComment-repository';


interface CommentOnAnswerUseCaseRequest {

  authorId: string
  answerId: string
  content: string
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment
}


export class CommentOnAnswerUseCase {
  constructor(private answersRepository: AnswerRepos, private answerCommentsRepository: AnswerCommentsRepos) {}


  async execute({ authorId, answerId, content }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse>{
    
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const answerComment = AnswerComment.create({
      
      authorId: new UniqueEntityID(authorId),
      answerId: new UniqueEntityID(answerId),
      content
    })

    await this.answerCommentsRepository.create(answerComment)

    return { answerComment }
  }
}