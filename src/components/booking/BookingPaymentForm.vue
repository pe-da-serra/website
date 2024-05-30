<template>
  <v-form validate-on="blur" @submit.prevent="nextStep">
    <v-card>
      <v-card-item>
        <v-btn variant="text" class="text-none" @click="booking.page.value = BookingPage.GuestForm">
          <v-icon start>mdi-arrow-left</v-icon>
          Voltar
        </v-btn>
        <v-card-title>Pagamento</v-card-title>
      </v-card-item>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-checkbox
              label="Mesmos dados do hóspede principal."
              hide-details
              v-model="shouldRepeatGuestData"
              @update:model-value="toggleRepeatGuestData"
            />
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              v-model="booking.payer.value.fullName"
              variant="outlined"
              label="Nome completo"
              placeholder="João da Silva"
              :disabled="shouldRepeatGuestData"
              :rules="[validateName]"
            />
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              v-model="booking.payer.value.email"
              variant="outlined"
              label="Email"
              placeholder="email@exemplo.com"
              :disabled="shouldRepeatGuestData"
              type="email"
              :rules="[validateEmail]"
            />
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              :model-value="phoneMask.masked(booking.payer.value.phone)"
              @update:model-value="value => booking.payer.value.phone = phoneMask.unmasked(value)"
              variant="outlined"
              label="Celular"
              placeholder="(11) 98765-4321"
              :disabled="shouldRepeatGuestData"
              type="text"
              inputmode="numeric"
              :rules="[validatePhone]"
              maxlength="15"
            />
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              :model-value="documentMask.masked(booking.payer.value.document)"
              @update:model-value="value => booking.payer.value.document = documentMask.unmasked(value)"
              variant="outlined"
              label="CPF"
              placeholder="111.222.333-44"
              :disabled="shouldRepeatGuestData"
              type="text"
              inputmode="numeric"
              :rules="[validateDocument]"
              maxlength="14"
            />
          </v-col>
          <v-col cols="12">
            <v-radio-group v-model="booking.paymentMethod.value">
              <v-radio label="Pix" value="Pix"></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          type="submit"
          :loading="preBook.isPending"
        >
          Continuar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { useBooking, usePreBook } from '@/features/booking';
import { BookingPage } from '@/features/booking.types';
import { documentMask, phoneMask } from '@/features/mask';
import { validateDocument, validateEmail, validateName, validatePhone } from '@/features/validation';
import { ref } from 'vue';
import { SubmitEventPromise } from 'vuetify';

const booking = useBooking();

const shouldRepeatGuestData = ref<boolean>(true);
function toggleRepeatGuestData(newValue: boolean|null): void {
  if (newValue === true) {
    booking.payer.value = { ...booking.mainGuest.value };
    return;
  }

  booking.payer.value = { fullName: '', email: '', phone: '', document: '' };
}

const preBook = usePreBook();
async function nextStep(event: SubmitEventPromise) {
  const result = await event;
  if (!result.valid) {
    return;
  }

  await preBook.value.mutateAsync();

  booking.page.value = BookingPage.PixForm;
}
</script>
