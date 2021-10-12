const BookApp = {
    data() {
      return {
        books: [],
      }
    },
    computed: {},
    methods: {
        fetchBookData() {
            fetch('/api/book')
            .then( response => response.json())
            .then((json) => {
                this.books = json;
            })
            .catch( (error) => {
                console.error(error);
            });
        
        }
    },
    created() {
        this.fetchBookData();
    }
  
}
    
Vue.createApp(BookApp).mount('#bookApp')