import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import { DomainEvent } from "@/core/events/domain-event";
import { Question } from "../entities/question";

export class MarkedBestAnswerEvent implements DomainEvent {
  public ocurredAt: Date;
  public question: Question;
  public bestAnswerId: UniqueEntityId;

  constructor(question: Question, bestAnswerId: UniqueEntityId) {
    this.ocurredAt = new Date();
    this.question = question;
    this.bestAnswerId = bestAnswerId;
  }

  getAggregateId(): UniqueEntityId {
    return this.question.id;
  }
}
