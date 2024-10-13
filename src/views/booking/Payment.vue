<template>
  <v-row justify="center" class="py-4">
    <v-col md="10" xl="7" class="mx-4 d-flex h-100">
      <v-row>
        <v-col>
          <div v-if="isLoadingPayment">Carregando...</div>
          <BookingPixForm v-else-if="payment?.method === 'Pix'" :paymentId="paymentId" />
          <BookingStripeForm v-else-if="payment?.gatewayType === 'Stripe'" :paymentId="paymentId" />
          <div v-else>Erro ao carregar pagamento.</div>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import BookingPixForm from '@/components/booking/BookingPixForm.vue';
import BookingStripeForm from '@/components/booking/BookingStripeForm.vue';
import { usePayment } from '@/features/booking';
import { computed } from 'vue';

const props = defineProps<{
  paymentId: string,
}>();
const paymentId = computed(() => props.paymentId);

const { payment, isLoadingPayment } = usePayment(paymentId);
</script>
