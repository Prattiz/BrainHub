import { AnswerCommentsRepos } from "@/domain/forum/aplication/respository/answerComment-repository"
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


  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.ID === answerComment.ID,
    )

    this.items.splice(itemIndex, 1)
  }
}