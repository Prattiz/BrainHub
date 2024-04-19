import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Either, right } from '@/core/utils/either';

import { Notification } from '@/domain/notification/enterprices/entities/notification';
import { NotificationsRepos } from '@/domain/notification/application/repository/notification-repository';


interface SendNotificationUseCaseRequest {

  recipientId: string
  title: string
  content: string
}


type SendNotificationUseCaseResponse = Either< null, { notification: Notification } >

export class SendNotificationUseCase {

  constructor( private notificationsRepository: NotificationsRepos ){}

  async execute({ recipientId, title, content }: SendNotificationUseCaseRequest): Promise<SendNotificationUseCaseResponse> {
    
    const notification = Notification.create({

      recipientId: new UniqueEntityID(recipientId),
      title,
      content,
    });

    await this.notificationsRepository.create(notification)

    return right({ notification })
  }
}