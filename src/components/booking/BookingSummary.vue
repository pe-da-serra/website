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
        14/03/2024
        <v-icon size="small" start end>
          mdi-arrow-right
        </v-icon>
        17/03/2024
      </p>
      <p class="text-center pt-2">4 hóspedes</p>
    </div>

    <v-divider class="mb-1" />

    <div class="overflow-y-auto">
      <div class="pa-4 d-flex w-100">
        <v-btn
          size="small"
          color="red"
          variant="text"
          class="align-self-center"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div class="pl-4">
          <p>2x Quarto solteiro</p>
          <v-chip label size="small" class="mt-1">
            <v-icon start>mdi-account-multiple</v-icon>
            1
          </v-chip>
        </div>
        <div class="ml-auto">
          <p class="text-right">R$ 500</p>
        </div>
      </div>

      <v-divider class="mx-3" />
      <div class="pa-4 d-flex w-100">
        <v-btn
          size="small"
          color="red"
          variant="text"
          class="align-self-center"
          icon
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <div class="pl-4">
          <p>1x Quarto casal</p>
          <v-chip label size="small" class="mt-1">
            <v-icon start>mdi-account-multiple</v-icon>
            2
          </v-chip>
        </div>
        <div class="ml-auto">
          <p class="text-right">R$ 500</p>
        </div>
      </div>
    </div>


    <v-divider class="mt-auto"/>
    <div class="px-3 pb-3">
      <div class="d-flex justify-space-between py-5 px-3">
        <p class="font-weight-bold">Total</p>
        <p class="font-weight-bold">R$ 1.000</p>
      </div>
      <v-btn
        block
        variant="flat"
        rounded
        size="large"
        text="Reservar agora"
        @click="booking.page = 'guestForm'"
      />
      <p class="text-center text-body-2 text-medium-emphasis pt-3 pb-1">
        <v-icon size="small">mdi-shield-check-outline</v-icon>
        Pagamento seguro
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineModel } from 'vue';
import { booking } from '@/features/booking';

const props = defineProps<{
  isMobile: boolean,
}>();

const model = defineModel<boolean>({ required: true });
</script>
