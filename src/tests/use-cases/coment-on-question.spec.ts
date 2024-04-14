import { InMemoryQuestionRepos } from '@/config-tests/InMemory-Repository/question-repos';
import { makeQuestion } from '@/config-tests/factories/make-question';
import { InMemoryQuestionCommentsRepos } from '@/config-tests/InMemory-Repository/questionComment-repos';
import { CommentOnQuestionUseCase } from '@/domain/forum/aplication/use-cases/comment-on-question';

import { beforeEach, describe, expect, it } from 'vitest';


let inMemoryQuestionRepository: InMemoryQuestionRepos
let inMemoryQuestionCommentsRepos: InMemoryQuestionCommentsRepos
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {

  beforeEach(() => {
   inMemoryQuestionRepository = new InMemoryQuestionRepos()
   inMemoryQuestionCommentsRepos = new InMemoryQuestionCommentsRepos()

   sut = new CommentOnQuestionUseCase(inMemoryQuestionRepository, inMemoryQuestionCommentsRepos)
  });

  it('should be able to comment on question', async () => {

    const question = makeQuestion();

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      questionId: question.ID.toString(),
      authorId: question.authorId.toString(),
      content: 'comment test',
    })

    expect(inMemoryQuestionCommentsRepos.items[0].content).toEqual(
      'comment test',
    )
  });

})