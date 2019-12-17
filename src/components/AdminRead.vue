<template>
  <div class="container">
    <br>
    <p>
      <router-link :to="{ path: '/createAdmin'}" append  class="btn btn-outline-success" >Create New Admin</router-link>
      <router-link :to="{ path: '/'}" append  class="btn btn-outline-info" style="margin-left:10px">Home</router-link>
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
                    <button @click.prevent = "deletedIdAssign" class="btn btn-sm btn-danger" :id="admin.id" style="margin-left:5px" data-toggle="modal" data-target="#exampleModal">Delete</button>
                </td>
            </tr>

        </tbody>
    </table>


    <!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Delete Admin</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Are You Sure? Do U really want to delete ?
      </div>
      <div class="modal-footer">
        <button  class="btn btn-primary" data-dismiss="modal" @click="deletedId = null">No</button>
        <button  class="btn btn-danger" data-dismiss="modal" @click="deleteAdmin">Yes</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminRead",
  data() {
    return {
      baseUrl: "http://localhost:3000",
      admins: [],
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

    this.getAllAdmins();
  },
  methods: {
    async getAllAdmins() {
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
    async deleteAdmin() {
      try {
      const id = this.deletedId;
      console.log(id);
      const response = await axios.delete(this.baseUrl + `/account/deleteAdminById/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
          refreshToken: localStorage.getItem("refreshToken")
        }
      });
        console.log(response.data);
        this.getAllAdmins();
      } catch (err) {
        this.error = err.response.data;
        console.log(this.error);
      }

    },
    deletedIdAssign(event){
      this.deletedId = event.target.getAttribute('id');
    }
  }
};
</script>