<template>

<div>
<div class="vertical-nav bg-white">
    <div class="py-4 px-3 mb-4 bg-light">
        <div class="media d-flex align-items-center"><img src="https://res.cloudinary.com/mhmd/image/upload/v1556074849/avatar-1_tcnd60.png" alt="..." width="65" class="mr-3 rounded-circle img-thumbnail shadow-sm">
            <div class="media-body">
                <h4 class="m-0">Romana1</h4>
                <p class="font-weight-light text-muted mb-0">Web developer</p>
            </div>
        </div>
    </div>


    <ul class="nav flex-column bg-white mb-0">
        <li class="nav-item">
            <a href="#" class="nav-link text-dark font-italic bg-light">
                <router-link :to="{ path: '/'}" append class="nav-link text-dark font-italic"><strong>Dashboard</strong></router-link>
            </a>
        </li>
        <li class="nav-item">
          <router-link :to="{ path: '/readAdmin'}" append class="nav-link text-dark font-italic">Admins</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ path: '/readUser'}" append class="nav-link text-dark font-italic">Users</router-link>
        </li>
    </ul>
</div>
<!-- End vertical navbar -->


<!-- Page content holder -->
<div class="page-content p-5" id="content">
     <div class="container">
      <div v-if="alertStatusCode" class="col-md-12"> 
            <div class="alert" :class="alertStatusCode === 400 ? 'alert-danger': alertStatusCode === 300 ? 'alert-warning': 'alert-success'">
                {{alertMessage}}
            </div>
        </div>
    <div class="card">
        <div class="card-header">
            <h3>Create User :  </h3>
        </div>
        <div class="card-body">
            <form >
                <div class="form-group">
                    <label>firstName</label>
                    <input type="text" class="form-control" v-model="firstName"/>
                </div>
                <div class="form-group">
                    <label>lastName</label>
                    <input type="text" class="form-control" v-model="lastName"/>
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
      alertMessage: "",
      alertStatusCode: null
    };
  },
  methods: {
    async createUser() {

      if (!this.validateRegisterForm()) {
        return;
      }

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
        this.alertM(200, 'user successfully created');
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
    alertM(alertStatusCode, alertMessage) {
        this.alertStatusCode = alertStatusCode;
        this.alertMessage = alertMessage;
        setTimeout( function () {
            this.alertStatusCode = null;
            this.alertMessage = '';
        }.bind(this), 4000);
    }
  }
};
</script>