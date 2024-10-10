<template>
  <v-card>
    <v-card-item>
      <v-card-title>
        <div class="d-flex">
          <v-icon icon="mdi-credit-card-outline" />
          <span class="ml-2">Cartão de Crédito</span>
        </div>
      </v-card-title>
    </v-card-item>
    <v-card-text v-if="isLoadingPayment">
      Carregando...
    </v-card-text>
    <v-container style="height: 400px;" v-else-if="payment?.status === 'Canceled'">
      <v-row
        align="center"
        class="fill-height"
        justify="center"
      >
        <v-col class="text-center">
          <h1>
            <v-icon color="error" size="x-large">mdi-close-circle</v-icon>
          </h1>
          <h1 class="py-2">Pagamento cancelado</h1>
          <p>A reserva foi cancelada. Faça uma nova reserva ou entre em contato conosco.</p>
        </v-col>
      </v-row>
    </v-container>
    <v-container style="height: 400px;" v-else-if="payment?.status === 'Paid'">
      <v-row
        align="center"
        class="fill-height"
        justify="center"
      >
        <v-col class="text-center">
          <h1>
            <v-icon color="success" size="x-large">mdi-check-circle</v-icon>
          </h1>
          <h1 class="py-2">Pagamento efetuado!</h1>
          <p>Você receberá em instates um email com a confirmação da reserva.</p>
        </v-col>
      </v-row>
    </v-container>
    <v-card-text v-else-if="payment?.status === 'Requested'">
      <div id="stripe-element">
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePayment } from '@/features/booking';

const props = defineProps<{
  paymentId: string,
}>();

const paymentId = computed(() => props.paymentId);
const { payment, isLoadingPayment } = usePayment(paymentId);

const clientSecret = computed(() => payment.value?.additionalInformation?.clientSecret!);

// const refetchTimer = setInterval(() => {
//   if (payment.value?.status === 'Paid' || payment.value?.status === 'Canceled') {
//     clearInterval(refetchTimer);
//     return;
//   }

//   refetchPayment();
// }, 10_000);

// onUnmounted(() => {
//   clearInterval(refetchTimer);
// });
</script>
