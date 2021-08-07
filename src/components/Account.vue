<template>
  <div>
    <v-app-bar flat color="primary" dark>
      <v-toolbar-title>My Account</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn tile @click="backtoHome" class="mr-4">
        Back
        <v-icon right>
          mdi-arrow-left
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-tabs v-model="activeTab" background-color="primary" dark>
      <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.route" exact>
        {{ tab.name }}
      </v-tab>

      <v-tab-item
        v-for="tab of tabs"
        :key="tab.id"
        :value="tab.route"
        transition="fade-transition"
      >
        <router-view></router-view>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
// import axios from "axios";
export default {
  name: "Account",
  props: ["id"],
  data() {
    return {
      activeTab: `/account/${this.id}`,
      tabs: [
        { id: 1, name: "user", route: `/account/user` },
        { id: 2, name: "profile", route: `/account/profile` }
      ]
    };
  },
  methods: {
    backtoHome() {
      this.$router.push("/");
    }
  },
  mounted() {
    let user = localStorage.getItem("userInfo");
    if (!user) {
      this.$router.push("/");
    }
    let selectedProfile = localStorage.getItem("selectedProfile");
    console.log(selectedProfile);
  }
};
</script>
