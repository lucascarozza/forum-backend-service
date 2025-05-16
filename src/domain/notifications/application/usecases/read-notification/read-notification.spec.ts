import { InMemoryNotificationsRepository } from "tests/in-memory-repositories/in-memory-notifications-repository";
import { ReadNotificationUseCase } from "./read-notification";
import { makeNotification } from "tests/factories/make-notification";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import { NotAllowedError } from "@/core/errors/not-allowed-error";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: ReadNotificationUseCase; // System under test

describe("Read Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("should be able to read a notification", async () => {
    const notification = makeNotification();

    await inMemoryNotificationsRepository.create(notification);

    const result = await sut.execute({
      recipientId: notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items).toHaveLength(1);
    expect(inMemoryNotificationsRepository.items[0].readAt).toEqual(
      expect.any(Date)
    );
  });

  it("should not read a notification if recipient ID does not match", async () => {
    const newNotification = makeNotification(
      { recipientId: new UniqueEntityId("recipient-1") },
      new UniqueEntityId("notification-2")
    );

    inMemoryNotificationsRepository.create(newNotification);

    const result = await sut.execute({
      recipientId: "recipient-2",
      notificationId: "notification-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
