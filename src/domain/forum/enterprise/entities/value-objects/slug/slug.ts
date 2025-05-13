export class Slug {
  public value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(slug: string) {
    return new Slug(slug);
  }

  /*
   * Creates a slug from the given text by replacing spaces with hyphens,
   * converting to lowercase, removing special characters, and trimming it.
   * Example: "Hello World!" -> "hello-world"
   *
   * @param text {string}
   */
  static createFromText(text: string) {
    const slugText = text
      .normalize("NFKD")
      .toLocaleLowerCase()
      .trim()
      // Replace spaces with hyphens
      .replace(/\s+/g, "-")
      // replace special characters
      .replace(/[^\w-]+/g, "")
      // Remove special characters
      .replace(/_/g, "-")
      // Remove multiple hyphens
      .replace(/--+/g, "-")
      // Remove hyphen at the end
      .replace(/-$/g, "");

    return new Slug(slugText);
  }
}
