import { expect, test } from "vitest";

import { AnswerQuestionUseCase } from "@/domain/forum/aplication/use-cases/answer-question";
import { AnswerRepos } from "@/domain/forum/aplication/respository/answer-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

const fakeAnswersRepository: AnswerRepos = {
    create: async (answer: Answer) => {},
}

test('create an answer', async () => {

  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({

    questionId: '1',
    instructorId: '1',
    content: 'the answer',
  })

  expect(answer.content).toEqual('the answer')
})