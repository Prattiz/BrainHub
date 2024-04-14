import { QuestionCommentsRepos } from "@/domain/forum/aplication/respository/questionComment-repository";
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


  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.ID === questionComment.ID,
    )

    this.items.splice(itemIndex, 1)
  }
}