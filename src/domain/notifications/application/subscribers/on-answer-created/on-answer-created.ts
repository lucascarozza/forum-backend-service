import { DomainEvents } from "@/core/events/domain-events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";
import { AnswerCreatedEvent } from "@/domain/forum/enterprise/events/answer-created-event";
import { CreateNotificationUseCase } from "../../usecases/create-notification/create-notification";

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private createNotificationUseCase: CreateNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name
    );
  }
  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(
      answer.questionId.toString()
    );

    if (question) {
      await this.createNotificationUseCase.execute({
        recipientId: question.authorId.toString(),
        title: `Your question "${question.title
          .substring(0, 40)
          .concat("...")}" has a new answer!`,
        content: answer.excerpt,
      });
    }
  }
}
