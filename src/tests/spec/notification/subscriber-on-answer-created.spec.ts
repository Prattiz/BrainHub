import { SpyInstance } from 'vitest';

import { waitFor } from '@/tests/config-tests/utils/wait-for';

import { OnAnswerCreated } from '@/domain/notification/application/subscriber/on-answer-created';

import 
{ 
    SendNotificationUseCase, 
    SendNotificationUseCaseRequest, 
    SendNotificationUseCaseResponse 
}
from '@/domain/notification/application/use-cases/send-notification';

import { makeAnswer } from '@/tests/config-tests/factories/forum/make-answer';
import { makeQuestion } from '@/tests/config-tests/factories/forum/make-question';

import { InMemoryAnswerAttachmentsRepos } from '@/tests/config-tests/InMemory-Repository/forum/answer-attachment-repos';
import { InMemoryAnswerRepos } from '@/tests/config-tests/InMemory-Repository/forum/answer-repos';
import { InMemoryQuestionAttachmentsRepos } from '@/tests/config-tests/InMemory-Repository/forum/question-attachment-repos';
import { InMemoryQuestionRepos } from '@/tests/config-tests/InMemory-Repository/forum/question-repos';
import { InMemoryNotificationsRepos } from '@/tests/config-tests/InMemory-Repository/notification/send-notification-repos';


let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepos
let inMemoryQuestionsRepository: InMemoryQuestionRepos
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepos
let inMemoryAnswersRepository: InMemoryAnswerRepos
let inMemoryNotificationsRepository: InMemoryNotificationsRepos
let sendNotificationUseCase: SendNotificationUseCase

// in index.d.ts of SpyInstance: trade the name of the interface SpyInstance to MockInstance to fix the error -->

let sendNotificationExecuteSpy: SpyInstance< [SendNotificationUseCaseRequest], Promise<SendNotificationUseCaseResponse> >


describe('On Answer Created', () => {

  beforeEach(() => {

    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepos()
    inMemoryQuestionsRepository = new InMemoryQuestionRepos( inMemoryQuestionAttachmentsRepository ) 

    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepos()
    inMemoryAnswersRepository = new InMemoryAnswerRepos( inMemoryAnswerAttachmentsRepository )

    inMemoryNotificationsRepository = new InMemoryNotificationsRepos()
    sendNotificationUseCase = new SendNotificationUseCase( inMemoryNotificationsRepository )


    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  });


  it('should send a notification when an answer is created', async () => {

    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.ID });

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)
    console.log(sendNotificationExecuteSpy)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  });
  
})  