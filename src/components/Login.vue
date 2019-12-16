<template>
  <div class="container">
    <div class="card-body" >
            <div v-if="statusCode !== 200" class="col-md-12">
                <div class="alert" :class="statusCode === 400 ? 'alert-danger' : 'alert-warning'">
                    {{alertMessage}}
                </div>
            </div>
  
            <form>         
                <div class="form-group">
                    <label class="col-md-3 control-label">Email</label>
                    <div class="col-md-12">
                        <input type="text" class="form-control" placeholder="Email" v-model="email"/>
                    </div>
                </div>
                    
                <div class="form-group">
                    <label class="col-md-3 control-label">Password</label>
                    <div class="col-md-12">
                        <input type="password" class="form-control" placeholder="Password" v-model="password"/>
                    </div>
                </div>


                <div  class="form-group">
                    <div class="col-sm-12 controls">
                        <button type="button" class="btn btn-success" @click="loginAdmin">Login</button>
                    </div>
                </div> 
            </form>      
        </div>  
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
      statusCode: 200,
      alertMessage: ''
    };
  },
  methods: {

    async loginAdmin() {
      if(!this.validateLoginForm()) {
        return 
      }

      const loginedAdminJson = {
        email: this.email,
        password: this.password
      };

      try {
        const response = await axios.post(this.baseUrl + `/account/loginAdmin`, loginedAdminJson);
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        this.$router.push('/');
      } catch (error) {
          console.log(error.response.data);
          this.alertM(400, error.response.data.message);
      }
    },
    validateLoginForm() {
      if(this.email === '' || this.password === '') {
          this.alertM(300, 'please fill all input value');
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

