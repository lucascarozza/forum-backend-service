import { UniqueEntityId } from "../entitites/unique-entity-id";

export interface DomainEvent {
  ocurredAt: Date;
  getAggregateId(): UniqueEntityId;
}
