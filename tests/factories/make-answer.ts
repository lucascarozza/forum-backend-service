import { faker } from "@faker-js/faker";
import { UniqueEntityId } from "@/core/entitites/unique-entity-id";
import {
  Answer,
  AnswerProps,
} from "@/domain/forum/enterprise/entities/answer";

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId(),
      content: faker.lorem.paragraph(),
      ...override,
    },
    id
  );

  return answer;
}
