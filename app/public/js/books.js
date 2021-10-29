const SomeApp = {
    data() {
      return {
        books: [],
        bookForm: {},
        selectedBook: null
      }
    },
    computed: {},
    methods: {
        fetchBooksData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        selectBook(s) {
            if (b == this.selectedBook) {
                return;
            }
            this.selectedBook = b;
            this.books = [];
            this.fetchBooksData(this.selectedBook);
        },
        postOffer(evt) {
            if (this.selectedBook === null) {
                this.postNewBook(evt);
            } else {
                this.postEditBook(evt);
            }
        },
        postNewBook(evt) {
            //this.bookForm.bookId = this.selectedBook.id;
            console.log("Creating:", this.bookForm);
            //alert("Posting!");

            fetch('api/books/create.php',{
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
           .then(response => response.json())
           .then(json => {
               console.log("Returned from post:", json);
               //TODO: test a result was returned!
               this.books = json;

               //reset the form
               this.resetBookForm = {};
           }); 
        },
        postEditBook(evt) {
            this.bookForm.bookId = this.selectedBook.id;
            this.offerForm.id = this.selectedBook.id;

            console.log("Updating:", this.bookForm);
            //alert("Posting!");

            fetch('api/books/update.php',{
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            })
           .then(response => response.json())
           .then(json => {
               console.log("Returned from post:", json);
               //TODO: test a result was returned!
               this.books = json;

               //reset the form
               this.resetBookForm = {};
           }); 
        },
        handleEditBook(book) {
            this.selectedBook = book;
            this.bookForm = Object.assign({}, this.selectedBook);
        },
        handleResetEdit() {
            this.selectedBook = null;
            this.bookForm = {};
        }
    },
    created() {
        this.fetchBooksData();
    }

  }

  Vue.createApp(SomeApp).mount('#booksApp'); 