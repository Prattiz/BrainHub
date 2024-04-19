import { InMemoryNotificationsRepos } from "@/config-tests/InMemory-Repository/notification/notification-repos"
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification"

let inMemoryNotificationsRepository: InMemoryNotificationsRepos
let sut: SendNotificationUseCase

describe('Send Notification', () => {

  beforeEach(() => {

    inMemoryNotificationsRepository = new InMemoryNotificationsRepos()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  });

  it('should be able to send a notification', async () => {

    const result = await sut.execute({
      recipientId: '1',
      title: 'new notification',
      content: 'notification content',
    })

    expect(result.isRight()).toBe(true)

    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})