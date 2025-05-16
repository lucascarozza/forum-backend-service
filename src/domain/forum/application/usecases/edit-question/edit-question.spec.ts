import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import { EditQuestionUseCase } from "./edit-question";
import { makeQuestion } from "tests/factories/make-question";
import { InMemoryQuestionsRepository } from "tests/in-memory-repositories/in-memory-questions-repository";
import { NotAllowedError } from "../@errors/not-allowed-error";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: EditQuestionUseCase; // System under test

describe("Edit Question", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository);
  });

  it("should edit a question when the author is the owner", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-1")
    );

    inMemoryQuestionsRepository.create(newQuestion);

    await sut.execute({
      authorId: "author-1",
      questionId: newQuestion.id.toValue(),
      title: "New Title",
      content: "New Content",
    });

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      id: newQuestion.id,
      title: "New Title",
      content: "New Content",
    });
  });

  it("should not edit a question when the author is not the owner", async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId("author-1") },
      new UniqueEntityId("question-2")
    );

    inMemoryQuestionsRepository.create(newQuestion);

    const result = await sut.execute({
      authorId: "author-2",
      questionId: newQuestion.id.toValue(),
      title: "New Title",
      content: "New Content",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
