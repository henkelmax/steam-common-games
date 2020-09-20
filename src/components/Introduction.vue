<template>
  <v-container>
    <v-col cols="12">
      <v-img :src="require('@/assets/logo.png')" class="my-3" contain height="200" />
    </v-col>

    <v-col class="mb-4 text-center">
      <h1 class="display-2 font-weight-bold mb-3">Common Steam Games</h1>

      <p class="subheading font-weight-regular">
        This web app helps you finding Steam games you have in common with your friends.
        <br />Check out the source code on
        <a
          href="https://github.com/henkelmax/steam-common-games"
          target="_blank"
        >GitHub</a>.
      </p>
    </v-col>

    <v-col class="mb-5" cols="12">
      <h2 class="headline font-weight-bold mb-3 text-center">How does it work?</h2>
      <v-row justify="center">
        <ul>
          <li>
            Enter your Steam name or
            <a href="https://steamid64.net/" target="_blank">Steam ID 64</a>.
          </li>
          <li>Choose the Steam accounts you want to compare.</li>
          <li>See all common Steam games.</li>
        </ul>
      </v-row>
    </v-col>

    <v-col class="mb-4 text-center">
      <v-btn dark color="primary" class="mr-4 mb-4" @click="$emit('submit')">Let's Go!</v-btn>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: "Introduction",
  data: () => ({
    //
  }),
};
</script>
