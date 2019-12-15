<template>
    <div class="contanier">
        Admins read
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "AdminRead",
    data() {
        return {
            baseUrl: "http://localhost:3000",
            error: ''
        };
    },
    async created() {
        //when unAuthorized
        if(localStorage.getItem('token') === null || localStorage.getItem('refreshToken') === null) {
            return this.$router.push('/login');
        }

        try {
            const response = await axios.get(this.baseUrl + `/account/getAllAdmins`, { 
                                        headers :{ 
                                            token: localStorage.getItem('token'),
                                            refreshToken: localStorage.getItem('refreshToken')
                                        }
                                    });
            console.log(response.data);
        } catch (err) {
            this.error = err.response.data;
        }
    },
    methods: {

    }
}
</script>