import { AnswerQuestionUseCase } from '@/domain/forum/aplication/use-cases/answer-question';
import { InMemoryAnswerRepos } from '@/config-tests/InMemory-Repository/answer-repos';
import { InMemoryAnswerAttachmentsRepos } from '@/config-tests/InMemory-Repository/answer-attachment-repos';


let inMemoryAnswersRepository: InMemoryAnswerRepos;
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepos
let sut: AnswerQuestionUseCase

describe('create a answer', async () => {

  beforeEach(() => {
    
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepos()
    inMemoryAnswersRepository = new InMemoryAnswerRepos( inMemoryAnswerAttachmentsRepository)
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)

  });


  it('should be able to create a answer', async () => {

    const answer = await sut.execute({

      instructorId: '1',
      questionId: '1',
      content: 'the answer',
      attachmentsIds: []
    });

    expect(answer.value?.answer.content).toEqual("the answer")
  })
})