import { InMemoryNotificationsRepository } from "tests/in-memory-repositories/in-memory-notifications-repository";
import { CreateNotificationUseCase } from "./create-notification";

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let sut: CreateNotificationUseCase; // System under test

describe("Create Notification", () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    sut = new CreateNotificationUseCase(inMemoryNotificationsRepository);
  });

  it("should be able to create a notification", async () => {
    const result = await sut.execute({
      recipientId: "recipient-1",
      title: "Nova notificação",
      content: "Conteúdo da nova notificação",
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryNotificationsRepository.items).toHaveLength(1);
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification
    );
  });
});
