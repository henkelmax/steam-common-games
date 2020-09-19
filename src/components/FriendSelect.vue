<template>
  <v-container style="margin-bottom: 50px;">
    <v-text-field label="Search..." v-model="searchText"></v-text-field>
    <v-list>
      <v-list-item-group v-model="selectedFriends" multiple>
        <template v-for="(item, i) in friends">
          <v-list-item
            :key="`item-${i}`"
            :value="item"
            :disabled="item.communityvisibilitystate!==3"
          >
            <template v-slot:default="{ active }">
              <v-list-item-avatar>
                <v-img :src="item.avatarmedium"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.personaname"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-checkbox :disabled="item.communityvisibilitystate!==3" :input-value="active"></v-checkbox>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
    <v-layout row class="fab-container mr-8 mb-8">
      <v-btn dark color="error" class="mr-4" @click="$emit('back')">Back</v-btn>
      <v-btn color="primary" :disabled="selectedFriends.length <= 0" @click="submit">Continue</v-btn>
    </v-layout>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  name: "FriendSelect",
  data: () => ({
    selectedFriends: [],
    searchText: "",
    overlay: false,
  }),
  computed: {
    friends: {
      get() {
        return this.$store.state.friends
          .filter((player) =>
            player.personaname
              .toLowerCase()
              .includes(this.searchText.toLowerCase())
          )
          .sort((player1, player2) => {
            if (player1.steamid === this.$store.state.steamID) {
              return -1;
            } else if (player2.steamid === this.$store.state.steamID) {
              return 1;
            }
            return player1.personaname.localeCompare(player2.personaname);
          });
      },
    },
  },
  methods: {
    async submit() {
      this.overlay = true;
      let promises = [];
      for (let friend of this.selectedFriends) {
        let id = friend.steamid;
        let promise = this.getGames(id);
        promises.push(promise);
        promise.then((games) => {
          this.$store.commit("setFriendGames", { id, games });
        });
      }
      await Promise.all(promises);

      let games = this.selectedFriends[0].games;
      let common;

      for (let selectedFriend of this.selectedFriends) {
        common = [];
        for (let friendGame of selectedFriend.games) {
          for (let game of games) {
            if (friendGame.appid === game.appid) {
              common.push(game);
            }
          }
        }
        games = common;
      }
      this.$store.commit("setCommonGames", games);
      this.$store.commit("setSelectedFriends", this.selectedFriends);
      this.$emit("submit");
      this.overlay = false;
    },
    async getGames(id) {
      const response = (
        await (
          await fetch(
            `${this.$store.state.apiHostname}IPlayerService/GetOwnedGames/v0001/?steamid=${id}&include_appinfo=true&include_played_free_games=true`
          )
        ).json()
      ).response;
      return response.games ? response.games : [];
    },
  },
};
</script>

<style scoped>
.v-list-item__icon {
  margin-top: 0px;
  margin-bottom: 4px;
  margin-left: 0px;
}
.fab-container {
  position: fixed;
  bottom: 0;
  right: 0;
}
</style>