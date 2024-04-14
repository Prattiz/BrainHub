import { InMemoryQuestionCommentsRepos } from '@/config-tests/InMemory-Repository/questionComment-repos';

import { DeleteQuestionCommentUseCase } from '@/domain/forum/aplication/use-cases/delete-comment-question';

import { makeQuestionComment } from '@/config-tests/factories/make-comment-question';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';


import { beforeEach, describe, expect, it } from 'vitest';


let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepos
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {

  beforeEach(() => {
    
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepos()

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  });


  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.ID.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1'),
    })

    await inMemoryQuestionCommentsRepository.create(questionComment)

    expect(() => {
      return sut.execute({
        questionCommentId: questionComment.ID.toString(),
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})