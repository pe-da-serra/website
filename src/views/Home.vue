<template>
  <v-carousel
    hide-delimiters
    show-arrows="hover"
    touch
    cycle
    :height="carouselHeight"
  >
    <v-carousel-item
      v-for="img in images"
      :key="img"
      :src="img"
      :lazy-src="lazyImg"
      height="100%"
      alt="Homepage banner"
      cover
    />
  </v-carousel>
  <v-row justify="center">
    <v-col md="8" xl="6" class="px-8 px-sm-0">
      <v-card class="mx-16 pa-5" style="margin-top: -3rem;">
        <v-form>
          <v-row>
            <v-col cols="10" sm="4">
              <NumberInput
                v-model="guests"
                label="Hóspedes"
                prepend-icon="mdi-account-multiple-outline"
                variant="outlined"
                hide-details
              />
            </v-col>
            <v-col cols="12" sm="4">
              <DateInput
                :model-value="startDate"
                @update:model-value="updateStartDate"
                :min-date="today"
                label="Checkin"
                variant="outlined"
                prepend-icon="mdi-calendar-start-outline"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <DateInput
                :model-value="endDate"
                @update:model-value="updateEndDate"
                :min-date="today"
                label="Checkout"
                variant="outlined"
                prepend-icon="mdi-calendar-end-outline"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-card-actions class="mt-5">
          <v-btn
            block
            variant="flat"
            color="primary"
            text="Reservar"
            size="large"
            :href="bookingUrl({ start: startDate, end: endDate, guests })"
            target="_blank"
          />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
// Head
import { useHead } from '@vueuse/head'
useHead({
  title: 'Pé da Serra Hotel',
  meta: [
    {
      name: 'description',
      content: 'Página inicial do Pé da Serra Hotel',
    },
  ],
});

// Carousel
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()
var carouselHeight = computed(() => (smAndDown.value ? '40vh' : '50vh'));

import { lazyImg } from '@/features/image';
import img1 from '@/assets/hotel-1-lg.jpg';

const images = [ img1 ];

// Booking form
import { ref, computed } from 'vue';
import NumberInput from '@/components/NumberInput.vue'
import DateInput from '@/components/DateInput.vue';
import { bookingUrl } from '@/features/booking';

const guests = ref(2);
const startDate = ref(new Date);
const endDate = ref(new Date);

const today = new Date();
today.setHours(0, 0, 0, 0);
startDate.value.setDate(startDate.value.getDate() + 1);
endDate.value.setDate(endDate.value.getDate() + 3);

function updateStartDate(date: Date): void {
  if (date > endDate.value) endDate.value = date;
  startDate.value = date;
}

function updateEndDate(date: Date): void {
  if (date < startDate.value) startDate.value = date;
  endDate.value = date;
}
</script>
