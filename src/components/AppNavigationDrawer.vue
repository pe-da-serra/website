<template>
  <v-navigation-drawer
    :value="value"
    @input="$emit('update:value', $event.target.value)"
    temporary
  >
    <v-list>
      <v-list-item
        prepend-icon="mdi-calendar-outline"
        :href="bookingUrl()"
        target="_blank"
      >
        Reservar
      </v-list-item>

      <v-list-item
        v-for="item in menuRoutes.filter(i => i.route != routeNames.home)"
        :key="item.title"
        :prepend-icon="item.icon"
        :to="{ name: item.route }"
      >
        {{ item.title }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { bookingUrl } from '@/features/booking.old';
import { routeNames, menuRoutes } from '@/router';

defineProps(['value']);
defineEmits(['update:value']);

</script>
