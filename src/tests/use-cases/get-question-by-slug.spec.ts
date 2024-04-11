import { InMemoryQuestionRepos } from '@/config-tests/InMemory-Repository/question-repos';
import { UniqueEntityID } from '@/core/entities/unique-entitie-id';
import { GetQuestionBySlugUseCase } from '@/domain/forum/aplication/use-cases/get-question-by-slug';
import { Question } from '@/domain/forum/enterprise/entities/question';
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

    const newQuestion = Question.create({
        
        title: 'Example Question',
        slug: Slug.create('example-question'),
        authorId: new UniqueEntityID(),
        content: 'example-question'
    })

    await inMemoryQuestionRepos.create(newQuestion);

    const { question } = await sut.execute({

      slug: 'example-question'
    });

    expect(question.ID).toBeTruthy()
  })
})