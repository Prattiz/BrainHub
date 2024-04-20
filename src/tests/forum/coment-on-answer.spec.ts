import { InMemoryAnswerRepos } from '@/config-tests/InMemory-Repository/forum/answer-repos';
import { InMemoryAnswerCommentsRepos } from '@/config-tests/InMemory-Repository/forum/answerComment-repos';

import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/comment-on-answer';

import { makeAnswer } from '@/config-tests/factories/forum/make-answer';
import { InMemoryAnswerAttachmentsRepos } from '@/config-tests/InMemory-Repository/forum/answer-attachment-repos';






let inMemoryAnswersRepository: InMemoryAnswerRepos
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepos
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepos

let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {

  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepos()
    inMemoryAnswersRepository = new InMemoryAnswerRepos(inMemoryAnswerAttachmentsRepository)
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepos()

    sut = new CommentOnAnswerUseCase( inMemoryAnswersRepository, inMemoryAnswerCommentsRepository)
  });


  it('should be able to comment on answer', async () => {

    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.ID.toString(),
      authorId: answer.authorId.toString(),
      content: 'comment test',
    })

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual('comment test')

  });

})