<template>
  <v-dialog v-model="dialog" persistent max-width="550">
    <v-card>
      <v-card-title class="text-h5 text-center">
        Please select user name and then continue
      </v-card-title>
      <v-card-text class="d-flex justify-center">
        <v-card
          @click="showProfile(profile)"
          v-for="profile in profileList"
          :key="profile"
          class="userCard d-flex"
          >{{ profile }}</v-card
        >
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "selectUserModal",
  props: {
    value: Boolean,
    profileList: []
  },
  methods: {
    showProfile(val) {
      this.$emit("getProfileName", val);
    }
  },
  computed: {
    dialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  }
};
</script>

<style>
.userCard {
  width: 70px;
  height: 70px;
  padding: 10px;
  font-size: 16px;
  font-weight: 600;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  margin: 10px;
}
</style>
