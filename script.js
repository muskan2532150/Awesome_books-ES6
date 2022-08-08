import Books from './books.js';
import LocalStore from './LocalStorage.js';

const navLink = document.querySelectorAll('.nav');
const contact = document.querySelector('.contact');
const bookSection = document.querySelector('.display-area');
const addBook = document.querySelector('.add-book');

class Display {
  static displayBooks() {
    const books = LocalStore.getBooks();
    books.forEach((book) => Display.addBook(book));
  }

  static addBook(book) {
    const displayContainer = document.querySelector('.book-display-container');
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

document.addEventListener('DOMContentLoaded', Display.displayBooks);
// Add a book from Event Listener
const addToBook = document.querySelector('.book-form');
addToBook.addEventListener('submit', (e) => {
  e.preventDefault();
  // Grab the Values
  const id = LocalStore.idGenerator();
  const title = document.getElementById('Title').value;
  const author = document.getElementById('Author').value;
  // Instantiate a new Book class Object
  const book = new Books(id, title, author);
  // add to Display UI
  Display.addBook(book);
  // Add to LocalStore
  LocalStore.addBook(book);
  // Clear from Area
  Display.clearForm();
  bookSection.classList.add('active');
  contact.classList.remove('active');
  addBook.classList.remove('active');
});

const displayContainer = document.querySelector('.book-display-container');
displayContainer.addEventListener('click', (e) => {
  // remove from UI
  Display.deleteBook(e.target);
  // remove from LocalStore
  LocalStore.removeBook(e.target.id);
  // remove from LocalStore
});

navLink.forEach((link, index) => {
  link.addEventListener('click', () => {
    if (index === 2) {
      contact.classList.add('active');
      addBook.classList.remove('active');
      bookSection.classList.remove('active');
    } else if (index === 0) {
      bookSection.classList.add('active');
      contact.classList.remove('active');
      addBook.classList.remove('active');
    } else {
      addBook.classList.add('active');
      bookSection.classList.remove('active');
      contact.classList.remove('active');
    }
  });
});

const Time = document.querySelector('.time');
const date = new Date();
const format = {
  month: 'long', weekday: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit',
};
Time.textContent = date.toLocaleTimeString('en-us', format);
