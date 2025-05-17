import { AggregateRoot } from "@/core/entitites/aggregate-root";
import { DomainEvent } from "../domain-event";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import { DomainEvents } from "./domain-events";

// For testing purposes.
class CreatedAggregate implements DomainEvent {
  public ocurredAt: Date;
  private aggregate: Aggregate;

  constructor(aggregate: Aggregate) {
    this.ocurredAt = new Date();
    this.aggregate = aggregate;
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id;
  }
}

// For testing purposes.
class Aggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new Aggregate(null);

    aggregate.addDomainEvent(new CreatedAggregate(aggregate));

    return aggregate;
  }
}

describe("Domain Events", () => {
  it("should dispatch and listen to events", () => {
    // Create spy
    const callbackSpy = vi.fn();

    // Create subscriber and listen to the event.
    DomainEvents.register(callbackSpy, CreatedAggregate.name);

    // Create response without saving it to database.
    const aggregate = Aggregate.create();

    // Make sure the event was created but no dispatched.
    expect(aggregate.domainEvents).toHaveLength(1);

    // Save response to database and dispatch event.
    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    // Subscriber listens to event and handles it correctly.
    expect(callbackSpy).toHaveBeenCalled();
    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
