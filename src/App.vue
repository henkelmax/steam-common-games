<template>
  <v-app>
    <v-main>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step :editable="true" :complete="step > 1" step="1">Steam Account</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :editable="!!$store.state.steamID" :complete="step > 2" step="2">Friends</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3">Common Games</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <SteamAccount @submit="setStep(2)" />
          </v-stepper-content>

          <v-stepper-content step="2">
            <FriendSelect @submit="setStep(3)" @back="setStep(1)" />
          </v-stepper-content>

          <v-stepper-content step="3">
            <CommonGames @back="setStep(2)" />
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-main>
  </v-app>
</template>

<script>
import SteamAccount from "./components/SteamAccount";
import FriendSelect from "./components/FriendSelect";
import CommonGames from "./components/CommonGames";

export default {
  name: "App",
  components: {
    SteamAccount,
    FriendSelect,
    CommonGames,
  },
  data: () => ({
    tab: null,
    step: 1,
  }),
  methods: {
    setStep(step) {
      this.step = step;
      window.scrollTo(0, 0);
    },
  },
};
</script>
