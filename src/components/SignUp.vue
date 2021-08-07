<template>
  <v-container>
    <v-row class="d-flex justify-center mt-10 pt-10">
      <v-col cols="4" class="sign-up-card">
        <div
          v-if="showMsg"
          class="signUpmsg font-weight-medium h4 pa-1 text-center"
        >
          Account with this email already exist
        </div>
        <v-form ref="form" v-model="valid" lazy-validation>
          <h1 class="text-center d-flex justify-center mb-4 fw500">
            Create your account
          </h1>
          <v-text-field
            outlined
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            outlined
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            outlined
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required, rules.min]"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Password"
            @click:append="show1 = !show1"
          ></v-text-field>
          <a href="#">Forgot password</a>
          <v-btn
            block
            :disabled="!valid"
            color="primary"
            class="mr-4 mb-4 mt-2"
            @click="validate"
          >
            Create account
          </v-btn>
          <div>
            Already have an account?
            <a @click="loginAccount">Log in</a>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUp",
  data: () => ({
    valid: true,
    showMsg: false,
    email: "",
    name: "",
    password: "",
    profile: [],
    nameRules: [
      v => !!v || "Name is required",
      v => (v && v.length <= 10) || "Name must be less than 10 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    show1: false,
    rules: {
      required: value => !!value || "Required.",
      min: v => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`
    }
  }),

  methods: {
    async validate() {
      let checkUser = await axios.get(
        `http://localhost:3000/users?email=${this.email}`
      );
      if (checkUser.data.length < 1) {
        console.log(checkUser.data);
        let result = await axios.post("http://localhost:3000/users", {
          email: this.email,
          password: this.password,
          profile: [this.name]
        });
        console.log(result);
        if (result.status === 201) {
          localStorage.setItem("userInfo", JSON.stringify(result.data));
          this.$router.push({ name: "Home" });
        }
      } else {
        this.showMsg = true;
      }
    },
    loginAccount() {
      window.location.href = "login";
    }
  },
  mounted() {
    let user = localStorage.getItem("userInfo");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  }
};
</script>
<style scoped>
.sign-up-card {
  position: relative;
}
.signUpmsg {
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
