<template>
    <v-app id="inspire">
    <v-app-bar scroll-behavior="elevate" elevation="4">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click="drawer = !drawer" />
      </template>

      <v-app-bar-title class="text-center">
        <router-link :to="{ name: routeNames.home }">
          <img src="@/assets/logo.svg"
            style="max-height: 60px;"
            class="py-1"
            contain
            alt="Pé da Serra Hotel"
          />
        </router-link>
      </v-app-bar-title>

      <template v-slot:append>
        <v-btn v-if="!mobile" variant="elevated" color="primary" to="/reserva">
          <v-icon start>mdi-calendar-check</v-icon>
          Reservar
        </v-btn>
        <v-btn v-if="mobile" disabled />
      </template>

      <!-- <v-btn icon="mdi-translate" /> -->
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
import { routeNames } from '@/router';
import { useDisplay } from 'vuetify';

const drawer = ref(false);

const { mobile } = useDisplay();
</script>
