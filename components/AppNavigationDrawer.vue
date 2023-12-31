<template>
  <v-navigation-drawer
    :value="value"
    @input="$emit('update:value', $event.target.value)"
    temporary
  >
    <v-list>
      <v-list-item prepend-icon="mdi-calendar-outline">
        Reservar
      </v-list-item>

      <v-list-item
        v-for="item in menuRoutes"
        :key="(item.meta.title as string)"
        :prepend-icon="(item.meta.icon as string)"
        :to="{ name: item.name }"
      >
        {{ item.meta.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
// import { routeNames, menuRoutes } from '@/router';
defineProps(['value']);
defineEmits(['update:value']);
import { ref } from 'vue';

import { useRouter } from 'vue-router';
const menuRoutes = ref(
  useRouter()
    .getRoutes()
    .filter(i => i.meta.menuOrder)
    .filter(i => i.name != 'index')
    .sort((a, b) => a.meta.menuOrder - b.meta.menuOrder)
);
</script>
