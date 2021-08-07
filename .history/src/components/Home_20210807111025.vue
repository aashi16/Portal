<template>
  <div>
    <!-- TOPNAV -->
    <v-app-bar flat color="primary" dark>
      <v-toolbar-title>Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="loggedIn" tile @click="addUser" class="mr-4">
        Add User
        <v-icon right>
          mdi-account-plus
        </v-icon>
      </v-btn>
      <v-btn v-if="loggedIn" tile @click="logOut">
        LogOut
        <v-icon right>
          mdi-logout
        </v-icon>
      </v-btn>
    </v-app-bar>
    <!-- ON CLICK OF ADD BTN SHOW ADDPOPUP -->
    <v-dialog v-model="addUserPopUp" persistent max-width="400px">
      <v-card class="pa-5">
        <span class="text-h6">Add User</span>
        <v-text-field
          label="User name"
          outlined
          required
          class="mt-2"
          v-model="addedName"
        ></v-text-field>
        <div v-show="showMsg" class="warning-msg">User already Exist</div>
        <v-card-actions class="pa-0">
          <v-spacer></v-spacer>
          <v-btn @click="closeUserPopup" color="primary ">Cancel</v-btn>
          <v-btn @click="saveName" color="primary ">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div v-if="singleUser">
      <v-row class="d-flex justify-center mt-10">
        <h1>{{ welcomeMsg }}</h1>
      </v-row>
      <v-row class="d-flex justify-center mt-10">
        <v-btn color="primary" @click="goToLoginPage">{{ btnText }}</v-btn>
      </v-row>
    </div>
    <div v-if="!singleUser">
      <v-row class="d-flex justify-center mt-10">
        <v-col cols="6">
          <div class="text-h5 text-center">
            Please select user name and continue
          </div>
          <div class="d-flex justify-center">
            <v-card
              @click="showProfile(profile)"
              v-for="profile in profileList"
              :key="profile"
              class="userCard d-flex"
              >{{ profile }}</v-card
            >
          </div>
        </v-col>
      </v-row>
    </div>
    <selectUserModal
      @getProfileName="getProfileData"
      v-model="showUserForm"
      :profileList="profileList"
    ></selectUserModal>
  </div>
</template>
<script>
import selectUserModal from "./selectUserModal";
import axios from "axios";
export default {
  name: "Home",
  components: { selectUserModal },
  data() {
    return {
      showMsg: false,
      profileList: [],
      singleUser: true,
      addUserPopUp: false,
      showUserForm: false,
      addedName: "",
      loggedIn: localStorage.getItem("userInfo") ? true : false,
      profileName: ""
    };
  },
  methods: {
    async getProfileData(prof) {
      let userData = JSON.parse(localStorage.getItem("userInfo"));
      if (userData) {
        let selectedData = await axios.post(
          `http://localhost:3000/selectedUser?id=${userData.id}`,
          {
            prof
          }
        );
        localStorage.setItem(
          "selectedProfile",
          JSON.stringify(selectedData.data)
        );
        window.location.href = `account/user`;
      }
    },
    async showProfile(prof) {
      let userData = JSON.parse(localStorage.getItem("userInfo"));
      if (userData) {
        let selectedData = await axios.post(
          `http://localhost:3000/selectedUser?id=${userData.id}`,
          {
            prof
          }
        );
        localStorage.setItem(
          "selectedProfile",
          JSON.stringify(selectedData.data)
        );
        window.location.href = `account/user`;
      }
    },
    addUser() {
      this.addUserPopUp = true;
    },
    logOut() {
      localStorage.clear();
      this.loggedIn = false;
      window.location.href = "login";
    },
    resetData() {
      this.addedName = "";
      this.addUserPopUp = false;
    },
    closeUserPopup() {
      this.showMsg = false;
      this.resetData();
    },
    async saveName() {
      let localData = JSON.parse(localStorage.getItem("userInfo"));
      let checkDupicateUser = localData.profile.includes(this.addedName)
        ? true
        : false;
      if (!checkDupicateUser) {
        this.showMsg = false;
        this.profileList = [...localData.profile, this.addedName];
        const baseUrl = "http://localhost:3000/users";
        let updatedUserData = await axios.patch(`${baseUrl}/${localData.id}`, {
          profile: this.profileList
        });
        // let updatedUserData = await axios.post(
        //   `${baseUrl}?id=${localData.id}`,
        //   {
        //     email: localData.email,
        //     password: localData.password,
        //     profile: this.profileList
        //   }
        // );
        // let loggedInUser = await axios.delete(`${baseUrl}/${localData.id}`);
        console.log(updatedUserData);
        // console.log(loggedInUser);
        if (updatedUserData.status === 200) {
          localStorage.setItem(
            "userInfo",
            JSON.stringify(updatedUserData.data)
          );
          if (localData.profile.length < 2) {
            this.showUserForm = true;
          }
          this.resetData();
        }
      } else {
        this.showMsg = true;
      }
    },
    goToLoginPage() {
      if (localStorage.getItem("userInfo")) {
        window.location.href = "account/user";
      } else {
        window.location.href = "login";
      }
    }
  },
  computed: {
    welcomeMsg() {
      return this.loggedIn
        ? `Welcome back ${this.profileName}`
        : `Welcome to our Portal`;
    },
    btnText() {
      return this.loggedIn ? `My Account` : `Please Go to Login`;
    }
  },
  mounted() {
    let user = localStorage.getItem("userInfo");

    if (!user) {
      this.$router.push({ name: "SignUp" });
    }
    if (user) {
      this.profileName = JSON.parse(user).profile;
      let profileD = JSON.parse(user).profile;
      if (profileD.length > 1) {
        console.log(profileD.length);
        this.singleUser = false;
        this.profileList = [...JSON.parse(user).profile];
      } else {
        this.singleUser = true;
      }
    }
  }
};
</script>
<style>
.warning-msg {
  color: red;
  font: 1em sans-serif;
  position: absolute;
}
</style>
