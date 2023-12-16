<template>
    <v-app id="inspire">
    <v-app-bar scroll-behavior="elevate">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title class="text-center">
        <router-link :to="{ name: routeNames.home }">
          <img src="@/assets/logo.svg" style="max-height: 52px;" />
        </router-link>
      </v-app-bar-title>
      <!-- <v-btn v-if="!mobile" variant="outlined">Reservar</v-btn> -->
      <v-btn icon="mdi-translate" />
    </v-app-bar>

    <app-navigation-drawer v-model="drawer" />

    <v-main>
      <router-view />
    </v-main>

    <app-footer />
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import AppFooter from '@/components/AppFooter.vue';
import AppNavigationDrawer from '@/components/AppNavigationDrawer.vue';
import { routeNames } from '@/router';

const drawer = ref(false);
const { mobile } = useDisplay();
</script>
