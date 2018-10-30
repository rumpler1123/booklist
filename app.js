class Book{
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn; 
  }
}

class UI{
  addBookToList(book){
    const list = document.getElementById('book-list');

    // create tr element 
    const row = document.createElement('tr');
    
    // insert cols 
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">X<a></td>`;
    
    list.appendChild(row);
  }


  showAlert(message, className){
    // create div
    const div = document.createElement('div');

    // add class
    div.className = `alert ${className}`;

    // add text
    div.appendChild(document.createTextNode(message));

    // get parent 
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    
    // insert alart
    container.insertBefore(div, form);

    // timeout after 3 sec 
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
  }

  deleteBook(target){
    if(target.className === 'delete'){
      target.parentElement.parentElement.remove();
    }
  }

  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}


// event listeners 
document.getElementById('book-form').addEventListener('submit', 
function(e){

  // get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  // instantiate book   
  const book = new Book(title, author, isbn);
  
  // instantiate UI
  const ui = new UI();

  // validate 
  if (title === '' || author === '' || isbn === ''){
    // error alert 
    ui.showAlert('Please fill in all fields', 'error');
  }else{
    // Add book to list 
  ui.addBookToList(book);

  // show succes 
  ui.showAlert('Book Added', 'succes');
  
  // clear fields
  ui.clearFields();
  }

  e.preventDefault();
});

// event listener for delete 

document.getElementById('book-list').addEventListener('click', function(e){
  // instantiate UI
  const ui = new UI();

  // delete book
  ui.deleteBook(e.target);

  // Show message
  ui.showAlert('Book removed!', 'succes');

  e.preventDefault();
})