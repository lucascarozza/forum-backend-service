import { DomainEvents } from "@/core/events/domain-events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { CreateNotificationUseCase } from "../../usecases/create-notification/create-notification";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { MarkedBestAnswerEvent } from "@/domain/forum/enterprise/events/marked-best-answer";

export class OnMarkedBestAnswer implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private createNotificationUseCase: CreateNotificationUseCase
  ) {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendMarkedBestAnswerNotification.bind(this),
      MarkedBestAnswerEvent.name
    );
  }
  private async sendMarkedBestAnswerNotification({
    question,
    bestAnswerId,
  }: MarkedBestAnswerEvent) {
    const answer = await this.answersRepository.findById(
      bestAnswerId.toString()
    );

    if (answer) {
      await this.createNotificationUseCase.execute({
        recipientId: answer.authorId.toString(),
        title: "Congratulations! Your answer was marked as the best!",
        content: `Your answer to the question "${question.title
          .substring(0, 20)
          .concat("...")}" has been selected as the best answer. Great job!`,
      });
    }
  }
}
