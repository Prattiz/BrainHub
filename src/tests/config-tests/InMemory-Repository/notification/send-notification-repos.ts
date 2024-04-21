import { NotificationsRepos } from "@/domain/notification/application/repository/notification-repository";
import { Notification } from '@/domain/notification/enterprices/entities/notification';

export class InMemoryNotificationsRepos implements NotificationsRepos{
  
  public items: Notification[] = []

  async findById(id: string) {

    const notification = this.items.find((item) => item.ID.toString() === id)

    if (!notification) {
      return null
    }

    return notification
  }

  async save(notification: Notification) {

      const itemIndex = this.items.findIndex(
        (item) => item.ID === notification.ID
      )

    this.items[itemIndex] = notification
  }
  

  async create(notification: Notification) {
    this.items.push(notification)
  }
}