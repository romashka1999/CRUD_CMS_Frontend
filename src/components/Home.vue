<template>
  <div class="container">
    <button class="btn btn-danger" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {
    //when unAuthorized
    if(localStorage.getItem('token') === null || localStorage.getItem('refreshToken') === null) {
      this.$router.push('/login');
    } 
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/login');
    }
  }
};
</script>