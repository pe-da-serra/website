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
      <v-btn @click="search"><v-icon>mdi-magnify</v-icon></v-btn>
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
          <div v-else>
            <div v-if="isPending">
              Loading...
            </div>
            <div v-else-if="isError">
              Error!
              <pre>{{ error }}</pre>
            </div>
            <div v-else>
              <pre>{{ data }}</pre>
            </div>
            <!-- <BookingRoomCard class="mb-4" />
            <BookingRoomCard class="my-4" />
            <BookingRoomCard class="my-4" />
            <BookingRoomCard class="my-4" />
            <BookingRoomCard class="my-4" /> -->
          </div>
        </v-col>
        <v-col v-if="mdAndUp" cols="12" md="4" class="sticky">
          <v-card class="w-100">
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
    v-if="smAndDown"
    location="bottom"
    height="110"
    class="rounded-t-xl pa-0 ma-0"
  >
    <div class="d-flex flex-column w-100">
      <p class="text-center text-body-1 mt-n1" @click="summary = true">Ver detalhes <v-icon>mdi-chevron-up</v-icon></p>
      <div class="w-100 d-flex align-center px-4 justify-space-between">
        <div>
          <p class="text-h6 font-weight-bold">R$ 428</p>
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
import BookingSummary from '@/components/booking/BookingSummary.vue';
import BookingRoomCard from '@/components/booking/BookingRoomCard.vue';
import { useToday } from '@/features/date';
import { booking } from '@/features/booking';
import { routeNames } from '@/router';
import { DateTime } from 'luxon';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useDisplay } from 'vuetify/lib/framework.mjs';
import { useQuery } from '@tanstack/vue-query';

export type BookProps = {
  checkIn: DateTime,
  checkOut: DateTime,
};
const props = defineProps<BookProps>();

const checkInInput = ref<Date>(props.checkIn.toJSDate());
const checkOutInput = ref<Date>(props.checkIn.toJSDate());
const today = useToday().toJSDate();

const summary = ref<boolean>(false);

const { smAndDown, mdAndUp } = useDisplay();

onMounted(() => {
  // checkInInput.value = props.checkIn.toJSDate()!;
  // checkOutInput.value = props.checkOut.toJSDate()!;
})

function search() {
  useRouter().push({ name: routeNames.book, query: { checkin: checkInInput, checkout: checkOutInput }})
}

const { data, error, isPending, isError } = useQuery({
  queryKey: ['search', props.checkIn.toISODate(), props.checkOut.toISODate() ],
  queryFn: () => fetchSearch(props.checkIn, props.checkOut),
});

async function fetchSearch(checkin: DateTime, checkout: DateTime) {
  await sleep(2000);
  return [
    {
        "roomId": "3a266b79-9e90-43a7-9ceb-338cbf8207cc",
        "availableQuantity": 7,
        "rates": [
            {
                "date": "2024-03-20",
                "defaultPrice": 119.80,
                "prices": [
                    { "amount": 119.80, "guests": 2, "paymentMethod": "pix" },
                    { "amount": 109.80, "guests": 1, "paymentMethod": "pix" },
                ]
            },
            {
                "date": "2024-03-21",
                "defaultPrice": 129.80,
                "prices": [
                    { "amount": 129.80, "guests": 2, "paymentMethod": "pix" },
                    { "amount": 119.80, "guests": 1, "paymentMethod": "pix" },
                ]
            }
        ]
    }
  ];
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
</script>

<style scoped>
.sticky {
  position: sticky;
  top: 150px;
}
</style>
