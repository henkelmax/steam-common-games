<template>
  <v-container>
    <v-form ref="form">
      <v-text-field
        v-model="name"
        :disabled="!!id"
        :rules="nameRules"
        label="Steam Name"
        @keyup.enter="submit"
      ></v-text-field>
      <v-text-field
        v-model="id"
        :disabled="!!name"
        :rules="idRules"
        label="Steam ID 64"
        @keyup.enter="submit"
      ></v-text-field>
      <v-container class="text-right" style="width: 100%;">
        <v-btn dark color="error" class="mr-4" @click="$emit('back')">Back</v-btn>
        <v-btn color="primary" @click="submit">Continue</v-btn>
      </v-container>
    </v-form>

    <v-snackbar v-model="snackbar">
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  name: "SteamAccount",
  data: () => ({
    snackbar: false,
    overlay: false,
    snackbarText: "",
    name: "",
    nameRules: [],
    id: "",
    idRules: [
      (v) => /^[0-9]{17}$/.test(v) || !v || "Steam ID 64 must be valid",
    ],
  }),
  methods: {
    async submit() {
      this.overlay = true;
      let id64;
      if (this.id) {
        id64 = this.id;
      } else if (this.name) {
        id64 = await this.getID64(this.name);
      }
      if (id64) {
        this.$store.commit("setSteamID", id64);

        try {
          let friends = await this.getFriends();
          this.$store.commit("setFriends", friends);
          this.$emit("submit");
        } catch (err) {
          this.showSnackbar("Failed to get Steam friends");
        }
      } else {
        this.showSnackbar("Failed to get Steam user");
      }
      this.overlay = false;
    },
    async getID64(name) {
      const response = await fetch(
        `${this.$store.state.apiHostname}ISteamUser/ResolveVanityURL/v0001/?vanityurl=${name}`
      );
      const data = await response.json();
      if (data.response.success == 1) {
        return data.response.steamid;
      }
    },
    async getFriends() {
      const friends = (
        await (
          await fetch(
            `${this.$store.state.apiHostname}ISteamUser/GetFriendList/v0001/?steamid=${this.$store.state.steamID}&relationship=friend`
          )
        ).json()
      ).friendslist.friends;

      let players = [];
      let bundle = [this.$store.state.steamID];
      for (let friend of friends) {
        bundle.push(friend.steamid);
        if (bundle.length >= 100) {
          players = players.concat(await this.getPlayers(bundle));
          bundle = [];
        }
      }
      let p = await this.getPlayers(bundle);
      players = players.concat(p);
      return players;
    },
    async getPlayers(ids) {
      const response = await fetch(
        `${
          this.$store.state.apiHostname
        }ISteamUser/GetPlayerSummaries/v0002/?steamids=${ids.join(",")}`
      );
      const data = await response.json();
      return data.response.players;
    },
    showSnackbar(text) {
      this.snackbarText = text;
      this.snackbar = true;
    },
  },
};
</script>