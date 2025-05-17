import { makeAnswer } from "tests/factories/make-answer";
import { makeQuestion } from "tests/factories/make-question";
import { InMemoryAnswerAttachmentsRepository } from "tests/in-memory-repositories/in-memory-answer-attachments-repository";
import { InMemoryAnswersRepository } from "tests/in-memory-repositories/in-memory-answers-repository";
import { InMemoryNotificationsRepository } from "tests/in-memory-repositories/in-memory-notifications-repository";
import { InMemoryQuestionAttachmentsRepository } from "tests/in-memory-repositories/in-memory-question-attachments-repository";
import { InMemoryQuestionsRepository } from "tests/in-memory-repositories/in-memory-questions-repository";
import { MockInstance } from "vitest";
import { CreateNotificationUseCase } from "../../usecases/create-notification/create-notification";
import { OnAnswerCreated } from "./on-answer-created";
import { waitFor } from "tests/utils/wait-for";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;

let inMemoryNotificationsRepository: InMemoryNotificationsRepository;
let createNotificationUseCase: CreateNotificationUseCase;

let createNotificationSpy: MockInstance;

describe("On Answer Created", () => {
  beforeAll(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository();
    createNotificationUseCase = new CreateNotificationUseCase(
      inMemoryNotificationsRepository
    );

    createNotificationSpy = vi.spyOn(createNotificationUseCase, "execute");

    new OnAnswerCreated(inMemoryQuestionsRepository, createNotificationUseCase);
  });
  it("should notify a user when an answer is created", async () => {
    const question = makeQuestion();
    const answer = makeAnswer({ questionId: question.id });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await waitFor(() => {
      expect(createNotificationSpy).toHaveBeenCalled();
    });
  });
});
