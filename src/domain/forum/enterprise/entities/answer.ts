import { Entity } from "@/core/entities/entity";
import { Optional } from "@/core/entities/optional";
import { UniqueEntityID } from "@/core/entities/unique-entitie-id";


export interface AnswerProps {

    content: string,
    authorId: UniqueEntityID,
    questionId: UniqueEntityID,
    createdAt: Date,
    updatedAt?: Date,

}

export class Answer extends Entity<AnswerProps>{

    get authorId() {
        return this.props.authorId
      }
    
      get questionId() {
        return this.props.questionId
      }
    
      get content() {
        return this.props.content
      }
    
      get createdAt() {
        return this.props.createdAt
      }
    
      get updatedAt() {
        return this.props.updatedAt
      }
    
      get excerpt() {
        return this.content
          .substring(0, 120)
          .trimEnd()
          .concat('...')
      }
    
      private touch() {
        this.props.updatedAt = new Date()
      }
    
      set content(content: string) {
        this.props.content = content
        this.touch()
      }

    static create( props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityID) {

        const answer = new Answer({
          ...props,
          createdAt: props.createdAt ?? new Date(),
        }, id)
    
        return answer
      }
}