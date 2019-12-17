<template>
  <div class="container">
    <br>
    <p>
      <router-link :to="{ path: '/createUser'}" append  class="btn btn-outline-success" >Create New User</router-link>
      <router-link :to="{ path: '/'}" append  class="btn btn-outline-info" style="margin-left:10px">Home</router-link>
    </p>
  
    <table class="table">
        <thead>
        <tr>
            <th>id</th>
            <th>firstName</th>
            <th>lastName</th>
            <th>username</th>
            <th>email</th>
            <th>password</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="user in users"  v-bind:key="user">
                <td> {{user.id}}</td>
                <td> {{user.firstName}}</td>
                <td> {{user.lastName}}</td>
                <td> {{user.username}}</td>
                <td> {{user.email}}</td>
                <td> {{user.password}}</td>
                <td>
                    <router-link :to="{ path: '/viewAdmin'}" append class="btn btn-sm btn-primary" :id="user.id" style="margin-left:5px">View</router-link>
                    <router-link :to="{ path: '/updateAdmin'}" append class="btn btn-sm btn-info" :id="user.id" style="margin-left:5px">Update</router-link>
                    <router-link :to="{ path: '/deleteAdmin'}" append class="btn btn-sm btn-danger" :id="user.id" style="margin-left:5px">Delete</router-link>
                </td>
            </tr>

        </tbody>
    </table>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserRead",
  data() {
    return {
      baseUrl: "http://localhost:3000",
      error: "",
      users: []
    };
  },
  async created() {
    //when unAuthorized
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("refreshToken") === null
    ) {
      return this.$router.push("/login");
    }

    try {
      const response = await axios.get(this.baseUrl + `/account/getAllUsers`, {
        headers: {
          token: localStorage.getItem("token"),
          refreshToken: localStorage.getItem("refreshToken")
        }
      });
      console.log(response);
      this.users = response.data;
      console.log(this.admins);
    } catch (err) {
      this.error = err.response.data;
    }
  },
  methods: {}
};
</script>