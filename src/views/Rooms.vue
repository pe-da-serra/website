<template>
  <v-row justify="center" class="pt-3">
    <v-col cols="12" class="text-center bg-secondary py-10">
      <p class="text-h3 font-weight-thin">QUARTOS</p>
      <v-divider length="100" thickness="2" color="white" class="mt-4 mx-auto border-opacity-75"></v-divider>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="10" xl="6" class="px-8 px-sm-0">
      <div class="d-flex justify-center flex-wrap">
        <RoomCard
          v-for="room in rooms"
          v-bind:key="room.route"
          :guests="room.guests"
          :beds="room.beds"
          :title="room.title"
          :route="room.route"
          :image="room.image"
          class="px-3 py-2"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
useHead({
  title: 'Pé da Serra Hotel',
  meta: [
    {
      name: 'description',
      content: 'Lista de quartos do hotel.',
    },
  ],
});

import { ref } from 'vue';
import RoomCard from '@/components/RoomCard.vue';
import { routeNames } from '@/router';
import img1 from '@/assets/example/img-1.jpg';

const rooms = ref([
  { title: "Solteiro", guests: 1, beds: 1, route: routeNames.room.single, image: img1 },
  { title: "Duplo", guests: 2, beds: 2, route: routeNames.room.double, image: img1 },
  { title: "Duplo banheiro compartilhado", guests: 2, beds: 2, route: routeNames.room.doubleSharedBathroom, image: img1 },
  { title: "Casal", guests: 2, beds: 1, route: routeNames.room.couple, image: img1 },
  { title: "Triplo", guests: 3, beds: 3, route: routeNames.room.triple, image: img1 },
  { title: "Apartamento", guests: 4, beds: 3, route: routeNames.room.apartment, image: img1 },
])
</script>
