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

<!-- POPUP -->
<v-dialog v-model="modal" eager fullscreen :class="modal ? 'bg-black' : ''">
  <v-row
    v-if="xs || mdAndUp"
    justify="center"
    align="center"
    class="pt-5 mx-0"
  >
    <v-col cols="3" class="pa-0 pl-6">
      <v-btn
        v-if="xs"
        icon="mdi-chevron-left"
        variant="plain"
        color="white"
        @click="closeModal()"
      />
      <v-btn
        v-if="mdAndUp"
        variant="text"
        color="white"
        prepend-icon="mdi-close"
        @click="closeModal()"
      >
        Fechar
      </v-btn>
    </v-col>
    <v-col cols="6" class="pa-0 text-center">
      {{ carouselIndex + 1 }} / {{ images.length }}
    </v-col>
    <v-col cols="3" class="pa-0"></v-col>
  </v-row>
  <v-row class="h-100 ma-0" align="center">
    <v-col
      v-if="sm"
      sm="2"
      align-self="start"
    >
      <v-btn
        icon="mdi-chevron-left"
        variant="plain"
        color="white"
        @click="closeModal()"
      />
    </v-col>
    <v-col sm="8" md="12" class="pa-0">
      <v-carousel
        hide-delimiters
        :show-arrows="!smAndDown"
        v-model="carouselIndex"
        touch
        @click="modal = true"
        class="pa-0 ma-0"
      >
        <v-carousel-item
          v-for="image in images"
          :key="image"
          :src="image"
          height="100vh"
        />
        <template #prev="{ props }">
          <v-btn
            variant="outlined"
            color="white"
            icon="mdi-chevron-left"
            @click="props.onClick"
          />
        </template>
        <template #next="{ props }">
          <v-btn
            variant="outlined"
            color="white"
            icon="mdi-chevron-right"
            @click="props.onClick"
          />
        </template>
      </v-carousel>
    </v-col>
  </v-row>
</v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDisplay } from 'vuetify';

defineProps<{
  images: string[],
}>();

const { xs, sm, smAndDown, mdAndUp } = useDisplay()

const modal = ref(false);
const carouselIndex = ref(0);
const openModalAtIndex = (index: number) => {
  carouselIndex.value = index;
  modal.value = true;
}
const closeModal = () => { modal.value = false; }

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
