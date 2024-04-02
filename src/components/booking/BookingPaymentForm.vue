<template>
  <v-card>
    <v-card-item>
      <v-btn variant="text" class="text-none" @click="booking.page = 'guestForm'">
        <v-icon start>mdi-arrow-left</v-icon>
        Voltar
      </v-btn>
      <v-card-title>Pagamento</v-card-title>
    </v-card-item>
    <v-card-text>
      <v-checkbox
        label="Mesmos dados do hóspede principal."
        hide-details
        v-model="shouldRepeatGuestData"
        @update:model-value="toggleRepeatGuestData"
      />
      <v-row>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field
            v-model="booking.payer.name"
            variant="outlined"
            label="Nome completo"
            :disabled="shouldRepeatGuestData"
          />
        </v-col>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field
            v-model="booking.payer.email"
            variant="outlined"
            label="Email"
            type="email"
            :disabled="shouldRepeatGuestData"
            />
          </v-col>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field
            v-model="booking.payer.phone"
            variant="outlined"
            label="Telefone"
            :disabled="shouldRepeatGuestData"
          />
        </v-col>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field
            v-model="booking.payer.document"
            variant="outlined"
            label="CPF"
            :disabled="shouldRepeatGuestData"
          />
        </v-col>
      </v-row>
      <v-radio-group v-model="booking.paymentMethod">
        <v-radio label="Pix" value="pix"></v-radio>
      </v-radio-group>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="booking.page = 'pixForm'">Continuar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { booking } from '@/features/booking';
import { ref } from 'vue';

const shouldRepeatGuestData = ref<boolean>(false);

function toggleRepeatGuestData(newValue: boolean|null): void {
  if (newValue === true) {
    booking.value.payer = { ...booking.value.mainGuest };
    return;
  }

  booking.value.payer = { name: '', email: '', phone: '', document: '' };
}
</script>
