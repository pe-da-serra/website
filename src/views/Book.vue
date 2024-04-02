<template>
  <v-row class="py-3 bg-white" justify="center" no-gutters>
    <v-col cols="4">
      <DateInput
        v-model="checkInInput"
        :min-date="today"
        label="Checkin"
        variant="outlined"
        density="compact"
      />
    </v-col>
    <v-col cols="4">
      <DateInput
        v-model="checkOutInput"
        :min-date="today"
        label="Checkout"
        variant="outlined"
        density="compact"
      />
    </v-col>
    <v-col cols="2">
      <v-btn @click="searchBtn"><v-icon>mdi-magnify</v-icon></v-btn>
    </v-col>
  </v-row>

  <v-row justify="center">
    <v-col md="10" xl="7" class="mx-4 d-flex h-100">
      <v-row>
        <v-col cols="12" md="8">
          <div v-if="booking.page == 'guestForm'">
            <BookingGuestForm />
          </div>
          <div v-else-if="booking.page == 'paymentForm'">
            <BookingPaymentForm />
          </div>
          <div v-else-if="booking.page == 'pixForm'">
            <BookingPixForm />
          </div>
          <div v-else>
            <div v-if="searchResult.isPending || rooms.isPending">
              Loading...
            </div>
            <div v-else-if="searchResult.isError || rooms.isError">
              Error!
              <pre>{{ searchResult.error }}</pre>
              <pre>{{ rooms.error }}</pre>
            </div>
            <div v-else>
              <BookingRoomCard
                v-for="roomRates in searchResult.data"
                :room-rates="roomRates"
                :room="roomFromRate(roomRates)"
                :checkin="props.checkIn"
                :checkout="props.checkOut"
                class="mb-4"
              />
            </div>
          </div>
        </v-col>
        <v-col v-if="mdAndUp" cols="12" md="4" class="sticky">
          <v-card class="w-100" v-if="booking.selectedRooms.length > 0">
            <BookingSummary
              v-model="summary"
              :is-mobile="false"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <v-dialog v-model="summary" fullscreen transition="dialog-bottom-transition">
    <BookingSummary
      v-model="summary"
      is-mobile
    />
  </v-dialog>

  <v-app-bar
    v-if="smAndDown && booking.selectedRooms.length > 0"
    location="bottom"
    height="110"
    class="rounded-t-xl pa-0 ma-0"
  >
    <div class="d-flex flex-column w-100">
      <p class="text-center text-body-1 mt-n1" @click="summary = true">Ver detalhes <v-icon>mdi-chevron-up</v-icon></p>
      <div class="w-100 d-flex align-center px-4 justify-space-between">
        <div>
          <p class="text-h6 font-weight-bold">{{ toMoney(totalAmount) }}</p>
          <p>28 mar - 31 mar</p>
        </div>
        <v-btn
          color="primary"
          variant="flat"
          rounded size="large"
          @click="booking.page='guestForm'"
        >Reservar</v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import DateInput from '@/components/DateInput.vue';
import BookingGuestForm from '@/components/booking/BookingGuestForm.vue';
import BookingPaymentForm from '@/components/booking/BookingPaymentForm.vue';
import BookingPixForm from '@/components/booking/BookingPixForm.vue';
import BookingSummary from '@/components/booking/BookingSummary.vue';
import BookingRoomCard from '@/components/booking/BookingRoomCard.vue';
import { useToday } from '@/features/date';
import { Room, RoomRates, booking, search } from '@/features/booking';
import { useBookingSummary } from '@/features/booking-summary';
import { toMoney } from '@/features/money';
import { routeNames } from '@/router';
import { DateTime } from 'luxon';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { listRooms } from '@/features/booking';

export type BookProps = {
  checkIn: DateTime,
  checkOut: DateTime,
};
const props = defineProps<BookProps>();

const checkInInput = ref<DateTime>(props.checkIn);
const checkOutInput = ref<DateTime>(props.checkOut);
const today = useToday();

const summary = ref<boolean>(false);

const { smAndDown, mdAndUp } = useDisplay();
const { summaryList, totalAmount, totalGuests } = useBookingSummary();

onMounted(() => {
  // checkInInput.value = props.checkIn.toJSDate()!;
  // checkOutInput.value = props.checkOut.toJSDate()!;
})

function searchBtn() {
  useRouter().push({ name: routeNames.book, query: { checkin: checkInInput.value.toISODate(), checkout: checkOutInput.value.toISODate() }})
}

const searchResult = search(checkInInput.value, checkOutInput.value);
const rooms = listRooms();

function roomFromRate(roomRates: RoomRates): Room {
  const room = rooms.value.data?.find(room => room.id === roomRates.roomId);

  if (!room) {
    throw new Error('Room not found');
  }

  return room;
}
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 150px;
}
</style>
