import { CreateQuestionUseCase } from '@/domain/forum/aplication/use-cases/create-question';
import { InMemoryQuestionRepos } from '@/config-tests/InMemory-Repository/question-repos';


import { UniqueEntityID } from '@/core/entities/unique-entity-id';


let inMemoryQuestionRepos: InMemoryQuestionRepos;
let sut: CreateQuestionUseCase

describe('create a question', async () => {

  beforeEach(() => {
    inMemoryQuestionRepos = new InMemoryQuestionRepos();
    sut = new CreateQuestionUseCase(inMemoryQuestionRepos)

  });


  it('should be able to create a question', async () => {

    const result = await sut.execute({

      authorId: '1',
      title: 'new question',
      content: 'Content',
      attachmentIds: ['1', '2'],
    });

    console.log(inMemoryQuestionRepos.items[0])

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionRepos.items[0]).toEqual(result.value?.question) 

    expect( inMemoryQuestionRepos.items[0].attachment.currentItems ).toHaveLength(2)

    expect( inMemoryQuestionRepos.items[0].attachment.currentItems ).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') }),
    ])

  });

})