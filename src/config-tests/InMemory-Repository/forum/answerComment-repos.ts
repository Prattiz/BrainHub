import { PaginationParams } from "@/core/repository/pagination-params"
import { AnswerCommentsRepos } from "@/domain/forum/application/respository/answerComment-repository"
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepos implements AnswerCommentsRepos{

  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.ID.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.ID === answerComment.ID,
    )

    this.items.splice(itemIndex, 1)
  }
}