import { Entity } from "@/core/entitites/entity";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";

interface AnswerAttachmentProps {
  attachmentId: UniqueEntityId;
  answerId: UniqueEntityId;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get attachmentId() {
    return this.props.attachmentId;
  }

  get answerId() {
    return this.props.answerId;
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntityId) {
    const attachment = new AnswerAttachment(props, id);

    return attachment;
  }
}
