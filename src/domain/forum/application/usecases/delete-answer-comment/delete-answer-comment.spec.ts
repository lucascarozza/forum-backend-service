import { UniqueEntityId } from "@/core/entitites/value-objects/unique-entity-id";
import { makeAnswerComment } from "tests/factories/make-answer-comment";
import { InMemoryAnswerCommentsRepository } from "tests/in-memory-repositories/in-memory-answer-comments-repository";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: DeleteAnswerCommentUseCase; // System under test

describe("Delete Comment on an Answer", () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository);
  });

  it("should delete own comment on an answer", async () => {
    const answerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(answerComment);

    await sut.execute({
      authorId: answerComment.authorId.toString(),
      answerCommentId: answerComment.id.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  });

  it("should not delete another user's comment on an answer", async () => {
      const answerComment = makeAnswerComment({
        authorId: new UniqueEntityId("author-1"),
      });
  
      await inMemoryAnswerCommentsRepository.create(answerComment);
  
      await expect(() => {
        return sut.execute({
          authorId: "author-2",
          answerCommentId: answerComment.id.toString(),
        });
      }).rejects.toBeInstanceOf(Error);
    });
});
