import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/create-question';
import { InMemoryQuestionRepos } from '@/config-tests/InMemory-Repository/forum/question-repos';


import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { InMemoryQuestionAttachmentsRepos } from '@/config-tests/InMemory-Repository/forum/question-attachment-repos';


let inMemoryQuestionRepository: InMemoryQuestionRepos
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepos

let sut: CreateQuestionUseCase

describe('create a question', async () => {

  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepos()
    inMemoryQuestionRepository = new InMemoryQuestionRepos( inMemoryQuestionAttachmentsRepository )
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)

  });


  it('should be able to create a question', async () => {

    const result = await sut.execute({

      authorId: '1',
      title: 'new question',
      content: 'Content',
      attachmentIds: ['1', '2'],
    });

   

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepository.items[0]).toEqual(result.value?.question) 

    expect( inMemoryQuestionRepository.items[0].attachment.currentItems ).toHaveLength(2)

    expect( inMemoryQuestionRepository.items[0].attachment.currentItems ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])

  });

})