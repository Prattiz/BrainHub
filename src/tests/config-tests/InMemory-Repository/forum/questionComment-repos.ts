import { PaginationParams } from "@/core/repository/pagination-params";
import { QuestionCommentsRepos } from "@/domain/forum/application/respository/questionComment-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";


export class InMemoryQuestionCommentsRepos implements QuestionCommentsRepos {

  public items: QuestionComment[] = []

  
  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async findById(id: string) {
    const questionComment = this.items.find((item) => item.ID.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.ID === questionComment.ID,
    )

    this.items.splice(itemIndex, 1)
  }
}