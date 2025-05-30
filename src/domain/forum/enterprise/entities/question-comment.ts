import { Comment, CommentProps } from "./comment";
import { Optional } from "@/core/@types/optional";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId() {
    return this.props.questionId;
  }

  static create(
    props: Optional<QuestionCommentProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return questionComment;
  }
}
