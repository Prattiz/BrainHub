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

    const result = await sut.execute({

      authorId: '1',
      title: 'new question',
      content: 'Content',
    });

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepos.items[0]).toEqual(result.value?.question)
  })
})