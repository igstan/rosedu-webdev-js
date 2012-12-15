public class Book {

  private final String name;
  private final String author;

  public Book(String name, String author) {
    this.name = name;
    this.author = author;
  }

  public String title() {
    return name + ", by " + author;
  }
}
