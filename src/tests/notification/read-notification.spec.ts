import { InMemoryNotificationsRepos } from '@/config-tests/InMemory-Repository/notification/send-notification-repos';
import { ReadNotificationUseCase } from '@/domain/notification/application/use-cases/read-notification';
import { makeNotification } from '@/config-tests/factories/notifications/make-notifications';
import { UniqueEntityID } from '@/core/entities/unique-entity-id' ;
import { NotAllowedError } from '@/core/errors/not-allowed-error' ;

let inMemoryNotificationsRepository: InMemoryNotificationsRepos
let sut: ReadNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {

    inMemoryNotificationsRepository = new InMemoryNotificationsRepos()
    sut = new ReadNotificationUseCase( inMemoryNotificationsRepository )
  })

  it('should be able to read a notification', async () => {
    const notification = makeNotification()

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.ID.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date),
    )
  })

  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityID('recipient-1'),
    })

    inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      notificationId: notification.ID.toString(),
      recipientId: 'recipient-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})