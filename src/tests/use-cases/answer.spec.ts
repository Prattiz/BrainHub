import { AnswerQuestionUseCase } from '@/domain/forum/aplication/use-cases/answer-question';
import { InMemoryAnswerRepos } from '@/config-tests/InMemory-Repository/answer-repos';

import { beforeEach, describe, expect, it } from 'vitest';


let inMemoryAnswerRepos: InMemoryAnswerRepos;
let sut: AnswerQuestionUseCase

describe('create a answer', async () => {

  beforeEach(() => {
    inMemoryAnswerRepos = new InMemoryAnswerRepos();
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepos)

  });


  it('should be able to create a answer', async () => {

    const answer = await sut.execute({

      instructorId: '1',
      questionId: '1',
      content: 'the answer',
    });

    expect(answer.content).toEqual('the answer')
  })
})