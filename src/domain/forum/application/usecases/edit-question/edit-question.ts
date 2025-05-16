import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionsRepository } from "../../repositories/questions-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "../@errors/resource-not-found-error";
import { NotAllowedError } from "../@errors/not-allowed-error";
import { QuestionAttachmentsRepository } from "../../repositories/question-attachments-repository";
import { QuestionAttachmentList } from "@/domain/forum/enterprise/entities/question-attachment-list";
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";

interface EditQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  attachmentsIds: string[];
  title: string;
  content: string;
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>;

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) {}

  async execute({
    authorId,
    questionId,
    attachmentsIds,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (question.authorId.toString() !== authorId) {
      return left(new NotAllowedError());
    }

    const currentQuestionAttachments =
      await this.questionAttachmentsRepository.findManyByQuestionId(questionId);

    const currentQuestionAttachmentsList = new QuestionAttachmentList(
      currentQuestionAttachments
    );

    const newQuestionAttachmentsList = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      });
    });

    currentQuestionAttachmentsList.update(newQuestionAttachmentsList);

    question.title = title;
    question.content = content;
    question.attachments = currentQuestionAttachmentsList;

    await this.questionsRepository.save(question);

    return right({ question });
  }
}
