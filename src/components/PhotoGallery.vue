<template>
<div v-if="xs" style="position: relative;">
  <v-carousel
    v-model="carouselIndex"
    :show-arrows="false"
    hide-delimiters
    touch
    @click="openModalAtIndex(carouselIndex)"
    height="30vh"
  >
    <v-carousel-item
      v-for="image in images"
      :key="image"
      :src="image"
      cover
    />
  </v-carousel>
  <div style="position: absolute; bottom: 20px; right: 20px" >
    <v-chip label variant="flat" color="rgba(34, 34, 34, 0.66)">{{ carouselIndex + 1 }} / {{ images.length }}</v-chip>
  </div>
</div>

<div v-else style="position: relative">
  <v-row dense>
    <v-col cols="6">
      <v-img
        :src="images[0]"
        cover
        height="100%"
        class="dark-on-hover rounded-s-lg"
        @click="openModalAtIndex(0)"
      />
    </v-col>
    <v-col>
      <v-row dense>
        <v-col>
          <v-img
            :src="images[1]"
            cover
            height="100%"
            class="dark-on-hover"
            @click="openModalAtIndex(1)"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-img
            :src="images[2]"
            cover
            height="100%"
            class="dark-on-hover"
            @click="openModalAtIndex(2)"
          />
        </v-col>
      </v-row>
    </v-col>
    <v-col>
      <v-row dense>
        <v-col>
          <v-img
            :src="images[3]"
            cover
            height="100%"
            class="dark-on-hover rounded-te-lg"
            @click="openModalAtIndex(3)"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col>
          <v-img
            :src="images[4]"
            cover
            height="100%"
            class="dark-on-hover rounded-be-lg"
            @click="openModalAtIndex(4)"
          />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <div style="position: absolute; bottom: 20px; right: 20px" >
    <v-chip
      label
      variant="flat"
      color="white"
      prepend-icon="mdi-image-multiple"
      @click="openModalAtIndex(0)"
    >
      Ver todas as fotos
    </v-chip>
  </div>
</div>

<PhotoGalleryDialog
  :images="images"
  v-model:open="modal"
  v-model:index="carouselIndex"
/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import PhotoGalleryDialog from '@/components/PhotoGalleryDialog.vue';

defineProps<{
  images: string[],
}>();
defineEmits(["update:images"])

const { xs } = useDisplay()

const modal = ref(false);
const carouselIndex = ref(0);
const openModalAtIndex = (index: number) => {
  carouselIndex.value = index;
  modal.value = true;
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
