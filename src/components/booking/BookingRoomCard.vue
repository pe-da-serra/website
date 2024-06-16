<template>
  <v-card class="w-100" :disabled="isSoldOut">
    <v-img
      v-if="xs"
      cover
      height="175"
      src="https://via.placeholder.com/300x200"
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
          src="https://via.placeholder.com/300x200"
          class="rounded"
        />
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
      <p class="text-right font-weight-bold px-3">{{ price }} por noite</p>
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

const nightsNumber = computed(() => props.checkout.diff(props.checkin, 'days').days);

const price = computed(() => {
  if (props.roomRates.rates.length === 0) {
    return 0;
  }
  let price = props.roomRates.rates[0].prices.find(p => p.paymentMethod === booking.paymentMethod.value)?.amount;
  if (!price) {
    price = props.roomRates.rates[0].defaultPrice;
  }
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
});

const pricePerRoom = computed(() =>
  props.roomRates.rates.reduce((acc, rate) => {
    let datePrice = rate.prices.find(p => p.paymentMethod === booking.paymentMethod.value && p.guests === totalGuests.value)?.amount;
    if (!datePrice) {
      datePrice = rate.defaultPrice;
    }

    acc += datePrice;

    return acc;
  }, 0)
);

const isSoldOut = computed(() => props.roomRates.availableRooms === 0 || props.roomRates.rates.length === 0);

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
  }, props.checkin, props.checkout);

  totalGuests.value = props.room.capacity;
  totalRooms.value = 1;
};
</script>

<style scoped>

</style>
