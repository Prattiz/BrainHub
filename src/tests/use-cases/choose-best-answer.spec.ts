import { InMemoryQuestionRepos } from '@/config-tests/InMemory-Repository/question-repos';
import { InMemoryAnswerAttachmentsRepos } from '@/config-tests/InMemory-Repository/answer-attachment-repos';
import { InMemoryQuestionAttachmentsRepos } from '@/config-tests/InMemory-Repository/question-attachment-repos';
import { InMemoryAnswerRepos } from '@/config-tests/InMemory-Repository/answer-repos';

import { makeAnswer } from '@/config-tests/factories/make-answer';

import { UniqueEntityID } from '@/core/entities/unique-entity-id';

import { ChooseBestAnswerUseCase } from '@/domain/forum/aplication/use-cases/choose-best-answer';

import { makeQuestion } from '@/config-tests/factories/make-question';

import { NotAllowedError } from '@/domain/forum/aplication/use-cases/errors/not-allowed-error';


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