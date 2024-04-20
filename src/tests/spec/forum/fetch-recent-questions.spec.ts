import { InMemoryQuestionAttachmentsRepos } from '@/tests/config-tests/InMemory-Repository/forum/question-attachment-repos';
import { InMemoryQuestionRepos } from '@/tests/config-tests/InMemory-Repository/forum/question-repos';
import { makeQuestion } from '@/tests/config-tests/factories/forum/make-question';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/fetch-recent-question';




let inMemoryQuestionRepository: InMemoryQuestionRepos
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepos

let sut: FetchRecentQuestionsUseCase

describe('Fetch Recent Questions', () => {

  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepos()
    inMemoryQuestionRepository = new InMemoryQuestionRepos( inMemoryQuestionAttachmentsRepository )

    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  });

  it('should be able to fetch recent questions', async () => {

    await inMemoryQuestionRepository.create( makeQuestion({ createdAt: new Date(2022, 0, 20) }))
    
    await inMemoryQuestionRepository.create( makeQuestion({ createdAt: new Date(2022, 0, 18) }))

    await inMemoryQuestionRepository.create( makeQuestion({ createdAt: new Date(2022, 0, 23) }))


    const result = await sut.execute({ page: 1 })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])

  });


  it('should be able to fetch paginated recent questions', async () => {

    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  });

})

export { FetchRecentQuestionsUseCase };
