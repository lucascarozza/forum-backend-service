import { UniqueEntityId } from "@/core/entitites/value-objects/unique-entity-id";
import { makeAnswer } from "tests/factories/make-answer";
import { makeQuestion } from "tests/factories/make-question";
import { InMemoryAnswersRepository } from "tests/in-memory-repositories/in-memory-answers-repository";
import { InMemoryQuestionsRepository } from "tests/in-memory-repositories/in-memory-questions-repository";
import { ChooseBestAnswerUseCase } from "./choose-best-answer";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: ChooseBestAnswerUseCase; // System under test

describe("Choose Best Answer", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new ChooseBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    );
  });

  it("should be able to choose a best answer when the author is the owner", async () => {
    const question = makeQuestion();

    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString(),
    });

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(
      answer.id
    );
  });

  it("should not be able to choose a best answer when the author is not the owner", async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId("author-1"),
    });

    const answer = makeAnswer({
      questionId: question.id,
    });

    await inMemoryQuestionsRepository.create(question);
    await inMemoryAnswersRepository.create(answer);

    await expect(() => {
      return sut.execute({
        authorId: "author-2",
        answerId: answer.id.toString(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
