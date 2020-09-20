<template>
  <v-app>
    <v-main>
      <v-app-bar fixed app>
        <v-toolbar-title class="headline mr-4 pointer">Common Steam Games</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon class="mr-3">mdi-white-balance-sunny</v-icon>
        <div>
          <v-switch hide-details v-model="darkMode" style="padding: 0px;"></v-switch>
        </div>
        <v-icon style="transform: rotate(180deg);">mdi-brightness-2</v-icon>
      </v-app-bar>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :editable="true" :complete="step > 1" step="1">Introduction</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :editable="true" :complete="step > 2" step="2">Steam Account</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step :editable="!!$store.state.steamID" :complete="step > 3" step="3">Friends</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4">Common Games</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <Introduction @submit="setStep(2)" />
          </v-stepper-content>
          <v-stepper-content step="2">
            <SteamAccount @submit="setStep(3)" @back="setStep(1)" />
          </v-stepper-content>
          <v-stepper-content step="3">
            <FriendSelect @submit="setStep(4)" @back="setStep(2)" />
          </v-stepper-content>
          <v-stepper-content step="4">
            <CommonGames @back="setStep(3)" />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-main>
  </v-app>
</template>

<script>
import Introduction from "./components/Introduction";
import SteamAccount from "./components/SteamAccount";
import FriendSelect from "./components/FriendSelect";
import CommonGames from "./components/CommonGames";

export default {
  name: "App",
  components: {
    Introduction,
    SteamAccount,
    FriendSelect,
    CommonGames,
  },
  data: () => ({
    tab: null,
    step: 1,
    darkMode: false,
  }),
  created() {
    this.darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  },
  methods: {
    setStep(step) {
      this.step = step;
      window.scrollTo(0, 0);
    },
  },
  watch: {
    darkMode(dark) {
      this.$vuetify.theme.dark = dark;
    },
  },
};
</script>
