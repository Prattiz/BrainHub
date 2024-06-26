import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionRepos } from "../respository/question-repository";
import { QuestionCommentsRepos } from "../respository/questionComment-repository";

import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { ResourceNotFoundError } from "../../../../core/errors/resource-not-found-error";
import { Either, left, right } from "@/core/utils/either";


interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either< ResourceNotFoundError,  { questionComment: QuestionComment } >


export class CommentOnQuestionUseCase {
  constructor(private questionsRepository: QuestionRepos, private questionCommentsRepository: QuestionCommentsRepos){}


  async execute({ authorId, questionId, content }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse>{

    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({

      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment)

    return right({ questionComment })
  }
}