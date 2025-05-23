import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { makeAnswer } from "tests/factories/make-answer";
import { InMemoryAnswerAttachmentsRepository } from "tests/in-memory-repositories/in-memory-answer-attachments-repository";
import { InMemoryAnswerCommentsRepository } from "tests/in-memory-repositories/in-memory-answer-comments-repository";
import { InMemoryAnswersRepository } from "tests/in-memory-repositories/in-memory-answers-repository";

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase; // System under test

describe("Comment on Answer", () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository
    );
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository
    );
  });

  it("should be able to comment on a answer", async () => {
    const answer = makeAnswer();

    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: "I'm a comment!",
    });

    expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(
      "I'm a comment!"
    );
  });
});
