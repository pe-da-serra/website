<template>
  <v-row justify="center" class="py-4">
    <v-col md="6" class="mx-4 d-flex h-100">
      <v-row>
        <v-col>
          <div v-if="isLoading">Carregando...</div>
          <v-card v-else-if="!bookingIsError && isBookingProcessing" class="text-center pa-8">
            <template v-if="bookingProcessingTimedOut">
              <h2 class="pb-4">Pagamento recebido</h2>
              <p class="text-medium-emphasis pb-4">
                Sua reserva ainda está sendo confirmada. Você receberá um e-mail assim que ela for concluída.
              </p>
              <p>
                Precisa de ajuda?
                <a :href="url.whatsapp" class="text-primary">Entre em contato conosco</a>
              </p>
            </template>
            <template v-else>
              <v-progress-circular indeterminate color="primary" size="60" />
              <h2 class="pt-5 pb-4">Confirmando sua reserva...</h2>
              <p class="text-medium-emphasis">Isso pode levar alguns segundos.</p>
            </template>
          </v-card>
          <div v-else-if="bookingIsError || booking?.status !== 'Booked'">
            Reserva não encontrada.
          </div>
          <div v-else>
            <v-card>
              <v-card-text class="pa-8">
                <div class="text-center">
                  <v-avatar color="green-lighten-5" size="60">
                    <v-icon color="green" size="x-large">mdi-check</v-icon>
                  </v-avatar>
                  <h1 class="pt-5 pb-4">Reserva confirmada!</h1>
                  <p class="text-medium-emphasis pb-4">Seu quarto foi reservado com sucesso. Um e-mail de confirmação foi enviado.</p>
                </div>

                <div class="d-flex align-center">
                  <v-avatar variant="tonal" color="primary" size="40" class="my-4 mr-4">
                    <v-icon color="primary">mdi-calendar-month-outline</v-icon>
                  </v-avatar>
                  <span class="text-h6 text-h6 font-weight-regular">Datas</span>
                </div>
                <div class="d-sm-flex">
                  <v-sheet color="grey-lighten-3" class="pa-4 pt-3 ma-2 flex-grow-1" rounded>
                    <div>
                      <span class="text-overline text-medium-emphasis">Check-in</span>
                      <p>{{ toLongString(fromIsoDate(booking?.checkIn)) }}</p>
                      <p class="text-medium-emphasis mt-1">A partir das 14:00</p>
                    </div>
                  </v-sheet>
                  <v-sheet color="grey-lighten-3" class="pa-4 pt-3 ma-2 flex-grow-1" rounded>
                    <div>
                      <span class="text-overline text-medium-emphasis">Check-out</span>
                      <p>{{ toLongString(fromIsoDate(booking?.checkOut)) }}</p>
                      <p class="text-medium-emphasis mt-1">Até às 12:00</p>
                    </div>
                  </v-sheet>
                </div>

                <div class="d-flex align-center">
                  <v-avatar variant="tonal" color="primary" size="40" class="my-4 mr-4">
                    <v-icon color="primary">mdi-account-multiple-outline</v-icon>
                  </v-avatar>
                  <div>
                    <p class="text-h6 text-h6 font-weight-regular">Hóspedes</p>
                    <p class="text-medium-emphasis">{{ booking?.guests }} pessoa{{ booking?.guests === 1 ? '' : 's' }}</p>
                  </div>
                </div>

                <div class="d-flex align-center">
                  <v-avatar variant="tonal" color="primary" size="40" class="my-4 mr-4">
                    <v-icon color="primary">mdi-credit-card-outline</v-icon>
                  </v-avatar>
                  <div>
                    <p class="text-h6 text-h6 font-weight-regular">Total Pago</p>
                    <p class="text-medium-emphasis">{{ toMoney(booking?.price) }}</p>
                  </div>
                </div>

                <div class="d-flex align-center">
                  <v-avatar variant="tonal" color="primary" size="40" class="my-4 mr-4">
                    <v-icon color="primary">mdi-bed-double-outline</v-icon>
                  </v-avatar>
                  <div>
                    <p class="text-h6 text-h6 font-weight-regular">Acomodações</p>
                  </div>
                </div>
                <div>
                  <v-sheet v-for="(room, index) in roomsList" :key="index"
                    rounded
                    color="grey-lighten-3"
                    class="d-flex justify-space-between pa-3 my-2"
                  >
                    <span>{{ room.name }}</span>
                    <span class="text-medium-emphasis">{{ room.quantity }} quarto{{ room.quantity === 1 ? '' : 's' }}</span>
                  </v-sheet>
                </div>
              </v-card-text>
            </v-card>

            <div class="text-center">
              <v-btn color="secondary" variant="tonal" to="/" class="my-5">Voltar ao Início</v-btn>

              <p>
                Precisa de ajuda?
                <a :href="url.whatsapp" class="text-primary">Entre em contato conosco</a>
              </p>
              <p>Código da reserva: <code>{{ bookingId.replaceAll('-', '') }}</code></p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useNoIndex } from '@/features/seo';
import { setPage, useBookingDetails, useRooms } from '@/features/booking';
import { BookingPage } from '@/features/booking.types';
import { url } from '@/features/contact';
import { fromIsoDate, toLongString } from '@/features/date';
import { toMoney } from '@/features/money';
import { trackBookingConversion } from '@/features/googleAds';
import { computed, watch } from 'vue';

useNoIndex();

const props = defineProps<{
  bookingId: string
}>();
const bookingId = computed(() => props.bookingId);

setPage(BookingPage.Success);

const { booking, isLoadingBooking, bookingIsError, isBookingProcessing, bookingProcessingTimedOut } = useBookingDetails(bookingId);
const { rooms, isLoadingRooms } = useRooms();

const isLoading = computed(() => isLoadingBooking.value || isLoadingRooms.value);

watch(() => booking.value?.status, (status) => {
  if (status === 'Booked' && booking.value) {
    trackBookingConversion(booking.value);
  }
}, { immediate: true });

const roomName = (roomTypeId: string): string | undefined => {
  const room = rooms.value?.find(r => r.id === roomTypeId);
  return room?.name;
}

const roomsList = computed(() => {
  const roomIds = booking.value?.rooms || [];

  const roomCount: Record<string, number> = {};
  roomIds.forEach(id => {
    roomCount[id] = (roomCount[id] || 0) + 1;
  });
  return Object.entries(roomCount).map(([roomTypeId, quantity]) => ({
    name: roomName(roomTypeId) || 'Quarto desconhecido',
    quantity,
  }));
});
</script>
