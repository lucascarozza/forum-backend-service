import { Entity } from "@/core/entitites/entity";
import { UniqueEntityId } from "@/core/entitites/value-objects/unique-entity-id";

interface TutorProps {
  name: string;
}

export class Tutor extends Entity<TutorProps> {
  get name() {
    return this.props.name;
  }

  static create(props: TutorProps, id?: UniqueEntityId) {
    const tutor = new Tutor(props, id);

    return tutor;
  }
}
