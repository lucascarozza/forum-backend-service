import { UniqueEntityId } from "@/core/entitites/value-objects/unique-entity-id";
import { InMemoryQuestionCommentsRepository } from "tests/in-memory-repositories/in-memory-question-comments-repository";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments";
import { makeQuestionComment } from "tests/factories/make-question-comment";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase; // System under test

describe("Fetch Question Comments by Question ID", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should list question comments by question id", async () => {
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("question-1") })
    );
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("question-1") })
    );
    // Should be ignored.
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("question-2") })
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 1,
    });

    expect(result.value?.questionComments).toHaveLength(2);
  });

  it("should paginate question comments correctly", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId("question-1") })
      );
    }
    // Should be ignored.
    await inMemoryQuestionCommentsRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId("question-2") })
    );

    const result = await sut.execute({
      questionId: "question-1",
      page: 2,
    });

    expect(result.value?.questionComments).toHaveLength(2);
  });
});
