import { CreateQuestionUseCase } from '@/domain/forum/aplication/use-cases/create-question';
import { InMemoryQuestionRepos } from '@/config-tests/InMemory-Repository/question-repos';

import { beforeEach, describe, expect, it } from 'vitest';


let inMemoryQuestionRepos: InMemoryQuestionRepos;
let sut: CreateQuestionUseCase

describe('create a question', async () => {

  beforeEach(() => {
    inMemoryQuestionRepos = new InMemoryQuestionRepos();
    sut = new CreateQuestionUseCase(inMemoryQuestionRepos)

  });


  it('should be able to create a question', async () => {

    const { question } = await sut.execute({

      authorId: '1',
      title: 'new question',
      content: 'Content',
    });

    expect(question.ID).toBeTruthy()
  })
})