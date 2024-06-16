<template>
  <!-- <v-row class="py-3 bg-white" justify="center" no-gutters>
    <v-col cols="4 px-1">
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
    <v-col cols="2 px-1">
      <v-btn @click="searchBtn"><v-icon>mdi-magnify</v-icon></v-btn>
    </v-col>
  </v-row> -->

  <v-row v-if="isLoading" justify="center" class="h-screen">
    <v-col md="10" xl="7" class="mx-4 d-flex h-100">
      <v-row
        align-content="center"
        class="fill-height"
        justify="center"
      >
        <v-col cols="6">
          <v-progress-linear
            color="primary"
            height="6"
            indeterminate
            rounded
          ></v-progress-linear>
        </v-col>
        <v-col
          class="text-subtitle-1 text-center"
          cols="12"
        >
          Carregando...
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row justify="center" class="py-4" v-else>
    <v-col md="10" xl="7" class="mx-4 d-flex h-100">
      <v-row>
        <v-col cols="12" md="8">
          <div v-if="page == BookingPage.GuestForm">
            <BookingGuestForm />
          </div>
          <div v-else-if="page == BookingPage.PaymentForm">
            <BookingPaymentForm />
          </div>
          <div v-else-if="page == BookingPage.PixForm">
            <BookingPixForm />
          </div>
          <div v-else>
            <div v-if="searchHasError || roomsHasError">
              Error!
              <pre>{{ searchError }}</pre>
              <pre>{{ roomsError }}</pre>
            </div>
            <div v-else>
              <BookingRoomCard
                v-for="roomRates in searchResult"
                :key="roomRates.roomId"
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
          <v-card class="w-100" v-if="selectedRooms.length > 0">
            <BookingSummary
              v-model="summary"
              :is-mobile="false"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <v-dialog
    v-model="summary"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <BookingSummary
      v-model="summary"
      is-mobile
    />
  </v-dialog>

  <v-app-bar
    v-if="smAndDown && selectedRooms.length > 0 && summaryButtonText(page)"
    location="bottom"
    height="110"
    class="rounded-t-xl pa-0 ma-0"
  >
    <div class="d-flex flex-column w-100">
      <p class="text-center text-body-1 mt-n1" @click="summary = true">Ver detalhes <v-icon>mdi-chevron-up</v-icon></p>
      <div class="w-100 d-flex align-center px-4 justify-space-between">
        <div>
          <p class="text-h6 font-weight-bold">{{ toMoney(totalAmount) }}</p>
          <p>{{ useDateFormat(checkin, 'D MMM').value }} - {{ useDateFormat(checkout, 'D MMM').value }}</p>
        </div>
        <v-btn
          color="primary"
          variant="flat"
          rounded size="large"
          @click="nextStep"
        >{{ summaryButtonText(page) }}</v-btn>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import BookingGuestForm from '@/components/booking/BookingGuestForm.vue';
import BookingPaymentForm from '@/components/booking/BookingPaymentForm.vue';
import BookingPixForm from '@/components/booking/BookingPixForm.vue';
import BookingSummary from '@/components/booking/BookingSummary.vue';
import BookingRoomCard from '@/components/booking/BookingRoomCard.vue';
import { useBooking, useSearch, useRooms, summaryButtonText } from '@/features/booking';
import { Room, RoomRates, BookingPage } from '@/features/booking.types';
import { toMoney } from '@/features/money';
import { DateTime } from 'luxon';
import { ref, toRef, watchEffect, computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useDateFormat } from '@vueuse/core';

export type BookProps = {
  checkIn: DateTime,
  checkOut: DateTime,
};
const props = defineProps<BookProps>();

const summary = ref<boolean>(false);

const { smAndDown, mdAndUp } = useDisplay();

const { page, selectedRooms, totalAmount, checkin, checkout, nextStep,  } = useBooking();

watchEffect(() => {
  if (selectedRooms.value.length === 0) {
    summary.value = false;
    return;
  }
});

const { searchResult, searchError, isLoadingSearch, searchHasError } = useSearch(toRef(() => props.checkIn), toRef(() => props.checkOut));
const { rooms, roomsError, isLoadingRooms, roomsHasError } = useRooms();
const isLoading = computed(() => isLoadingSearch.value || isLoadingRooms.value);

function roomFromRate(roomRates: RoomRates): Room {
  const room = rooms.value?.find(room => room.id === roomRates.roomId);

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
