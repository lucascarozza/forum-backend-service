import { Slug } from "./slug";

// slug test
it("should create a slug from the given text", () => {
  const slug = Slug.createFromText("Example question title");

  expect(slug.value).toEqual("example-question-title");
});
