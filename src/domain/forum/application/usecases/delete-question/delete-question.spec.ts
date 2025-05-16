import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import { DeleteQuestionUseCase } from "./delete-question";
import { makeQuestion } from "tests/factories/make-question";
import { InMemoryQuestionsRepository } from "tests/in-memory-repositories/in-memory-questions-repository";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { InMemoryQuestionAttachmentsRepository } from "tests/in-memory-repositories/in-memory-question-attachments-repository";
import { makeQuestionAttachment } from "tests/factories/make-question-attachment";

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase; // System under test

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository();
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository
    );
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should delete a question when the author is the owner", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-1")
    );

    inMemoryQuestionsRepository.create(newQuestion);

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId("1"),
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityId("2"),
      })
    );

    await sut.execute({
      authorId: "author-1",
      questionId: "question-1",
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it("should not delete a question when the author is not the owner", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-2")
    );

    inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      authorId: "author-2",
      questionId: "question-2",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
