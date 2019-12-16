<template>
  <div class="container">
    <br>
    <p>
        <a style="font-size:30px" href="create.php" class="btn btn-outline-success">Create New User</a>
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
            <tr>
                <td> echo $user['name']</td>
                <td> echo $user['userna</td>
                <td> echo $user['email'</td>
                <td> echo $user['name']</td>
                <td> echo $user['name']</td>
                <td>
                    <a class="btn btn-sm btn-outline-primary" >View</a>
                    <a class="btn btn-sm btn-outline-info" >Update</a>
                    <a class="btn btn-sm btn-outline-danger" >Delete</a>
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
      error: ""
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
      console.log(response.data);
    } catch (err) {
      this.error = err.response.data;
    }
  },
  methods: {}
};
</script>