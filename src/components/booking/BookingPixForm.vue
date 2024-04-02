<template>
  <v-card>
    <v-card-item>
      <v-btn variant="text" class="text-none" @click="booking.page = 'paymentForm'">
        <v-icon start>mdi-arrow-left</v-icon>
        Voltar
      </v-btn>
      <v-card-title>
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="20">
          <defs/>
          <g fill="#4BB8A9" fill-rule="evenodd">
            <path d="M112.57 391.19c20.056 0 38.928-7.808 53.12-22l76.693-76.692c5.385-5.404 14.765-5.384 20.15 0l76.989 76.989c14.191 14.172 33.045 21.98 53.12 21.98h15.098l-97.138 97.139c-30.326 30.344-79.505 30.344-109.85 0l-97.415-97.416h9.232zm280.068-271.294c-20.056 0-38.929 7.809-53.12 22l-76.97 76.99c-5.551 5.53-14.6 5.568-20.15-.02l-76.711-76.693c-14.192-14.191-33.046-21.999-53.12-21.999h-9.234l97.416-97.416c30.344-30.344 79.523-30.344 109.867 0l97.138 97.138h-15.116z"/>
            <path d="M22.758 200.753l58.024-58.024h31.787c13.84 0 27.384 5.605 37.172 15.394l76.694 76.693c7.178 7.179 16.596 10.768 26.033 10.768 9.417 0 18.854-3.59 26.014-10.75l76.989-76.99c9.787-9.787 23.331-15.393 37.171-15.393h37.654l58.3 58.302c30.343 30.344 30.343 79.523 0 109.867l-58.3 58.303H392.64c-13.84 0-27.384-5.605-37.171-15.394l-76.97-76.99c-13.914-13.894-38.172-13.894-52.066.02l-76.694 76.674c-9.788 9.788-23.332 15.413-37.172 15.413H80.782L22.758 310.62c-30.344-30.345-30.344-79.524 0-109.868"/>
          </g>
        </svg>
        Pix
      </v-card-title>
    </v-card-item>
    <v-card-text>
      <div class="d-flex flex-column align-center">
        <span>Tempo restante</span>
        <span style="font-family: monospace;">9:24</span>
      <QrCode :value="pixValue" />
      <v-text-field
        v-model="pixValue"
        variant="outlined"
        density="comfortable"
        hide-details
        readonly
        class="w-50"
      />
      <v-btn
        @click="copy"
        class="text-none mt-2"
        text="Copiar código Pix"
      />
    </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import QrCode from './QrCode.vue';
import { booking } from '@/features/booking';

const pixValue = '00020101021226820014br.gov.bcb.pix2560pix.stone.com.br/pix/v2/3c63d4a3-ab96-4571-a1a3-6f6c931e7ee7520400005303986540527.205802BR5914Conta primaria6014RIO DE JANEIRO62290525pacluap9wq1fzlh1fk3gkpy5363043797';

async function copy() {
  await navigator.clipboard.writeText(pixValue);
}
</script>
