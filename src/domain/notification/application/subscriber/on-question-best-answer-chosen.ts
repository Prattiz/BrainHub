import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";

import { AnswerRepos } from "@/domain/forum/application/respository/answer-repository";
import { SendNotificationUseCase } from "../use-cases/send-notification";

import { QuestionBestAnswerChosenEvent } from "@/domain/forum/enterprise/events/question-best-answer-chosen.-event";


export class OnQuestionBestAnswerChosen implements EventHandler {

    constructor(
      private answersRepository: AnswerRepos,
      private sendNotification: SendNotificationUseCase
    ) {
      this.setupSubscriptions()
    }
  
    setupSubscriptions(): void {

      DomainEvents.register(

        this.sendQuestionBestAnswerNotification.bind(this),
        QuestionBestAnswerChosenEvent.name
      )
    }
  
    private async sendQuestionBestAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerChosenEvent) {
      
        const answer = await this.answersRepository.findById(
            bestAnswerId.toString(),
        )
  
        if (answer) {

            const questionTitle = question.title.substring(0, 20).concat('...');

            await this.sendNotification.execute({

                recipientId: answer.authorId.toString(),
                title: `Your answer has been chosen!!`,
                content: 
                `
                The answer you sent in "${ questionTitle }" was chosen by the author!"
                `,
            })
        }
    }
}
  