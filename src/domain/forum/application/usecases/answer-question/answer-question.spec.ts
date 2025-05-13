import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswersRepository } from "../../repositories/answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";


const mockRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  },
};

it("should be able to create an answer", async () => {
  const answerQuestion = new AnswerQuestionUseCase(mockRepository);

  const answer = await answerQuestion.execute({
    questionId: "question-1",
    tutorId: "tutor-1",
    content: "Resposta",
  });

  expect(answer.content).toEqual("Resposta");
});
