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
                <strong>Dashboard</strong>
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
        <div class="container">
    <div
      class="alert"
      :class="{'alert-danger':alertStatusCode!==200}"
      role="alert"
      v-if="alertMessage!==''"
    >{{ alertMessage }}</div>
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

      <button @click.prevent="createAdmin" class="btn btn-primary">Create Admin</button>
    </form>
  </div>
    </div>
</div>
</div>


  
</template>


<script>
import axios from "axios";

export default {
  name: "AdminCreate",
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
      email: "",
      password: "",
      alertMessage: "",
      alertStatusCode: 200
    };
  },
  methods: {
    async createAdmin() {
      const newAdminJson = {
        email: this.email,
        password: this.password
      };

      const headers = {
        token: localStorage.getItem("token"),
        refreshToken: localStorage.getItem("refreshToken")
      };

      const options = { headers: headers };

      try {
        const response = await axios.post(
          this.baseUrl + `/account/createAdmin`,
          newAdminJson,
          options
        );
        console.log(response);
      } catch (err) {
        this.alertMessage = err.response.data.message;
        this.alertStatusCode = err.response.data.statusCode;
        setTimeout(
          function() {
            this.alertMessage = "";
            this.alertStatusCode = 200;
          }.bind(this),
          3000
        );
      }
    }
  }
};
</script>