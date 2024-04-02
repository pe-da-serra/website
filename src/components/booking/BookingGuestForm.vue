<template>
  <v-card>
    <v-card-item>
      <v-btn variant="text" class="text-none" @click="booking.page = 'search'">
        <v-icon start>mdi-arrow-left</v-icon>
        Voltar
      </v-btn>
      <v-card-title>Hóspede principal</v-card-title>
    </v-card-item>    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field
            v-model="booking.mainGuest.name"
            variant="outlined"
            label="Nome completo"
          />
        </v-col>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field
            v-model="booking.mainGuest.email"
            variant="outlined"
            label="Email"
            type="email"
          />
        </v-col>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field
            v-model="booking.mainGuest.phone"
            variant="outlined"
            label="Telefone"
          />
        </v-col>
        <v-col cols="12" md="6" class="pb-0">
          <v-text-field
            v-model="booking.mainGuest.document"
            variant="outlined"
            label="CPF"
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn @click="booking.page = 'paymentForm'">Continuar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { booking } from '@/features/booking';

</script>
