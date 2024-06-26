import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/delete-question'
import { InMemoryQuestionRepos } from '@/tests/config-tests/InMemory-Repository/forum/question-repos'
import { makeQuestion } from '@/tests/config-tests/factories/forum/make-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'


import { NotAllowedError } from '@/core/errors/not-allowed-error';
import { InMemoryQuestionAttachmentsRepos } from '@/tests/config-tests/InMemory-Repository/forum/question-attachment-repos';
import { makeQuestionAttachment } from '@/tests/config-tests/factories/forum/make-question-attachment';


let inMemoryQuestionsRepository: InMemoryQuestionRepos
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepos
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {

  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepos()

    inMemoryQuestionsRepository = new InMemoryQuestionRepos(inMemoryQuestionAttachmentsRepository)
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  });

  it('should be able to delete a question', async () => {

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.ID,
        attachmentId: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.ID,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({

      questionId: 'question-1',
      authorId: 'author-1',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0)
  });


  it('should not be able to delete a question from another user', async () => {
    
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  });

})