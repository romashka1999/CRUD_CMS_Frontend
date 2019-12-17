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
                    <router-link :to="{ path: '/viewUser'}" append class="btn btn-sm btn-primary" :id="user.id" style="margin-left:5px">View</router-link>
                    <router-link :to="{ path: '/updateUser'}" append class="btn btn-sm btn-info" :id="user.id" style="margin-left:5px">Update</router-link>
                    <button @click.prevent = "deletedIdAssign" class="btn btn-sm btn-danger" :id="user.id" style="margin-left:5px" data-toggle="modal" data-target="#exampleModal">Delete</button>
                </td>
            </tr>

        </tbody>
    </table>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Delete User</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are You Sure? Do U really want to delete ?
      </div>
      <div class="modal-footer">
        <button  class="btn btn-primary" data-dismiss="modal" @click="deletedId = null">No</button>
        <button  class="btn btn-danger" data-dismiss="modal" @click="deleteUser">Yes</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserRead",
  data() {
    return {
      baseUrl: "http://localhost:3000",
      users: [],
      deletedId: null
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
  methods: {
    deleteUser() {

      console.log(this.deletedId);

    },
    deletedIdAssign(event){
      this.deletedId = event.target.getAttribute('id');
    }
  }
};
</script>