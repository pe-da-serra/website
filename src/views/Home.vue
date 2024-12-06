<template>
  <v-img
    :src="img4"
    :lazy-src="lazyImg"
    alt="Homepage banner"
    cover
    :height="carouselHeight"
    class="hero-image"
  >
    <div class="hero-inside d-flex fill-height justify-center align-center">
      <v-card class="mx-10 mb-15">
        <v-card-text class="d-flex flex-column align-center justify-center text-center bg-background">
          <p class="text-h6 font-weight-medium text-secondary pb-5">O melhor custo benefício da região!</p>
          <v-btn variant="outlined" :href="bookingUrl()" target="blank">
            <v-icon start icon="mdi-whatsapp" />
            Reservar por WhatsApp
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </v-img>
  <!-- <v-carousel
    hide-delimiters
    :show-arrows="images.length > 1 ? 'hover' : false"
    touch
    cycle
    :height="carouselHeight"
  >
    <v-carousel-item
      v-for="img in images"
      :key="img"
      :src="img"
      :lazy-src="lazyImg"
      alt="Homepage banner"
      cover
    />
  </v-carousel> -->
  <v-row justify="center">
    <v-col md="7" lg="5" class="px-8 px-sm-0">
      <v-card class="mx-16 pa-5" style="margin-top: -4.5rem;">
        <v-form>
          <v-row>
            <!-- <v-col cols="10" sm="4">
              <NumberInput
                v-model="guests"
                label="Hóspedes"
                prepend-icon="mdi-account-multiple-outline"
                variant="outlined"
                hide-details
              />
            </v-col> -->
            <v-col cols="12" sm="6">
              <DateInput
                :model-value="startDate"
                @update:model-value="updateStartDate"
                :min-date="today"
                label="Entrada"
                variant="outlined"
                prepend-icon="mdi-calendar-start-outline"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <DateInput
                :model-value="endDate"
                @update:model-value="updateEndDate"
                :min-date="addDays(today, 1)"
                label="Saída"
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
            text="Reserva online"
            size="large"
            :to="`/reserva?checkin=${startDate.toISODate()}&checkout=${endDate.toISODate()}`"
          />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
// Head
import { useHead } from '@unhead/vue'
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
var carouselHeight = computed(() => (smAndDown.value ? '60vh' : '50vh'));

import { lazyImg } from '@/features/image';
// import img1 from '@/assets/region-1-lg.jpg';
// import img2 from '@/assets/region-2-lg.jpg';
// import img3 from '@/assets/region-3-lg.jpg';
import img4 from '@/assets/region-4-lg.jpg';
// import img5 from '@/assets/region-5-lg.jpg';

// const images = [ img4, img5 ];

// Booking form
import { ref, computed } from 'vue';
// import NumberInput from '@/components/NumberInput.vue'
import DateInput from '@/components/DateInput.vue';
import { useToday, addDays } from '@/features/date';
import { DateTime } from 'luxon';
import { bookingUrl } from '@/features/booking.old';

// const guests = ref(2);
const today = useToday();

const startDate = ref<DateTime>(addDays(today, 1));
const endDate = ref<DateTime>(addDays(today, 2));

function updateStartDate(date: DateTime): void {
  if (date >= endDate.value) endDate.value = addDays(date, 1);
  startDate.value = date;
}

function updateEndDate(date: DateTime): void {
  if (date <= startDate.value) startDate.value = addDays(date, -1);
  endDate.value = date;
}
</script>

<style lang="css">
.hero-image {
  position: relative;
}
.hero-image::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  filter: blur(8px) brightness(75%);
}
.hero-inside {
  /* This will make it stack on top of the ::before */
  position: relative;
}
</style>
