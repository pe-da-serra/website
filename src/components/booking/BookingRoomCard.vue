<template>
  <v-card class="w-100" :disabled="isSoldOut">
    <v-carousel
      v-if="xs"
      cover
      :hide-delimiters="photos.length <= 1"
      hide-delimiter-background
      :show-arrows="false"
      touch
      cycle
      height="175"
    >
      <v-carousel-item
        v-for="img in photos"
        :key="img"
        :src="img"
        lazy-src="https://via.placeholder.com/300x200"
        cover
      />
    </v-carousel>
    <!-- <v-img
      v-if="xs"
      cover
      height="175"
      :src="photos[0]"
    /> -->

    <v-row>
      <v-col
        v-if="!xs"
        class="ma-3 mr-0 pr-0"
        cols="6"
      >
        <v-carousel
          :hide-delimiters="photos.length <= 1"
          :show-arrows="false"
          touch
          cycle
          height="220"
          class="rounded"
        >
          <v-carousel-item
            v-for="img in photos"
            :key="img"
            :src="img"
            lazy-src="https://via.placeholder.com/300x200"
            cover
          />
        </v-carousel>
        <!-- <v-img
          cover
          height="220"
          :src="photos[0]"
          class="rounded"
        /> -->
      </v-col>
      <v-col :class="{ 'pl-0': smAndUp }">
        <v-card-title>{{ props.room.name }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">{{ subtitle }}</span>
        </v-card-subtitle>

        <v-card-text>
          <p>{{ props.room.description }}</p>
        </v-card-text>
      </v-col>
    </v-row>

    <div v-if="isSoldOut">
      <div class="d-flex align-end justify-end px-3 pb-3">
        <v-chip color="error" variant="tonal" rounded class="ml-2">
          Esgotado
        </v-chip>
      </div>
    </div>
    <div v-else>
      <v-divider class="pb-3"/>
      <p class="text-right px-3 py-1">
        <span class="text-body-2 text-medium-emphasis">Diária a partir de</span>
        <span class="font-weight-bold pl-1">{{ minPrice }}</span>
      </p>
      <p class="text-right text-body-2 px-3">{{ nightsNumber }} noite{{ nightsNumber > 1 ? 's' : '' }}</p>
      <div class="d-flex align-end justify-end px-3 pb-3">
        <NumberSelect v-model="totalGuests" :min=1 :max="room.capacity" label="Hóspedes" :disabled="maximumRooms < 1" />
        <NumberSelect v-model="totalRooms" :min=1 :max="maximumRooms" label="Quartos" :disabled="maximumRooms < 1" />
        <v-btn @click="addRoom" color="secondary" variant="outlined" rounded class="ml-2" :disabled="maximumRooms < 1">
          Adicionar
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import NumberSelect from '@/components/NumberSelect.vue';
import { useBooking } from '@/features/booking';
import { Room, RoomRates } from '@/features/booking.types';
import { intervalDates } from '@/features/date';
import { DateTime } from 'luxon';
import { computed } from 'vue';
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const props = defineProps<{room: Room, roomRates: RoomRates, checkin: DateTime, checkout: DateTime }>();

const { xs, smAndUp } = useDisplay();

const totalGuests = ref<number>(props.room.capacity);
const totalRooms = ref<number>(1);

const subtitle = computed(() =>
  `${props.room.capacity} hóspede${props.room.capacity > 1 ? 's' : ''}`
  // `${props.room.capacity} hóspede${props.room.capacity > 1 ? 's' : ''} • ${props.room.beds} cama${props.room.beds > 1 ? 's' : '' }`
);

const photos = computed(() => {
  if (props.room.photos.length === 0) {
    return ['https://via.placeholder.com/300x200'];
  }

  return props.room.photos;
});

const nightsNumber = computed(() => props.checkout.diff(props.checkin, 'days').days);

const minPrice = computed(() => {
  let price = props.roomRates.ratePlans.reduce((acc, rp) => {
    const rate = rp.rates.find(r => r.guests === totalGuests.value);
    if (!rate) {
      return acc;
    }

    return acc + rate.price;
  }, 0);

  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
});

const pricePerRoom = computed(() => {
  const dates = intervalDates(props.checkin, props.checkout);
  // from all dates, get the price for the selected guests. if not found for the exact number of guests get the price for the closest upper guest number

  return dates.reduce((acc, date) => {
    const dateRates = props.roomRates.ratePlans[0].rates.filter(r => r.date === date.toISODate());
    if (dateRates.length === 0) {
      return acc;
    }

    const price = dateRates.find(r => r.guests === totalGuests.value)?.price ?? 0;

    acc += price;

    return acc;
  }, 0);
});

const isSoldOut = computed(() => props.roomRates.availableRooms === 0 || (props.roomRates.ratePlans[0]?.rates.length ?? 0) === 0);

const booking = useBooking();

const maximumRooms = computed(() => {
  const available = props.roomRates.availableRooms;
  const selected = booking.selectedRooms.value
    .filter(r => r.roomId === props.room.id)
    .reduce((acc, r) => acc + r.totalRooms, 0);

  return available - selected;
});

const addRoom = () => {
  booking.selectRoom({
    roomId: props.room.id,
    guestsPerRoom: totalGuests.value,
    totalRooms: totalRooms.value,
    pricePerRoom: pricePerRoom.value,
    ratePlanId: props.roomRates.ratePlans[0].ratePlanId,
  }, props.checkin.toJSDate(), props.checkout.toJSDate());

  totalGuests.value = props.room.capacity;
  totalRooms.value = 1;
};
</script>

<style scoped>

</style>
