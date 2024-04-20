import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { InMemoryAnswerRepos } from '@/tests/config-tests/InMemory-Repository/forum/answer-repos';
import { InMemoryAnswerAttachmentsRepos } from '@/tests/config-tests/InMemory-Repository/forum/answer-attachment-repos';


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