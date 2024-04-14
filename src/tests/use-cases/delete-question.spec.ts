import { DeleteQuestionUseCase } from '@/domain/forum/aplication/use-cases/delete-question'
import { InMemoryQuestionRepos } from '@/config-tests/InMemory-Repository/question-repos'
import { makeQuestion } from '@/config-tests/factories/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { beforeEach, describe, expect, it } from 'vitest';


let inMemoryQuestionsRepository: InMemoryQuestionRepos
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {

  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepos()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  });

  it('should be able to delete a question', async () => {

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({

      questionId: 'question-1',
      authorId: 'author-1',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)

  });


  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)

  });

})