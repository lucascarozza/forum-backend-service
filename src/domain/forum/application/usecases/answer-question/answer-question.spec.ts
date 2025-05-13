import { InMemoryAnswersRepository } from "tests/in-memory-repositories/in-memory-answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase; // System under test

describe("Answer Question", () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it("should be able to create an answer", async () => {
    const { answer } = await sut.execute({
      questionId: "question-1",
      tutorId: "tutor-1",
      content: "Resposta",
    });

    expect(answer.content).toEqual("Resposta");
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id);
  });
});
