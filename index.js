import { displayContainer, addToBook, addBook,contact,bookSection,navLink,Time } from "./modules/Import.js";
import Books from './modules/books.js';
import Display from './modules/Display.js'
import LocalStore from './modules/LocalStorage.js';
import { DateTime } from './node_modules/luxon/build/es6/luxon.js';

document.addEventListener('DOMContentLoaded', Display.displayBooks);
// Add a book from Event Listener

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


Time.textContent = ` ${DateTime.now().toJSDate().toLocaleTimeString('en-US', {
  weekday: 'short', day: 'numeric', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric', second: 'numeric',
})} `;
