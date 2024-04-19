import { Notification } from "../../enterprices/entities/notification";

export interface NotificationsRepos {
  create(notification: Notification): Promise<void>
}