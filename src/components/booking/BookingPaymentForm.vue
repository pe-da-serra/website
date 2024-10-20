<template>
  <v-form validate-on="blur" @submit.prevent :ref="booking.paymentForm">
    <v-card>
      <v-card-item class="pa-2">
        <v-card-title class="d-flex align-center">
          <v-btn @click="booking.previousStep" icon="mdi-arrow-left" variant="text" />
          <span class="pl-3">Pagamento</span>
        </v-card-title>
      </v-card-item>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="d-flex justify-center">
            <v-card
              v-model="booking.paymentMethod.value"
              max-width="250"
              border
              flat
              hover
              link
              :variant="booking.paymentMethod.value == 'Pix' ? 'tonal' : undefined"
              :color="booking.paymentMethod.value == 'Pix' ? 'primary' : undefined"
              @click="booking.paymentMethod.value = 'Pix'"
            >
              <template #text>
                <div class="d-flex">
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="20">
                    <defs/>
                    <g fill-rule="evenodd">
                      <path d="M112.57 391.19c20.056 0 38.928-7.808 53.12-22l76.693-76.692c5.385-5.404 14.765-5.384 20.15 0l76.989 76.989c14.191 14.172 33.045 21.98 53.12 21.98h15.098l-97.138 97.139c-30.326 30.344-79.505 30.344-109.85 0l-97.415-97.416h9.232zm280.068-271.294c-20.056 0-38.929 7.809-53.12 22l-76.97 76.99c-5.551 5.53-14.6 5.568-20.15-.02l-76.711-76.693c-14.192-14.191-33.046-21.999-53.12-21.999h-9.234l97.416-97.416c30.344-30.344 79.523-30.344 109.867 0l97.138 97.138h-15.116z"/>
                      <path d="M22.758 200.753l58.024-58.024h31.787c13.84 0 27.384 5.605 37.172 15.394l76.694 76.693c7.178 7.179 16.596 10.768 26.033 10.768 9.417 0 18.854-3.59 26.014-10.75l76.989-76.99c9.787-9.787 23.331-15.393 37.171-15.393h37.654l58.3 58.302c30.343 30.344 30.343 79.523 0 109.867l-58.3 58.303H392.64c-13.84 0-27.384-5.605-37.171-15.394l-76.97-76.99c-13.914-13.894-38.172-13.894-52.066.02l-76.694 76.674c-9.788 9.788-23.332 15.413-37.172 15.413H80.782L22.758 310.62c-30.344-30.345-30.344-79.524 0-109.868"/>
                    </g>
                  </svg>
                  <span class="ml-2">Pix</span>
                </div>
              </template>
            </v-card>
            <v-card
              v-model="booking.paymentMethod.value"
              max-width="250"
              border
              flat
              hover
              link
              class="ml-3"
              :variant="booking.paymentMethod.value == 'CreditCard' ? 'tonal' : undefined"
              :color="booking.paymentMethod.value == 'CreditCard' ? 'primary' : undefined"
              @click="booking.paymentMethod.value = 'CreditCard'"
            >
              <template #text>
                <div class="d-flex">
                  <v-icon>mdi-credit-card-outline</v-icon>
                  <span class="ml-2">Cartão de crédito</span>
                </div>
              </template>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-checkbox
              label="O pagador é o hóspede principal."
              hide-details
              v-model="shouldRepeatGuestData"
              @update:model-value="toggleRepeatGuestData"
            />
          </v-col>
        </v-row>
        <v-row v-if="!shouldRepeatGuestData">
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              v-model="booking.payer.value.fullName"
              variant="outlined"
              label="Nome completo"
              placeholder="João da Silva"
              :rules="[validateName]"
            />
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              v-model="booking.payer.value.email"
              variant="outlined"
              label="Email"
              placeholder="email@exemplo.com"
              type="email"
              :rules="[validateEmail]"
            />
          </v-col>
          <v-col cols="12" md="6" class="pb-0">
            <v-text-field
              :model-value="phoneMask.masked(booking.payer.value.phone)"
              @update:model-value="(value: string) => booking.payer.value.phone = phoneMask.unmasked(value)"
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
              :model-value="documentMask.masked(booking.payer.value.document)"
              @update:model-value="(value: string) => booking.payer.value.document = documentMask.unmasked(value)"
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
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { useBooking } from '@/features/booking';
import { documentMask, phoneMask } from '@/features/mask';
import { validateDocument, validateEmail, validateName, validatePhone } from '@/features/validation';
import { ref } from 'vue';

const booking = useBooking();

const shouldRepeatGuestData = ref<boolean>(true);
function toggleRepeatGuestData(newValue: boolean|null): void {
  if (newValue === true) {
    booking.payer.value = { ...booking.mainGuest.value };
    return;
  }

  booking.payer.value = { fullName: '', email: '', phone: '', document: '' };
}

// const preBook = usePreBook();
// async function nextStep(event: SubmitEventPromise) {
//   const result = await event;
//   if (!result.valid) {
//     return;
//   }

//   await preBook.mutateAsync();

//   booking.page.value = BookingPage.PixForm;
// }
</script>
