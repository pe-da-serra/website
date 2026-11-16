<template>
  <v-row justify="center" class="py-4">
    <v-col md="5" class="mx-4 d-flex h-100">
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
import { useNoIndex } from '@/features/seo';
import BookingPixForm from '@/components/booking/BookingPixForm.vue';
import BookingStripeForm from '@/components/booking/BookingStripeForm.vue';
import { usePayment, setPage } from '@/features/booking';
import { BookingPage } from '@/features/booking.types';
import { routeNames } from '@/router';
import { computed, watch } from 'vue';
import { useRouter } from 'vue-router';

useNoIndex();

const props = defineProps<{
  paymentId: string,
}>();
const paymentId = computed(() => props.paymentId);

setPage(BookingPage.Success);

const router = useRouter();
const { payment, isLoadingPayment } = usePayment(paymentId);

// Payment forms poll the shared payment query, so this covers both Pix and Stripe
watch(() => payment.value?.status, (status) => {
  if (status === 'Paid' && payment.value) {
    router.replace({ name: routeNames.bookSuccess, query: { bid: payment.value.bookingId } });
  }
}, { immediate: true });
</script>
