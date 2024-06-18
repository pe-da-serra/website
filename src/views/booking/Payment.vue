<template>
  <v-row justify="center" class="py-4">
    <v-col md="10" xl="7" class="mx-4 d-flex h-100">
      <v-row>
        <v-col>
          <BookingPixForm :paymentId="paymentId" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import BookingPixForm from '@/components/booking/BookingPixForm.vue';

defineProps<{
  paymentId: string,
}>();
</script>
