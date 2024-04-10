import { CreateQuestionUseCase } from '@/domain/forum/aplication/use-cases/create-question';
import { QuestionRepos } from '@/domain/forum/aplication/respository/question-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';

import { expect, test } from 'vitest';

const fakeQuestionsRepository: QuestionRepos = {
  create: async (question: Question) => {},
}

test('create a question', async () => {

  const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestion.execute({

    authorId: '1',
    title: 'new question',
    content: 'Content',
  })

  expect(question.ID).toBeTruthy()
})