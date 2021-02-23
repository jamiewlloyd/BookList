// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() { }
// Add book to list
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">X</a></td>
`;

    list.appendChild(row);
}

// Show alert
UI.prototype.showAlert = function (message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete book
UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
    // Get form values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    // Instantiate book
    const book = new Book(title, author, isbn);

    // Instantiate UI object
    const ui = new UI();

    // validate
    if (title === '' || author === '' || isbn === '') {
        // error alert
        ui.showAlert('Please fill in all fields', 'error')
    } else {
        // Add book to list
        ui.addBookToList(book);

        //show success
        ui.showAlert('Book Added!', 'success')

        ui.clearFields();
    }



    e.preventDefault();

})

// event listener for delete
document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book removed!', 'success');
    e.preventDefault();
})