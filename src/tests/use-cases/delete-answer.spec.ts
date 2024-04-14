import { DeleteAnswerUseCase } from '@/domain/forum/aplication/use-cases/delete-answer'
import { InMemoryAnswerRepos } from '@/config-tests/InMemory-Repository/answer-repos'
import { makeAnswer } from '@/config-tests/factories/make-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

import { beforeEach, describe, expect, it } from 'vitest';


let inMemoryAnswersRepository: InMemoryAnswerRepos
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepos()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  });

  it('should be able to delete a answer', async () => {

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({

      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)

  });


  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        answerId: 'answer-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)

  });

})