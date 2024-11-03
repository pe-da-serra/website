<template>
  <v-row justify="center" class="pt-3">
    <v-col cols="12" class="text-center bg-secondary py-10">
      <p class="text-h3 font-weight-thin">GALERIA</p>
      <v-divider length="100" thickness="2" color="white" class="mt-4 mx-auto border-opacity-75"></v-divider>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="10" xl="7" class="pa-0">
      <v-card elevation="0" min-height="700" color="background">
        <v-tabs
          v-model="currentTab"
          color="primary"
          align-tabs="center"
        >
          <v-tab :value="Tab.All">Tudo</v-tab>
          <v-tab :value="Tab.Hotel">Hotel</v-tab>
          <v-tab :value="Tab.Rooms">Quartos</v-tab>
          <v-tab :value="Tab.Region">Região</v-tab>
        </v-tabs>
        <v-card-text>
          <div class="d-flex flex-wrap justify-center">
            <v-img
              v-for="(image, index) in filteredImages"
              :key="index"
              :src="image.source"
              min-width="160"
              max-width="160"
              min-height="160"
              max-height="160"
              cover
              class="ma-2 rounded dark-on-hover"
              @click="openDialogAtIndex(image.index)"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <PhotoGalleryDialog
    :images="images.map(i => i.source)"
    v-model:open="isDialogOpen"
    v-model:index="dialogIndex"
  />
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
useHead({
  title: 'Pé da Serra Hotel',
  meta: [
    {
      name: 'description',
      content: 'Galeria de fotos do hotel, quartos e região.',
    },
  ],
});

import { ref } from 'vue';
import PhotoGalleryDialog from '@/components/PhotoGalleryDialog.vue';
import hotel1 from '@/assets/hotel-1.jpg';
import hotel2 from '@/assets/hotel-2.jpg';
import room1 from '@/assets/single-1.jpg';
import room2 from '@/assets/double-1.jpg';
import room3 from '@/assets/double-shared-bathroom-1.jpg';
import room4 from '@/assets/couple-1.jpg';
import room5 from '@/assets/apartment-1.jpg';
import region1 from '@/assets/region-1.jpg';
import region2 from '@/assets/region-2-lg.jpg';
import region3 from '@/assets/region-3-lg.jpg';
import region4 from '@/assets/region-4-lg.jpg';
import region5 from '@/assets/region-5-lg.jpg';
import { computed } from 'vue';

// Tabs
enum Tab {
  All,
  Hotel,
  Rooms,
  Region,
}
const currentTab = ref(Tab.All);

// Images
const images = ref([
  { source: hotel1, tags: [ Tab.Hotel ] },
  { source: hotel2, tags: [ Tab.Hotel ] },
  { source: room1, tags: [ Tab.Rooms ] },
  { source: room2, tags: [ Tab.Rooms ] },
  { source: room3, tags: [ Tab.Rooms ] },
  { source: room4, tags: [ Tab.Rooms ] },
  { source: room5, tags: [ Tab.Rooms ] },
  { source: region1, tags: [ Tab.Region ] },
  { source: region2, tags: [ Tab.Region ] },
  { source: region3, tags: [ Tab.Region ] },
  { source: region4, tags: [ Tab.Region ] },
  { source: region5, tags: [ Tab.Region ] },
]);
const filteredImages = computed(() => {
  let imagesWithIndex = images.value.map((img, idx) => ({ ...img, index: idx}));

  if (currentTab.value == Tab.All) return imagesWithIndex;

  return imagesWithIndex.filter(img => img.tags.includes(currentTab.value));
})

// Dialog
const isDialogOpen = ref(false);
const dialogIndex = ref(0);
const openDialogAtIndex = (index: number) => {
  dialogIndex.value = index;
  isDialogOpen.value = true;
}

</script>

<style scoped>
.dark-on-hover {
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.dark-on-hover:hover {
  filter: brightness(80%);
}
</style>
