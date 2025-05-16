import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionsRepository } from "../../repositories/questions-repository";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import { Either, right } from "@/core/either";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsId: string[];
}

type CreateQuestionUseCaseResponse = Either<null, { question: Question }>;

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsId,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    const questionAttachments = attachmentsId.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      });
    });

    question.attachments = questionAttachments;

    await this.questionsRepository.create(question);

    return right({ question });
  }
}
