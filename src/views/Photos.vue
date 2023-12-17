<template>
  <v-row justify="center" class="pt-3">
    <v-col cols="12" class="text-center bg-secondary py-10">
      <p class="text-h3 font-weight-thin">GALERIA</p>
      <v-divider length="100" thickness="2" color="white" class="mt-4 mx-auto border-opacity-75"></v-divider>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col md="10" xl="7" class="pa-0">
      <v-card elevation="0" min-height="700">
        <v-tabs
          v-model="currentTab"
          color="primary"
          align-tabs="center"
        >
          <v-tab :value="Tab.All">Tudo</v-tab>
          <v-tab :value="Tab.Hotel">Infraestrutura</v-tab>
          <v-tab :value="Tab.Rooms">Quartos</v-tab>
          <v-tab :value="Tab.Region">Região</v-tab>
        </v-tabs>
        <v-card-text>
          <div class="d-flex flex-wrap justify-center">
            <v-img
              v-for="(image, index) in filteredImages"
              :key="index"
              :src="image.source"
              min-width="200"
              max-width="200"
              min-height="200"
              max-height="200"
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
import { ref } from 'vue';
import PhotoGalleryDialog from '@/components/PhotoGalleryDialog.vue';
import img1 from '@/assets/example/img-1.jpg';
import img2 from '@/assets/example/img-2.jpg';
import img3 from '@/assets/example/img-3.jpg';
import { computed } from 'vue';

// Tabs
enum Tab {
  All,
  Hotel,
  Rooms,
  Region,
};
const currentTab = ref(Tab.All);

// Images
const images = ref([
  { source: img1, tags: [ Tab.Hotel ] },
  { source: img2, tags: [ Tab.Hotel ] },
  { source: img3, tags: [ Tab.Hotel ] },
  { source: img1, tags: [ Tab.Rooms ] },
  { source: img2, tags: [ Tab.Rooms ] },
  { source: img3, tags: [ Tab.Rooms ] },
  { source: img1, tags: [ Tab.Region ] },
  { source: img2, tags: [ Tab.Region ] },
  { source: img3, tags: [ Tab.Region ] },
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
