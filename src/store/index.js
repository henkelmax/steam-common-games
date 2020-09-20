import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiHostname: process.env.NODE_ENV === 'production' ? "https://steam-common-games.herokuapp.com/" : "http://localhost:5000/",
    friends: [],
    selectedFriends: [],
    commonGames: [],
    steamID: ""
  },
  mutations: {
    setSteamID(state, id) {
      state.steamID = id;
    },
    setFriends(state, friends) {
      state.friends = friends;
    },
    setSelectedFriends(state, friends) {
      state.selectedFriends = friends;
    },
    setFriendGames(state, obj) {
      let friend = state.friends.find(friend => friend.steamid === obj.id);
      if (friend) {
        friend.games = obj.games;
      }
    },
    setCommonGames(state, games) {
      state.commonGames = games;
    }
  },
  actions: {
  },
  modules: {
  }
})
