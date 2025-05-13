import { InMemoryQuestionsRepository } from "tests/in-memory-repositories/in-memory-questions-repository";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "tests/factories/make-question";
import { Slug } from "@/domain/forum/enterprise/entities/value-objects/slug/slug";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionBySlugUseCase; // System under test

describe("Get Question By Slug", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository);
  });

  it("should be able to find a question by its slug", async () => {
    const newQuestion = makeQuestion({ slug: Slug.create("nova-pergunta") });

    inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      slug: "nova-pergunta",
    });

    expect(question.id).toBeTruthy();
    expect(question.title).toEqual(newQuestion.title);
  });
});
