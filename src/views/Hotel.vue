<template>
  <v-row justify="center" class="pt-3">
    <v-col cols="12" class="text-center bg-secondary py-10">
      <p class="text-h3 font-weight-thin">O HOTEL</p>
      <v-divider length="100" thickness="2" color="white" class="mt-4 mx-auto border-opacity-75"></v-divider>
    </v-col>
  </v-row>
  <v-row justify="center" class="py-4">
    <v-col md="10" xl="7" class="px-8 px-sm-0">
      <v-row align="center">
        <v-col cols="12" md="6">
          <p class="text-h4 font-weight-light mt-4">
            Sobre nós
          </p>
          <v-divider length="100" thickness="1" class="mt-1 mb-4 border-opacity-75"></v-divider>
          <p class="text-justify pt-2">
            Localizado no coração de Resende, o <b>Pé da Serra Hotel</b> é ideal para quem vem trabalhar em Resende, Porto Real ou Itatiaia.
            Em poucos passos, você pode encontrar diversas opções de restaurantes, supermercados, lojas e academias.
          </p>
          <p class="text-justify pt-2">
            A menos de 500m da AMAN (Academia Militar das Agulhas Negras), o hotel é um excelente ponto de hospedagem para oficiais do exército e seus parentes.
          </p>
          <p class="text-justify pt-2">
            Também é ponto de partida perfeito para descobrir as belezas naturais da região da Serra da Mantiqueira como Penedo, Parque Nacional de Itatiaia e Pico das Agulhas Negras.
          </p>
          <p class="text-justify pt-2">
            O <b>Pé da Serra Hotel</b> foi recentemente reformado para oferecer todo conforto aos seus hóspedes, disponibilizando quartos de solteiro, casal, duplo e triplo que cabem no seu bolso.
          </p>
        </v-col>
        <v-col cols="12" md="6" class="px-0 px-md-3">
          <v-carousel>
            <v-carousel-item
              v-for="img in images"
              :key="img"
              :src="img"
              :lazy-src="lazyImg"
              height="100%"
              cover
            />
          </v-carousel>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row justify="center" class="py-4 bg-white">
    <v-col md="10" xl="7" class="px-8 px-sm-0">
      <p class="text-h4 font-weight-light">
        Infraestrutura
      </p>
      <v-divider length="100" thickness="1" class="mt-1 mb-4 border-opacity-75"></v-divider>
      <v-row>
        <v-col cols="12" md="6" class="pb-0 pb-md-3">
          <v-list class="pb-0 pb-md-2">
            <v-list-item>
              <v-icon start color="secondary">mdi-wifi</v-icon>
              Rede Wi-Fi
            </v-list-item>
            <v-list-item>
              <v-icon start color="secondary">mdi-coffee-outline</v-icon>
              Café da manhã
            </v-list-item>
            <v-list-item>
              <v-icon start color="secondary">mdi-snowflake</v-icon>
              Ar condicionado
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="6" class="pt-0 pt-md-3">
          <v-list class="pt-0 pt-md-2">
            <v-list-item>
              <v-icon start color="secondary">mdi-hours-24</v-icon>
              Recepção 24h
            </v-list-item>
            <v-list-item>
              <v-icon start color="secondary">mdi-cctv</v-icon>
              Monitoramento por câmeras
            </v-list-item>
            <v-list-item>
              <v-icon start color="secondary">mdi-map-marker-star-outline</v-icon>
              Localização central
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-col cols="auto" class="text-center py-16">
      <p class="text-h4">Reserve agora mesmo!</p>
      <p class="text-h6 font-weight-light">A reserva online é fácil, rápida e segura.</p>
      <v-btn
        color="primary"
        variant="flat"
        size="x-large"
        prepend-icon="mdi-calendar-clock"
        text="Reservar"
        class="mt-8"
        to="/reserva"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useHead } from '@unhead/vue'
useHead({
  title: 'Pé da Serra Hotel',
  meta: [
    {
      name: 'description',
      content: 'Sobre o hotel e sua infraestrutura.',
    },
  ],
});

import { lazyImg } from '@/features/image';
import hotel1 from '@/assets/hotel-1.jpg';
import hotel2 from '@/assets/hotel-2.jpg';

const images = [ hotel1, hotel2 ];

</script>
