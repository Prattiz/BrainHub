import { UniqueEntityID } from '@/core/entities/unique-entitie-id'
import { Optional } from '@/core/entities/optional'
import { Comment, CommentProps } from './comment'


export interface AnswerCommentProps extends CommentProps {

  authorId: UniqueEntityID
  answerId: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}


export class AnswerComment extends Comment<AnswerCommentProps> {
  
  get answerId() {
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}