<template>
  <v-container class="d-flex align-center">
    <h3>User Details:</h3>
    <div class="ml-5">{{ userName }}</div>
  </v-container>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      userName: ""
    };
  },
  mounted() {
    let user = localStorage.getItem("userInfo");
    this.userName = JSON.parse(user).email;
    if (!user) {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style></style>
