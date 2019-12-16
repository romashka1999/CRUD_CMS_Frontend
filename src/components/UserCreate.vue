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
                    <label>Name</label>
                    <input type="text" name="name" class="form-control">
                </div>
                <div class="form-group">
                    <label>Username</label>
                    <input type="text" name="username" class="form-control">
                </div>
                <div class="form-group"><label>Email</label>
                    <input type="text" name="email" class="form-control">
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" class="form-control">
                </div>
                <div class="form-group">
                    <label>Website</label>
                    <input type="text" name="website" class="form-control">
                </div>
                <div class="form-group">
                    <label>Image</label>
                    <input type="file" name="picture" class="form-control-file">
                </div>
                <button @click.prevent="createUser" class="btn btn-primary">Create Admin</button>
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
      email: "",
      password: "",
      alertMessage: "",
      alertStatusCode: 200
    };
  },
  methods: {
    async createUser() {
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