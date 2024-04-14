import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionRepos } from "../respository/question-repository";
import { QuestionCommentsRepos } from "../respository/questionComment-repository";

import { UniqueEntityID } from "@/core/entities/unique-entitie-id";


interface CommentOnQuestionUseCaseRequest {
  authorId: string
  questionId: string
  content: string
}

interface CommentOnQuestionUseCaseResponse {
  questionComment: QuestionComment
}


export class CommentOnQuestionUseCase {
  constructor(private questionsRepository: QuestionRepos, private questionCommentsRepository: QuestionCommentsRepos){}


  async execute({ authorId, questionId, content }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse>{

    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found.')
    }

    const questionComment = QuestionComment.create({

      authorId: new UniqueEntityID(authorId),
      questionId: new UniqueEntityID(questionId),
      content,
    });

    await this.questionCommentsRepository.create(questionComment)

    return { questionComment }
  }
}