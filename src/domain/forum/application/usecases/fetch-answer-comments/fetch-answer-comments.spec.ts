import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import { makeAnswerComment } from "tests/factories/make-answer-comment";
import { InMemoryAnswerCommentsRepository } from "tests/in-memory-repositories/in-memory-answer-comments-repository";
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase; // System under test

describe("Fetch Answer Comments by Answer ID", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should list answer comments by answer id", async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId("answer-1") })
    );
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId("answer-1") })
    );
    // Should be ignored.
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId("answer-2") })
    );

    const result = await sut.execute({
      answerId: "answer-1",
      page: 1,
    });

    expect(result.value?.answerComments).toHaveLength(2);
  });

  it("should paginate answer comments correctly", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId("answer-1") })
      );
    }
    // Should be ignored.
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId("answer-2") })
    );

    const result = await sut.execute({
      answerId: "answer-1",
      page: 2,
    });

    expect(result.value?.answerComments).toHaveLength(2);
  });
});
