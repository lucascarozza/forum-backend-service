import { AnswersRepository } from "../../repositories/answers-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionsRepository } from "../../repositories/questions-repository";

interface ChooseBestAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface ChooseBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository
  ) {}

  async execute({
    authorId,
    answerId,
  }: ChooseBestAnswerUseCaseRequest): Promise<ChooseBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );

    if (!question) {
      throw new Error("Question not found.");
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error("Only the question author can choose the best answer.");
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return { question };
  }
}
