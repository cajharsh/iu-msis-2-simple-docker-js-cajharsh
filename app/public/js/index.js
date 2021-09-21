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
            console.log("A");
            fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.person = parsedJson.results[0]
                console.log("C");
            })
                .catch( err => {
                    console.error(err)
            })
    
                console.log("B");
        }
    },
    created() {
       this.fetchUserData();

    }
}
Vue.createApp(Profile).mount('#profileApp');