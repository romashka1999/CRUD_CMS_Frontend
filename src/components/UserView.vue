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
    <br>
    <div class="card">
        <div class="card-header">
            <h3>View User :  <b>{{user.id}}</b></h3>
        </div>
        <table class="table">
            <tbody>
            <tr>
                <th>firstname:</th>
                <td>{{user.firstName}}</td>
            </tr>
            <tr>
                <th>lastname:</th>
                <td>{{user.lastName}}</td>
            </tr>
            <tr>
                <th>username:</th>
                <td>{{user.username}}</td>
            </tr>
            <tr>
                <th>email:</th>
                <td>{{user.email}}</td>
            </tr>
            <tr>
                <th>password:</th>
                <td>{{user.password}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>
</div>
</div>
</template>

<style lang="css">
.vertical-nav {
  min-width: 17rem;
  width: 17rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.4s;
}

.page-content {
  width: calc(100% - 17rem);
  margin-left: 17rem;
  transition: all 0.4s;
}
</style>

<script>
import axios from 'axios';


export default {
    name: 'UserView',
    data() {
        return {
            baseUrl: "http://localhost:3000",
            user: {}
        }
    },
    created() {
    //when unAuthorized
        if (
        localStorage.getItem("token") === null ||
        localStorage.getItem("refreshToken") === null
        ) {
            return this.$router.push("/login");
        }

        this.getUserById(this.$route.params.id);
    },
  methods: {
    async getUserById(id) {
            try {
            const response = await axios.get(this.baseUrl + `/account/getUserById/${id}`, {
                headers: {
                    token: localStorage.getItem("token"),
                    refreshToken: localStorage.getItem("refreshToken")
                }
            });
                this.user = response.data;
                console.log(this.admin);
            } catch (err) {
                console.log(err.response.data);
            }
        }
    },
}
</script>