<template>
  <v-container>
    <v-row class="d-flex justify-center mt-10">
      <v-col cols="4" class="login-card">
        <div
          v-if="showMsg"
          class="login-msg font-weight-medium h4 pa-1 text-center"
        >
          Wrong email or password
        </div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <h1 class="text-center d-flex justify-center mb-4 fw500">
            Log in to your Account
          </h1>
          <v-text-field
            v-model="userMail"
            :rules="emailRules"
            label="E-mail"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="userPassword"
            outlined
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            @click:append="show1 = !show1"
          ></v-text-field>
          <v-btn
            block
            :disabled="!valid"
            color="primary"
            class="mr-4 mb-4 mt-2"
            @click="loginToAccount"
          >
            Login
          </v-btn>
          <div>
            Don't have an account?
            <a @click="newAccount">Create a new account</a>
          </div>
        </v-form>
      </v-col>
      <selectUserModal
        @getProfileName="getProfileData"
        v-model="showUserForm"
        :profileList="profileList"
      ></selectUserModal>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import selectUserModal from "./selectUserModal";
export default {
  name: "LoginPage",
  components: { selectUserModal },
  data: () => ({
    valid: true,
    showMsg: false,
    userMail: "",
    userPassword: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    profileList: [],
    showUserForm: false,
    dialog: false,
    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`
    },
    user: [2, 32]
  }),

  methods: {
    async loginToAccount() {
      if (this.$refs.form.validate()) {
        let result = await axios.get(
          `http://localhost:3000/users?email=${this.userMail}&password=${this.userPassword}`
        );
        if (result.status === 200 && result.data.length > 0) {
          localStorage.setItem("userInfo", JSON.stringify(result.data[0]));
          this.$router.push({ name: "Home" });
          // if (localData.profile.length > 1) {
          //   this.showUserForm = true;
          //   this.profileList = [...localData.profile];
          // }
        } else {
          this.showMsg = true;
        }
      }
    },
    getProfileData(e) {
      console.log(e);
      window.location.href = `Account/user`;
    },
    newAccount() {
      window.location.href = "sign-up";
    }
  }
};
</script>
<style scoped>
.login-card {
  position: relative;
}
.login-msg {
  background-color: #3b8ef5;
  color: #fff;
  border-radius: 4px;
  font-size: 15px;
  position: absolute;
  left: 10px;
  right: 10px;
  top: -35px;
}
</style>
