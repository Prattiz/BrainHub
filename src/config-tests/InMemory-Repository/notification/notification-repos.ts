import { NotificationsRepos } from "@/domain/notification/application/repository/notification-repository";
import { Notification } from '@/domain/notification/enterprices/entities/notification';

export class InMemoryNotificationsRepos
  implements NotificationsRepos
{
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }
}