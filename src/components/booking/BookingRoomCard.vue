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
        ::lazy-src="lazyImg"
        cover
      />
    </v-carousel>

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
            :lazy-src="lazyImg"
            cover
          />
        </v-carousel>
      </v-col>
      <v-col class="d-flex flex-column" :class="{ 'pl-0': smAndUp }">
        <v-card-title>{{ props.room.name }}</v-card-title>

        <v-card-subtitle>
          <span>{{ subtitle }}</span>
          <span
            v-if="props.roomRates.availableRooms < 4 && props.roomRates.availableRooms > 0"
            class="mx-1"
          >•</span>
          <span
            v-if="props.roomRates.availableRooms < 4 && props.roomRates.availableRooms > 0"
            class="text-error font-weight-bold"
          >Restam {{ props.roomRates.availableRooms }} quartos!</span>
        </v-card-subtitle>

        <v-card-text class="">
          <p class="mb-auto">{{ props.room.description }}</p>
        </v-card-text>

        <div class="mt-auto mx-auto px-4 py-3 d-flex ga-5">
          <v-tooltip text="Café da manhã" location="top">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" icon="mdi-coffee-outline"/>
            </template>
          </v-tooltip>
          <v-tooltip text="Ar condicionado no quarto" location="top">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" icon="mdi-snowflake"/>
            </template>
          </v-tooltip>
          <v-tooltip text="Wi-Fi de alta velocidade" location="top">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" icon="mdi-wifi"/>
            </template>
          </v-tooltip>
          <v-tooltip text="Smart TV" location="top">
            <template v-slot:activator="{ props }">
              <v-icon v-bind="props" icon="mdi-television"/>
            </template>
          </v-tooltip>
        </div>
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
      <p class="text-right px-3 mb-n2 text-body-2 text-medium-emphasis text-error text-decoration-line-through">
        {{ toMoney(price * 1.1) }}
      </p>
      <p class="text-right px-3 py-1">
        <!-- <span class="text-body-2 text-medium-emphasis">Diária a partir de</span> -->
        <span class="font-weight-bold pl-1">{{ toMoney(price) }}</span>
      </p>
      <p class="text-right text-body-2 px-3">{{ nightsNumber }} noite{{ nightsNumber > 1 ? 's' : '' }}</p>
      <div class="d-flex align-end justify-end px-3 pb-3">
        <NumberSelect v-model="totalGuests" :min=1 :max="room.capacity" label="Hóspedes" :disabled="maximumRooms < 1" />
        <NumberSelect v-model="totalRooms" :min=1 :max="maximumRooms" label="Quartos" :disabled="maximumRooms < 1" />
        <v-btn @click="addRoom" color="primary" variant="outlined" rounded class="ml-2" :disabled="maximumRooms < 1">
          Adicionar
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import NumberSelect from '@/components/NumberSelect.vue';
import { useBooking } from '@/features/booking';
import { Room, RoomAvailability } from '@/features/booking.types';
import { lazyImg } from '@/features/image';
import { toMoney } from '@/features/money';
import { DateTime } from 'luxon';
import { computed } from 'vue';
import { ref } from 'vue';
import { useDisplay } from 'vuetify/lib/framework.mjs';

const props = defineProps<{room: Room, roomRates: RoomAvailability, checkin: DateTime, checkout: DateTime }>();

const { xs, smAndUp, mobile } = useDisplay();

const totalGuests = ref<number>(props.room.capacity);
const totalRooms = ref<number>(1);

const subtitle = computed(() =>
  `${props.room.capacity} hóspede${props.room.capacity > 1 ? 's' : ''}`
  // `${props.room.capacity} hóspede${props.room.capacity > 1 ? 's' : ''} • ${props.room.beds} cama${props.room.beds > 1 ? 's' : '' }`
);

const photos = computed(() => {
  if (props.room.photos.length === 0) {
    return ['lazyImg'];
  }

  return props.room.photos;
});

const nightsNumber = computed(() => props.checkout.diff(props.checkin, 'days').days);

// const minPrice = computed(() => {
//   let price = props.roomRates.ratePlans
//       .reduce((acc, rp) => {
//         acc.push(...rp.rates);
//         return acc;
//       }, [] as RoomRate[])
//       .filter(rate => rate.guests >= props.room.capacity)
//       .reduce((acc, rate) => Math.min(acc, rate.price), Infinity);

//   return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
// });

const pricePerRoom = computed(() => props.roomRates.ratePlans[0].pricePerOccupancy[totalGuests.value]);
const price = computed(() => pricePerRoom.value * totalRooms.value);

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

  if (!mobile.value) {
    window.scrollTo(0, 0);
  }
};
</script>
