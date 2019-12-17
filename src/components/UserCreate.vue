<template>
  <div class="container">
    <div
      class="alert"
      :class="{'alert-danger':alertStatusCode!==200}"
      role="alert"
      v-if="alertMessage!==''"
    >{{ alertMessage }}</div>
    <div class="card">
        <div class="card-header">
            <h3>Create User :  </h3>
        </div>
        <div class="card-body">
            <form action="" method="POST" enctype="multipart/form-data">
                <div class="form-group">
                    <label>firstName</label>
                    <input type="text" class="form-control" v-model="firstName"/>
                </div>
                <div class="form-group">
                    <label>lastName</label>
                    <input type="text" class="form-control" v-model="la"/>
                </div>
                <div class="form-group"><label>Username</label>
                    <input type="text" class="form-control" v-model="username"/>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" v-model="email"/>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="text" class="form-control" v-model="password"/>
                </div>
                <div class="form-group">
                    <label>Repeat Password</label>
                    <input type="text" class="form-control" v-model="repeatedPassword"/>
                </div>
                <button @click.prevent="createUser" class="btn btn-primary">Create User</button>
            </form>
        </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "UserCreate",
  created() {
    //when unAuthorized
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("refreshToken") === null
    ) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      baseUrl: "http://localhost:3000",
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      repeatedPassword: '',
      statusCode: 200,
      alertMessage: ''
    };
  },
  methods: {
    async createUser() {

      const newUserJson = {
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          password: this.password
      }

      const headers = {
        token: localStorage.getItem("token"),
        refreshToken: localStorage.getItem("refreshToken")
      };

      const options = { headers: headers };

      try {
        const response = await axios.post(
          this.baseUrl + `/account/createUser`,
          newUserJson,
          options
        );
        console.log(response);
      } catch (error) {
          console.log(error.response.data);
          this.alertM(400, error.response.data.message);
      }
    },
    validateRegisterForm() {
        if(this.firstName === '' || this.lastName === '' || this.username === '' ||
            this.email === '' || this.password === '' || this.repeatedPassword === '') {
                this.alertM(300, 'please fill all input value');
                return false
        }
        if(this.password !== this.repeatedPassword) {
            this.alertM(300, 'password does not match');
            return false;
        }
        return true;
    },
    alertM(statusCode, alertMessage) {
        this.statusCode = statusCode;
        this.alertMessage = alertMessage;
        setTimeout( function () {
            this.statusCode = 200;
            this.alertMessage = '';
        }.bind(this), 4000);
    }
  }
};
</script>