const Profile = {
    data() {
        return {
            "person": {},
        }
    },
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
            .format('DD MMM YYYY')
        }
    },
    methods: {
        fetchUserData() {
            fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.person = parsedJson.results[0]
                console.log("C");
            })
            .catch( err => {
                console.error(err);
            });
        },
        postNewOffer(evt) {
        this.offerForm.studentId = this.selectedStudent.id;   
        // pass the studentid as the foreign key to the table      
        console.log("Posting:", this.offerForm);

        fetch('api/offer/create.php', {
            //promise object that completes (then) or errors (catch)
            method:'POST',
            //turn into json string from jvscript and pass into body
            body: JSON.stringify(this.offerForm),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                //offers array is equal to the json table (brand new table)
                this.offers = json;
            
                // reset the form
                this.offerForm = {};
            });
        }
    },
    created() {
        this.fetchUserData();
    }
}
Vue.createApp(Profile).mount('#profileApp');