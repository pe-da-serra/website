<template>
    <v-app id="inspire">
    <v-app-bar scroll-behavior="elevate">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title class="text-center">Hotel Pé da Serra</v-app-bar-title>
      <v-btn variant="outlined">Reservar</v-btn>
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
import AppFooter from '@/components/AppFooter.vue';
import AppNavigationDrawer from '@/components/AppNavigationDrawer.vue';

const drawer = ref(false);
</script>
