import { UniqueEntityId } from "@/core/entitites/value-objects/unique-entity-id";
import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswersRepository } from "../../repositories/answers-repository";

interface AnswerQuestionUseCaseRequest {
  tutorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    tutorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest) {
    const answer = Answer.create({
      authorId: new UniqueEntityId(tutorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.answersRepository.create(answer);

    return answer;
  }
}
