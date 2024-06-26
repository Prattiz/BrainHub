import { InMemoryQuestionRepos } from '@/tests/config-tests/InMemory-Repository/forum/question-repos';
import { InMemoryAnswerAttachmentsRepos } from '@/tests/config-tests/InMemory-Repository/forum/answer-attachment-repos';
import { InMemoryQuestionAttachmentsRepos } from '@/tests/config-tests/InMemory-Repository/forum/question-attachment-repos';
import { InMemoryAnswerRepos } from '@/tests/config-tests/InMemory-Repository/forum/answer-repos';

import { makeAnswer } from '@/tests/config-tests/factories/forum/make-answer';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { ChooseBestAnswerUseCase } from '@/domain/forum/application/use-cases/choose-best-answer';

import { makeQuestion } from '@/tests/config-tests/factories/forum/make-question';

import { NotAllowedError } from '@/core/errors/not-allowed-error';


let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepos
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepos
let inMemoryQuestionsRepository: InMemoryQuestionRepos
let inMemoryAnswersRepository: InMemoryAnswerRepos
let sut: ChooseBestAnswerUseCase

describe('Choose Question Best Answer', () => {
    
  beforeEach(() => {
    
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepos()
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepos()
    
    inMemoryQuestionsRepository = new InMemoryQuestionRepos( inMemoryQuestionAttachmentsRepository )
    inMemoryAnswersRepository = new InMemoryAnswerRepos( inMemoryAnswerAttachmentsRepository )

    sut = new ChooseBestAnswerUseCase( inMemoryAnswersRepository, inMemoryQuestionsRepository )
  });


  it('should be able to choose the question best answer', async () => {

    const question = makeQuestion();

    const answer = makeAnswer({
      questionId: question.ID,
    });

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.ID.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.ID)

  });

  it('should not be able to to choose another user question best answer', async () => {

    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
    });

    const answer = makeAnswer({
      questionId: question.ID,
    });

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)
    
    const result = await sut.execute({
      answerId: answer.ID.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  });

})