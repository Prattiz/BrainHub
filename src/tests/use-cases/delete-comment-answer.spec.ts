import { InMemoryAnswerCommentsRepos } from '@/config-tests/InMemory-Repository/answerComment-repos';

import { DeleteAnswerCommentUseCase } from '@/domain/forum/aplication/use-cases/delete-comment-answer';

import { makeAnswerComment } from '@/config-tests/factories/make-comment-answer';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';


import { beforeEach, describe, expect, it } from 'vitest';


let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepos
let sut: DeleteAnswerCommentUseCase

describe('Delete Answer Comment', () => {

  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepos()

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  });


  it('should be able to delete a answer comment', async () => {

    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.ID.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  });

  it('should not be able to delete another user answer comment', async () => {

    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityID('author-1'),
    });

    await inMemoryAnswerCommentsRepository.create(answerComment)

    expect(() => {
      return sut.execute({
        answerCommentId: answerComment.ID.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  });

})