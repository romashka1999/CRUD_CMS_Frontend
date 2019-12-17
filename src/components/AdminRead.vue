<template>
  <div class="container">
    <br>
    <p>
      <router-link :to="{ path: '/createAdmin'}" append  class="btn btn-outline-success" >Create New Admin</router-link>
    </p>
  
    <table class="table">
        <thead>
        <tr>
            <th>id</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
            <tr v-for="admin in admins"  v-bind:key="admin">
                <td> {{admin.id}}</td>
                <td> {{admin.email}}</td>
                <td> {{admin.password}}</td>
                <td>
                    <router-link :to="{ path: '/viewAdmin'}" append class="btn btn-sm btn-primary" :id="admin.id" style="margin-left:5px">View</router-link>
                    <router-link :to="{ path: '/updateAdmin'}" append class="btn btn-sm btn-info" :id="admin.id" style="margin-left:5px">Update</router-link>
                    <router-link :to="{ path: '/deleteAdmin'}" append class="btn btn-sm btn-danger" :id="admin.id" style="margin-left:5px">Delete</router-link>
                </td>
            </tr>

        </tbody>
    </table>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminRead",
  data() {
    return {
      baseUrl: "http://localhost:3000",
      error: "",
      admins: []
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
      const response = await axios.get(this.baseUrl + `/account/getAllAdmins`, {
        headers: {
          token: localStorage.getItem("token"),
          refreshToken: localStorage.getItem("refreshToken")
        }
      });
      console.log(response);
      this.admins = response.data;
      console.log(this.admins);
    } catch (err) {
      this.error = err.response.data;
      console.log(this.error);
    }
  },
  methods: {}
};
</script>