import { InMemoryQuestionAttachmentsRepos } from '@/config-tests/InMemory-Repository/forum/question-attachment-repos';
import { InMemoryQuestionRepos } from '@/config-tests/InMemory-Repository/forum/question-repos';
import { makeQuestion } from '@/config-tests/factories/forum/make-question';
import { GetQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/get-question-by-slug';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';




let inMemoryQuestionRepository: InMemoryQuestionRepos;
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepos
let sut: GetQuestionBySlugUseCase

describe('get question by slug', async () => {

  beforeEach(() => {

    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepos()
    inMemoryQuestionRepository = new InMemoryQuestionRepos( inMemoryQuestionAttachmentsRepository )

    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  });


  it('should be able to get question', async () => {

    const newQuestion = makeQuestion({ slug: Slug.create('example-question') })

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({

      slug: 'example-question'
    });

    expect(result.isRight()).toBeTruthy()
  })
})