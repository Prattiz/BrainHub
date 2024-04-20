import { Notification } from "../../enterprices/entities/notification";

export interface NotificationsRepos {

  findById(id: string): Promise<Notification | null>
  create(notification: Notification): Promise<void>
  save(notification: Notification): Promise<void>
}