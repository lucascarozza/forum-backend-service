import { Either, right } from "@/core/either";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import { Notification } from "@/domain/notifications/enterprise/entities/notification";
import { NotificationsRepository } from "../../repositories/notifications-repository";

export interface CreateNotificationUseCaseRequest {
  recipientId: string;
  title: string;
  content: string;
}

type CreateNotificationUseCaseResponse = Either<null, { notification: Notification }>;

export class CreateNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    recipientId,
    title,
    content,
  }: CreateNotificationUseCaseRequest): Promise<CreateNotificationUseCaseResponse> {
    const notification = Notification.create({
      recipientId: new UniqueEntityId(recipientId),
      title,
      content,
    });

    await this.notificationsRepository.create(notification);

    return right({ notification });
  }
}
