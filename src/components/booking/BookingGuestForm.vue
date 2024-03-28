<template>
  <v-card>
    <v-card-title>Hóspede Principal</v-card-title>
    <v-card-text>
      <v-text-field
        v-model="booking.mainGuest.name"
        variant="outlined"
        label="Nome completo"
      />
      <v-text-field
        v-model="booking.mainGuest.email"
        variant="outlined"
        label="Email"
        type="email"
      />
      <v-text-field
        v-model="booking.mainGuest.phone"
        variant="outlined"
        label="Telefone"
      />
      <v-text-field
        v-model="booking.mainGuest.document"
        variant="outlined"
        label="CPF"
      />
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="booking.page = 'paymentForm'">Continuar</v-btn>
    </v-card-actions>
  </v-card>
  <v-btn class="text-none" @click="booking.page = 'search'">Voltar</v-btn>
</template>

<script setup lang="ts">
import { booking } from '@/features/booking';

</script>
