import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "tests/factories/make-answer";
import { InMemoryAnswersRepository } from "tests/in-memory-repositories/in-memory-answers-repository";
import { NotAllowedError } from "../@errors/not-allowed-error";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: EditAnswerUseCase; // System under test

describe("Edit Answer", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new EditAnswerUseCase(inMemoryAnswersRepository);
  });

  it("should edit an answer when the author is the owner", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("answer-1")
    );

    inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      authorId: "author-1",
      answerId: newAnswer.id.toValue(),
      content: "New Content",
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      id: newAnswer.id,
      content: "New Content",
    });
  });

  it("should not edit an answer when the author is not the owner", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("answer-2")
    );

    inMemoryAnswersRepository.create(newAnswer);

    const result = await sut.execute({
      authorId: "author-2",
      answerId: newAnswer.id.toValue(),
      content: "New Content",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
