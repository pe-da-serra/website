<template>
  <div class="bg-white d-flex flex-column overflow-hidden" :class="{ 'h-100': isMobile }">
    <div
      v-if="modelValue"
      class="d-flex justify-space-between align-center"
      @click="$emit('update:modelValue', false)"
    >
      <div class="text-h6 font-weight-regular pl-3">
        Detalhes da reserva
      </div>

      <v-btn
        icon="mdi-chevron-down"
        variant="text"
        color="black"
        @click="$emit('update:modelValue', false)"
      />
    </div>
    <v-divider v-if="model" class="mb-1" />
    <div class="py-4">
      <p class="text-center">
        {{ formattedCheckin }}
        <v-icon size="small" start end>
          mdi-arrow-right
        </v-icon>
        {{ formattedCheckout }}
      </p>
      <p class="text-center pt-2">{{ totalGuests }} hóspede{{ totalGuests !== 1 ? 's' : '' }}</p>
    </div>

    <v-divider class="mb-1" />

    <div class="overflow-y-auto">
      <div v-for="(item, i) in summaryList" :key="i" class="pa-4 d-flex w-100">
        <v-btn
          v-if="page === BookingPage.Search"
          size="small"
          color="red"
          variant="text"
          class="align-self-center"
          icon
          @click="removeRoom(item.roomId, item.guestsPerRoom)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div class="pl-4">
          <p>{{ item.quantity }}x {{ item.name }}</p>
          <v-chip label size="small" class="mt-1">
            <v-icon start>mdi-account-multiple</v-icon>
            {{ item.guestsPerRoom }}
          </v-chip>
        </div>
        <div class="ml-auto">
          <p class="text-right">{{ toMoney(item.amount) }}</p>
        </div>
      </div>
      <v-divider class="mx-3" />
    </div>


    <div class="px-3 pb-3 mt-auto">
      <div class="d-flex justify-space-between py-5 px-3">
        <p class="font-weight-bold">Total</p>
        <p class="font-weight-bold">{{ toMoney(totalAmount) }}</p>
      </div>
      <div v-if="!hideButton && summaryButtonText(page)">
        <v-btn
          block
          variant="flat"
          rounded
          size="large"
          :text="summaryButtonText(page)"
          @click="nextPage"
          :loading="isNextStepLoading"
          :disabled="isNextStepLoading"
        />
        <p class="text-center text-body-2 text-medium-emphasis pt-3 pb-1">
          <v-icon size="small">mdi-shield-check-outline</v-icon>
          Pagamento seguro
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineModel, ref } from 'vue';
import { useBooking, summaryButtonText } from '@/features/booking';
import { BookingPage } from '@/features/booking.types';
import { toMoney } from '@/features/money';
import { useDateFormat } from '@vueuse/core';

withDefaults(defineProps<{
  hideButton?: boolean,
  isMobile: boolean,
}>(), {
  hideButton: false,
  isMobile: false,
})

const model = defineModel<boolean>({ required: true });

const { page, removeRoom, summaryList, totalAmount, totalGuests, checkin, checkout, isNextStepLoading, nextStep } = useBooking();

const formatter = ref('DD/MM/YYYY');
const formattedCheckin = useDateFormat(checkin, formatter);
const formattedCheckout = useDateFormat(checkout, formatter);

const nextPage = () => {
  window.scrollTo(0, 0);
  nextStep();
  model.value = false;
}

</script>
