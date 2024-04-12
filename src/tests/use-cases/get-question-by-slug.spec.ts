import { InMemoryQuestionRepos } from '@/config-tests/InMemory-Repository/question-repos';
import { makeQuestion } from '@/config-tests/factories/make-question';
import { GetQuestionBySlugUseCase } from '@/domain/forum/aplication/use-cases/get-question-by-slug';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

import { beforeEach, describe, expect, it } from 'vitest';


let inMemoryQuestionRepos: InMemoryQuestionRepos;
let sut: GetQuestionBySlugUseCase

describe('get question by slug', async () => {

  beforeEach(() => {

    inMemoryQuestionRepos = new InMemoryQuestionRepos();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepos)
  });


  it('should be able to get question', async () => {

    const newQuestion = makeQuestion({ slug: Slug.create('example-question') })

    await inMemoryQuestionRepos.create(newQuestion);

    const { question } = await sut.execute({

      slug: 'example-question'
    });

    expect(question.ID).toBeTruthy()
  })
})