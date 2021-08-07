<template>
  <v-container class="d-flex align-center">
    <h3>Profile Details:</h3>
    <div class="ml-5">{{ profileName }}</div>
  </v-container>
</template>

<script>
export default {
  name: "profile",
  data() {
    return {
      profileName: ""
    };
  },
  mounted() {
    let profileD = JSON.parse(localStorage.getItem("selectedProfile"));
    let user = JSON.parse(localStorage.getItem("userInfo"));
    if (profileD) {
      this.profileName = profileD.prof;
    } else {
      this.profileName = user.profile[0];
    }
    if (!user) {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style></style>
