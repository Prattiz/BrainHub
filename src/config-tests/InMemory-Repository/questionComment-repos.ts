import { QuestionCommentsRepos } from "@/domain/forum/aplication/respository/questionComment-repository";
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";


export class InMemoryQuestionCommentsRepos implements QuestionCommentsRepos {

  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}