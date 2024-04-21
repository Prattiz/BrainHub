import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { QuestionRepos } from "@/domain/forum/application/respository/question-repository";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events/answer-created-event";
import { SendNotificationUseCase } from "../use-cases/send-notification";

export class OnAnswerCreated implements EventHandler{

    constructor( 
        private questionsRepository: QuestionRepos,
        private sendNotification: SendNotificationUseCase
    ){ 
        this.setupSubscriptions()
    }

    private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent){
        const question = await this.questionsRepository.findById(answer.authorId.toString());

        if(question){
            this.sendNotification.execute({
                
                recipientId: question.authorId.toString(),
                title: `New answer in ${question.title.substring(0, 40).concat('...')}`,
                content: question.except

            })
        }
    }

    setupSubscriptions(): void {
        DomainEvents.register(this.sendNewAnswerNotification.bind(this), AnswerCreatedEvent.name)
    }

}