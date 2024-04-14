import { AnswerCommentsRepos } from "@/domain/forum/aplication/respository/answerComment-repository"
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepos implements AnswerCommentsRepos{

  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }
}