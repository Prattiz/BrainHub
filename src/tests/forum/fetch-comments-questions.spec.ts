import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepos } from '@/config-tests/InMemory-Repository/forum/questionComment-repos'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-comments-questions'
import { makeQuestionComment } from '@/config-tests/factories/make-comment-question'




let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepos
let sut: FetchQuestionCommentsUseCase

describe('Fetch Question Comments', () => {

  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepos()
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  });


  it('should be able to fetch paginated question comments', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  });

})