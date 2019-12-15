<template>
  <div class="container">
    <div class="alert" :class="{'alert-danger':alertStatusCode!==200}" role="alert" v-if="alertMessage!==''">
      {{ alertMessage }}
    </div>
    <form>
      <div class="form-group row">
        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10">
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="Email"
            v-model="email"
          />
        </div>
      </div>

      <div class="form-group row">
        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            placeholder="Password"
            v-model="password"
          />
        </div>
      </div>

      <button @click.prevent="loginAdmin" class="btn btn-primary">Sign in</button>
    </form>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      baseUrl: "http://localhost:3000",
      email: "",
      password: "",
      alertMessage: '',
      alertStatusCode: 200
    };
  },
  methods: {
    async loginAdmin() {
      const loginedAdminJson = {
        email: this.email,
        password: this.password
      };

      console.log(loginedAdminJson);

      try {
        const response = await axios.post(this.baseUrl + `/account/loginAdmin`,loginedAdminJson);
        console.log(response);
      } catch (err) {
          this.alertMessage = err.response.data.message;
          this.alertStatusCode = err.response.data.statusCode;
          setTimeout(function(){
            this.alertMessage = '';
            this.alertStatusCode = 200;
          }.bind(this), 3000);
      }
    }
  }
};
</script>