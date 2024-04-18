import { InMemoryAnswerRepos } from '@/config-tests/InMemory-Repository/answer-repos';
import { InMemoryAnswerCommentsRepos } from '@/config-tests/InMemory-Repository/answerComment-repos';

import { CommentOnAnswerUseCase } from '@/domain/forum/aplication/use-cases/comment-on-answer';

import { makeAnswer } from '@/config-tests/factories/make-answer';






let inMemoryAnswersRepository: InMemoryAnswerRepos
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepos
let sut: CommentOnAnswerUseCase

describe('Comment on Answer', () => {

  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswerRepos()
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