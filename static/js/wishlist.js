/* Click of add to wishlist 
 * Set to local storage 
 * on DOMContentLoaded persist to ui from local storage  
 * Add key to 
 */

function Book(bookCover, bookTitle, bookPrice){
    this.bookCover = bookCover;
    this.bookTitle = bookTitle;
    this.bookPrice = bookPrice;
}

// UI Constructor
function UI(){}

UI.prototype.addBookToList = function(book) {
    setTimeout(() => {

        const wishList = document.querySelector('[selection="wishlist-directory"]');
        const row = `
            <tr>
                <td>
                    <div book-cover style="background: url(${book.bookCover});"></div>
                </td>
                <td>${book.bookTitle}</td>
                <td>${book.bookPrice}</td>
                <td>
                    <button type="submit" class="ms-2 btn" select="buy-book">Buynow</button>
                    <button type="submit" class="ms-2 btn" select="remove-list">Remove</button>
                </td>
            </tr>
        `;
    
        if(wishList)
        wishList.innerHTML += row;
    }, 300)
}

// Delete Book
UI.prototype.removeBook = function(e) {
    if(e.target.hasAttribute('select')){
        if(e.target.parentElement.parentElement.tagName === 'TR'){
            e.target.parentElement.parentElement.remove()
        }
    }
    alert('Book removed from wishlist')
}

// LS Class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else{
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books;
    }
     
    static displayBooks(){
        const books = Store.getBooks()

        books.forEach(book => {
            const ui = new UI();

            // Add book to UI
            ui.addBookToList(book);
        })

    }

    static addBook(book){
        const books = Store.getBooks()

        books.push(book);
        
        localStorage.setItem('books', JSON.stringify(books))
    }
    
    static  removeBook(){
        const books = Store.getBooks()

        // let currentIndex = 0;
        // while(currentIndex < books.length){
        //     console.log(books[currentIndex]);
        //     currentIndex++;
        // }
        books.forEach((book, index, allBooks) => {

            console.log(book.bookTitle);
            console.log(books[index].bookTitle);
            if(books[index].bookTitle === book.bookTitle){

                localStorage.removeItem(`books[${index}]`)
            }
        });
    }
}

// Persist Books To UI Event
const directToWishlist = document.querySelector('[selection="direct-to-wishlist"]');
if(directToWishlist)

directToWishlist.addEventListener('click', Store.displayBooks)

// Add Book Event
const bundle = document.querySelector('.bundle_container .bundle')
if(bundle)
bundle.addEventListener('click', (e) => {
    // Get Book Values
    const bookCover = document.querySelector('[selection="book-cover"]'),
          title = document.querySelector('[selection="book-title"]').textContent,
          price = document.querySelector('[selection="book-price"]').textContent;

    // Get book cover url
    let style = bookCover.currentStyle || window.getComputedStyle(bookCover, false),
    cover = style.backgroundImage.slice(4, -1).replace(/"/g, "")
    
    
    // Generate Book Key
    // let initKey = 0;
    
    // // when event fires key++
    // while(e){
    //     var key = initKey; 
    //     initKey++
    //     break;
    // }

    // const key = Symbol(`key${}`)


    // Init Book
    const book = new Book(cover, title, price);
    const ui = new UI();

    
    console.log(book);

    // Init Book to local storage
    Store.addBook(book)
});


// Remove Book Event

let removeEvent = () => {
    setTimeout(() => {
        
        const remove = document.querySelector('[select="remove-list"]')
        
        remove.addEventListener('click', (e) => {
            e.preventDefault();
            // const ui = new UI()
            // ui.removeBook(e)
            
        });

        // Remove From LS
        remove.addEventListener('click', Store.removeBook)
    }, 300)
    
}

if(directToWishlist)
directToWishlist.addEventListener('click', removeEvent)