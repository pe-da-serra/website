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
        label="Usar os mesmos dados do hóspede principal."
        hide-details
        v-model="shouldRepeatGuestData"
        @update:model-value="toggleRepeatGuestData"
      />
      <v-text-field
        v-model="booking.payer.name"
        variant="outlined"
        label="Nome completo"
        :disabled="shouldRepeatGuestData"
      />
      <v-text-field
        v-model="booking.payer.email"
        variant="outlined"
        label="Email"
        type="email"
        :disabled="shouldRepeatGuestData"
      />
      <v-text-field
        v-model="booking.payer.phone"
        variant="outlined"
        label="Telefone"
        :disabled="shouldRepeatGuestData"
      />
      <v-text-field
        v-model="booking.payer.document"
        variant="outlined"
        label="CPF"
        :disabled="shouldRepeatGuestData"
      />

      <v-radio-group v-model="booking.paymentMethod">
        <v-radio label="Pix" value="pix"></v-radio>
      </v-radio-group>
      <QrCode value="00020101021226820014br.gov.bcb.pix2560pix.stone.com.br/pix/v2/3c63d4a3-ab96-4571-a1a3-6f6c931e7ee7520400005303986540527.205802BR5914Conta primaria6014RIO DE JANEIRO62290525pacluap9wq1fzlh1fk3gkpy5363043797" />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn>Continuar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import QrCode from './QrCode.vue';
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
