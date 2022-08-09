// import { DateTime } from './node_modules/luxon/build/es6/luxon.js';
// import Books from './modules/books.js';
import { displayContainer } from './Import.js';
import LocalStore from './LocalStorage.js';

class Display {
  static displayBooks() {
    const books = LocalStore.getBooks();
    books.forEach((book) => Display.addBook(book));
  }

  static addBook(book) {
    //   const displayContainer = document.querySelector('.book-display-container');
    const bookContainer = document.createElement('div');
    bookContainer.className = 'book-container';
    bookContainer.innerHTML = `
          <p class="book-title">"${book.title}" by ${book.author}</p>
          <button id= "${book.id}"class="remove-btn">Remove</button>
      `;
    displayContainer.appendChild(bookContainer);
  }

  static clearForm() {
    document.getElementById('Title').value = '';
    document.getElementById('Author').value = '';
  }

  static deleteBook(element) {
    if (element.classList.contains('remove-btn')) {
      element.parentElement.remove();
    }
  }
}

export default Display;