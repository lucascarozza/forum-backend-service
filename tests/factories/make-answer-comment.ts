import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import {
  AnswerComment,
  AnswerCommentProps,
} from "@/domain/forum/enterprise/entities/answer-comment";

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId
) {
  const answercomment = AnswerComment.create(
    {
      authorId: new UniqueEntityId(),
      answerId: new UniqueEntityId(),
      content: faker.lorem.paragraph(),
      ...override,
    },
    id
  );

  return answercomment;
}
