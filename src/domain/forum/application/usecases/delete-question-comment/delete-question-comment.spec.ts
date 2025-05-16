import { UniqueEntityId } from "@/core/entitites/value-objects/unique-entity-id";
import { makeQuestionComment } from "tests/factories/make-question-comment";
import { InMemoryQuestionCommentsRepository } from "tests/in-memory-repositories/in-memory-question-comments-repository";
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { NotAllowedError } from "../@errors/not-allowed-error";

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: DeleteQuestionCommentUseCase; // System under test

describe("Delete Comment on a Question", () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository);
  });

  it("should delete own comment on a question", async () => {
    const questionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(questionComment);

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it("should not delete another user's comment on a question", async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId("author-1"),
    });

    await inMemoryQuestionCommentsRepository.create(questionComment);

    const result = await sut.execute({
      authorId: "author-2",
      questionCommentId: questionComment.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
