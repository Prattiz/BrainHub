import { OnQuestionBestAnswerChosen } from "@/domain/notification/application/subscriber/on-question-best-answer-chosen";

import 
{ 
    SendNotificationUseCase, 
    SendNotificationUseCaseRequest, 
    SendNotificationUseCaseResponse 
} 
from "@/domain/notification/application/use-cases/send-notification";

import { InMemoryAnswerAttachmentsRepos } from "@/tests/config-tests/InMemory-Repository/forum/answer-attachment-repos";
import { InMemoryAnswerRepos } from "@/tests/config-tests/InMemory-Repository/forum/answer-repos";
import { InMemoryQuestionAttachmentsRepos } from "@/tests/config-tests/InMemory-Repository/forum/question-attachment-repos";
import { InMemoryQuestionRepos } from "@/tests/config-tests/InMemory-Repository/forum/question-repos";
import { InMemoryNotificationsRepos } from "@/tests/config-tests/InMemory-Repository/notification/send-notification-repos";

import { makeAnswer } from "@/tests/config-tests/factories/forum/make-answer";
import { makeQuestion } from "@/tests/config-tests/factories/forum/make-question";

import { waitFor } from "@/tests/config-tests/utils/wait-for";

import { SpyInstance } from "vitest";


let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepos
let inMemoryQuestionsRepository: InMemoryQuestionRepos
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepos
let inMemoryAnswersRepository: InMemoryAnswerRepos
let inMemoryNotificationsRepository: InMemoryNotificationsRepos
let sendNotificationUseCase: SendNotificationUseCase



// in index.d.ts of SpyInstance: trade the name of the interface SpyInstance to MockInstance to fix the error -->
let sendNotificationExecuteSpy: SpyInstance< [SendNotificationUseCaseRequest], Promise<SendNotificationUseCaseResponse> >

describe('On Question Best Answer Chosen', () => {

  beforeEach(() => {
    
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepos()
    inMemoryQuestionsRepository = new InMemoryQuestionRepos(inMemoryQuestionAttachmentsRepository )
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepos()
    inMemoryAnswersRepository = new InMemoryAnswerRepos( inMemoryAnswerAttachmentsRepository )
    inMemoryNotificationsRepository = new InMemoryNotificationsRepos()


    sendNotificationUseCase = new SendNotificationUseCase(inMemoryNotificationsRepository)

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnQuestionBestAnswerChosen(
      inMemoryAnswersRepository,
      sendNotificationUseCase,
    )
  });

  it('should send a notification when topic has new best answer chosen', async () => {

    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.ID })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.ID

    inMemoryQuestionsRepository.save(question)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })

  });

})