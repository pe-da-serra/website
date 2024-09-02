<template>
  <v-app-bar
    v-if="smAndDown && selectedRooms.length > 0 && summaryButtonText(page)"
    location="bottom"
    height="110"
    class="rounded-t-xl pa-0 ma-0"
    elevation="24"
  >
    <div class="d-flex flex-column w-100">
      <p class="text-center text-body-1 mt-n1" @click="model = true">
        Ver detalhes <v-icon>mdi-chevron-up</v-icon>
      </p>
      <div class="w-100 d-flex align-center px-4 justify-space-between">
        <div>
          <p class="text-h6 font-weight-bold">{{ toMoney(totalAmount) }}</p>
          <p>{{ useDateFormat(checkin, 'D MMM').value }} - {{ useDateFormat(checkout, 'D MMM').value }}</p>
        </div>
        <v-btn
          v-if="!hideButton"
          color="primary"
          variant="flat"
          rounded size="large"
          @click="nextPage"
          :loading="isNextStepLoading"
          :disabled="isNextStepLoading"
        >
          {{ summaryButtonText(page) }}
        </v-btn>
      </div>
    </div>
  </v-app-bar>

  <v-dialog
    v-model="model"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <BookingSummary
      v-model="model"
      is-mobile
      :hide-button="hideButton"
    />
  </v-dialog>
</template>

<script setup lang="ts">
import { useDateFormat } from '@vueuse/core';
import { useDisplay } from 'vuetify';
import BookingSummary from '@/components/booking/BookingSummary.vue';
import { useBooking, summaryButtonText } from '@/features/booking';
import { toMoney } from '@/features/money';

const model = defineModel<boolean>({ required: true });

withDefaults(defineProps<{ hideButton?: boolean }>(), {
  hideButton: false,
})

const { smAndDown } = useDisplay();
const { page, selectedRooms, totalAmount, checkin, checkout, isNextStepLoading, nextStep } = useBooking();

const nextPage = () => {
  window.scrollTo(0, 0);
  nextStep();
}
</script>
