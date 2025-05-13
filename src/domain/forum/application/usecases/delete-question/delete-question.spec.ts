import { UniqueEntityId } from "@/core/entitites/value-objects/unique-entity-id";
import { DeleteQuestionUseCase } from "./delete-question";
import { makeQuestion } from "tests/factories/make-question";
import { InMemoryQuestionsRepository } from "tests/in-memory-repositories/in-memory-questions-repository";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: DeleteQuestionUseCase; // System under test

describe("Delete Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should delete a question when the author is the owner", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-1")
    );

    inMemoryQuestionsRepository.create(newQuestion);

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

    await expect(() => {
      return sut.execute({
        authorId: "author-2",
        questionId: "question-2",
      });
    }).rejects.toThrow("Not allowed.");

    expect(inMemoryQuestionsRepository.items).toHaveLength(1);
  });
});
