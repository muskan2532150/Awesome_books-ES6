class LocalStore {
  static idGenerator() {
    const books = LocalStore.getBooks();
    const id = books.length ? books[books.length - 1].id + 1 : 1;
    return id;
  }

  static getBooks() {
    let books;
    if (localStorage.getItem('BookDetails') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('BookDetails'));
    }
    return books;
  }

  static addBook(book) {
    const books = LocalStore.getBooks();
    books.push(book);
    localStorage.setItem('BookDetails', JSON.stringify(books));
  }

  static removeBook(id) {
    const books = LocalStore.getBooks();
    books.forEach((book, index) => {
      if (book.id.toString() === id.toString()) books.splice(index, 1);
    });
    localStorage.setItem('BookDetails', JSON.stringify(books));
  }
}

export default LocalStore;