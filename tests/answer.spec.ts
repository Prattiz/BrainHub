import { expect, test } from "vitest";
import { AnswerQuestionUseCase } from "../src/domain/use-cases/answer-question";

test('create an answer', () => {

  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({

    questionId: '1',
    instructorId: '1',
    content: 'test-answer',
  })

  expect(answer.content).toEqual('test-answer')
})