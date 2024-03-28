<template>
  <v-card class="w-100">
    <v-img
      v-if="xs"
      cover
      height="175"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    />

    <v-row>
      <v-col
        v-if="!xs"
        class="ma-3 mr-0 pr-0"
        cols="6"
      >
        <v-img
          cover
          height="220"
          src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
          class="rounded"
        />
      </v-col>
      <v-col :class="{ 'pl-0': smAndUp }">
        <v-card-title>Quarto solteiro</v-card-title>

        <v-card-subtitle>
          <span class="me-1">1 hóspede • 1 cama</span>
        </v-card-subtitle>


        <v-card-text>
          <p>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</p>
        </v-card-text>
      </v-col>
    </v-row>

    <v-divider class="pb-3"/>
    <p class="text-right font-weight-bold px-3">R$ 700</p>
    <p class="text-right text-body-2 px-3">3 noites</p>
    <div class="d-flex align-end justify-end px-3 pb-3">
      <NumberSelect v-model="totalGuests" :min=1 :max=3 label="Hóspedes"/>
      <NumberSelect v-model="totalRooms" :min=1 :max=3 label="Quartos"/>
      <v-btn color="secondary" variant="outlined" rounded class="ml-2">
        Adicionar
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import NumberSelect from '@/components/NumberSelect.vue';
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xs, smAndUp } = useDisplay();

const totalGuests = ref<number>(1);
const totalRooms = ref<number>(1);

</script>

<style scoped>

</style>
