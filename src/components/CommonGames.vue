<template>
  <v-container style="margin-bottom: 50px;">
    <p class="text-center" style="margin: 5px;">Common games of</p>
    <div class="text-center">
      <v-chip
        class="mx-2"
        color="primary"
        v-for="(friend, i) in $store.state.selectedFriends"
        :key="i"
      >{{friend.personaname}}</v-chip>
    </div>
    <v-text-field label="Search..." v-model="searchText"></v-text-field>
    <v-row justify="center" class="ma-2">
      <v-col lg="3" xl="3" md="4" sm="6" cols="12" v-for="(game, i) in commonGames" :key="i">
        <v-card outlined height="100%" class="pointer" @click="showGame(game.appid)">
          <v-img
            :src="game.img_logo_url?`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`:require('@/assets/no-image.jpg')"
          ></v-img>
          <v-card-title>{{ game.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-btn dark bottom right fixed color="error" class="mr-4 mb-4" @click="$emit('back')">Back</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "CommonGames",
  data: () => ({
    searchText: "",
  }),
  computed: {
    commonGames: {
      get() {
        return this.$store.state.commonGames
          .filter((game) =>
            game.name.toLowerCase().includes(this.searchText.toLowerCase())
          )
          .sort((name1, name2) => name1.name.localeCompare(name2.name));
      },
    },
  },
  methods: {
    showGame(id) {
      window.open(`steam://nav/games/details/${id}`, "_blank");
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>