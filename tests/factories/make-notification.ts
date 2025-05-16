import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import {
  Notification,
  NotificationProps,
} from "@/domain/notifications/enterprise/entities/notification";

export function makeNotification(
  override: Partial<NotificationProps> = {},
  id?: UniqueEntityId
) {
  const notification = Notification.create(
    {
      recipientId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      ...override,
    },
    id
  );

  return notification;
}
