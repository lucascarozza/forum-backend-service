import { UniqueEntityId } from "@/core/entitites/value-objects/unique-entity-id";
import { InMemoryAnswersRepository } from "tests/in-memory-repositories/in-memory-answers-repository";
import { DeleteAnswerUseCase } from "./delete-answer";
import { makeAnswer } from "tests/factories/make-answer";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: DeleteAnswerUseCase; // System under test

describe("Delete Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should delete an answer when the author is the owner", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("answer-1")
    );

    inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      answerId: "answer-1",
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it("should not delete an answer when the author is not the owner", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("answer-2")
    );

    inMemoryAnswersRepository.create(newAnswer);

    await expect(() => {
      return sut.execute({
        authorId: "author-2",
        answerId: "answer-2",
      });
    }).rejects.toThrow("Not allowed.");

    expect(inMemoryAnswersRepository.items).toHaveLength(1);
  });
});
