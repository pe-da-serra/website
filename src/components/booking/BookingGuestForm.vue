<template>
  <v-form validate-on="blur" :ref="booking.guestForm">
    <v-card>
      <v-card-item class="pa-2">
        <v-card-title class="d-flex align-center">
          <v-btn @click="booking.previousStep" icon="mdi-arrow-left" variant="text" />
          <span class="pl-3">Hóspede principal</span>
        </v-card-title>
      </v-card-item>
      <v-card-text class="ma-3">
        <v-row>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              v-model="booking.mainGuest.value.fullName"
              variant="outlined"
              label="Nome completo"
              placeholder="João da Silva"
              :rules="[validateName]"
            />
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              v-model="booking.mainGuest.value.email"
              variant="outlined"
              label="Email"
              placeholder="email@exemplo.com"
              type="email"
              :rules="[validateEmail]"
            />
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              :model-value="phoneMask.masked(booking.mainGuest.value.phone)"
              @update:model-value="value => booking.mainGuest.value.phone = phoneMask.unmasked(value)"
              variant="outlined"
              label="Celular"
              placeholder="(11) 98765-4321"
              type="text"
              inputmode="numeric"
              :rules="[validatePhone]"
              maxlength="15"
            />
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              :model-value="documentMask.masked(booking.mainGuest.value.document)"
              @update:model-value="value => booking.mainGuest.value.document = documentMask.unmasked(value)"
              variant="outlined"
              label="CPF"
              placeholder="111.222.333-44"
              type="text"
              inputmode="numeric"
              :rules="[validateDocument]"
              maxlength="14"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <!-- <v-card-actions>
        <v-spacer />
        <v-btn type="submit" variant="flat">Continuar</v-btn>
      </v-card-actions> -->
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { useBooking } from '@/features/booking';
import { validateName, validateEmail, validatePhone, validateDocument } from '@/features/validation';
import { phoneMask, documentMask } from '@/features/mask';

const booking = useBooking();

// async function nextStep(event: SubmitEventPromise) {
//   const result = await event;
//   if (!result.valid) {
//     return;
//   }

//   booking.payer.value = { ...booking.mainGuest.value };
//   booking.page.value = BookingPage.PaymentForm;
// }

</script>
