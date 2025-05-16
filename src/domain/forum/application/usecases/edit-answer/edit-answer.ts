import { Answer } from "@/domain/forum/enterprise/entities/answer";
import { AnswersRepository } from "../../repositories/answers-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { NotAllowedError } from "@/core/errors/not-allowed-error";
import { AnswerAttachmentList } from "@/domain/forum/enterprise/entities/answer-attachment-list";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import { AnswerAttachmentsRepository } from "../../repositories/answer-attachments-repository";
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment";

interface EditAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  attachmentsIds: string[];
  content: string;
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { answer: Answer }
>;

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async execute({
    authorId,
    answerId,
    attachmentsIds,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    if (answer.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId);

    const currentAnswerAttachmentsList = new AnswerAttachmentList(
      currentAnswerAttachments
    );

    const newAnswerAttachmentsList = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        answerId: answer.id,
      });
    });

    currentAnswerAttachmentsList.update(newAnswerAttachmentsList);

    answer.content = content;
    answer.attachments = currentAnswerAttachmentsList;

    await this.answersRepository.save(answer);

    return right({ answer });
  }
}
