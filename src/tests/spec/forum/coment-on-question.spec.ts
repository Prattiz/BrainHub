import { InMemoryQuestionRepos } from '@/tests/config-tests/InMemory-Repository/forum/question-repos';
import { makeQuestion } from '@/tests/config-tests/factories/forum/make-question';
import { InMemoryQuestionCommentsRepos } from '@/tests/config-tests/InMemory-Repository/forum/questionComment-repos';
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/comment-on-question';
import { InMemoryQuestionAttachmentsRepos } from '@/tests/config-tests/InMemory-Repository/forum/question-attachment-repos';




let inMemoryQuestionRepository: InMemoryQuestionRepos
let inMemoryQuestionCommentsRepos: InMemoryQuestionCommentsRepos
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepos
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {

  beforeEach(() => {

    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepos()
    inMemoryQuestionRepository = new InMemoryQuestionRepos( inMemoryQuestionAttachmentsRepository )
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

    expect(inMemoryQuestionCommentsRepos.items[0].content).toEqual('comment test')
  });

})