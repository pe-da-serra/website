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
          <p>Você receberá em instantes um email com a confirmação da reserva.</p>
        </v-col>
      </v-row>
    </v-container>
    <v-card-text v-else-if="payment?.status === 'Requested'">
      <v-row>
        <v-col>
          <div id="stripe-element">
          </div>
        </v-col>
      </v-row>
      <div class="mt-4 mx-2">
        <v-spacer />
        <v-btn color="primary" variant="elevated" @click="pay" size="large" block>
          Pagar
        </v-btn>
        <v-spacer />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { usePayment } from '@/features/booking';

const props = defineProps<{
  paymentId: string,
}>();

const paymentId = computed(() => props.paymentId);
const { payment, isLoadingPayment, refetchPayment } = usePayment(paymentId);
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js';

const clientSecret = computed(() => payment.value?.additionalInformation?.clientSecret!);

let stripe : Stripe | null;
let elements : StripeElements | undefined;

onMounted(async () => {
  const publicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
  stripe = await loadStripe(publicKey);
  const appearance = { /* appearance */ };
  const options = { /* options */ };
  elements = stripe?.elements({ clientSecret: clientSecret.value, appearance });
  const paymentElement = elements?.create('payment', options);
  paymentElement?.mount('#stripe-element');
});

const pay = async () => {
  var result = await stripe?.confirmPayment({
    elements: elements!,
    confirmParams: {
      return_url: window.location.href,
    }
  });
  console.log(result);
}


const refetchTimer = setInterval(() => {
  if (payment.value?.status === 'Paid' || payment.value?.status === 'Canceled') {
    clearInterval(refetchTimer);
    return;
  }

  refetchPayment();
}, 10_000);

onUnmounted(() => {
  clearInterval(refetchTimer);
});
</script>
