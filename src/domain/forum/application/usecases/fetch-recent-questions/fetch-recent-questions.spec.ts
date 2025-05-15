import { InMemoryQuestionsRepository } from "tests/in-memory-repositories/in-memory-questions-repository";
import { makeQuestion } from "tests/factories/make-question";
import { FetchRecentQuestionsUseCase } from "./fetch-recent-questions";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase; // System under test

describe("Fetch Recent Questions", () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it("should list recent questions", async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 20) })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 18) })
    );
    await inMemoryQuestionsRepository.create(
      makeQuestion({ createdAt: new Date(2025, 0, 23) })
    );

    const { questions } = await sut.execute({ page: 1 });

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 18) }),
    ]);
  });

  it("should paginate questions correctly", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestion());
    }

    const { questions } = await sut.execute({ page: 2 });

    expect(questions).toHaveLength(2);
  });
});
