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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem nisi aperiam, doloremque libero dolorem hic deleniti maiores! Ipsam fuga libero, id culpa mollitia quas placeat. Dolorem eius obcaecati laboriosam velit?
          </p>
          <p class="text-justify pt-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste itaque saepe molestias ullam dignissimos suscipit voluptate delectus quo sunt placeat, perspiciatis quaerat assumenda voluptas accusantium, incidunt quibusdam nobis repellendus est!
          </p>
          <p class="text-justify pt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo ipsum facere omnis quibusdam earum, aliquid molestiae beatae modi, rerum provident, ex deleniti laudantium quis nemo esse odit ea autem id?
          </p>
        </v-col>
        <v-col cols="12" md="6" class="px-0 px-md-3">
          <v-carousel>
            <v-carousel-item
              v-for="img in images"
              :key="img"
              :src="img"
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
              <v-icon start color="secondary">mdi-car-outline</v-icon>
              Estacionamento
            </v-list-item>
            <v-list-item>
              <v-icon start color="secondary">mdi-wifi</v-icon>
              Rede Wi-Fi
            </v-list-item>
            <v-list-item>
              <v-icon start color="secondary">mdi-coffee-outline</v-icon>
              Café da manhã
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
        prepend-icon="mdi-calendar-outline"
        text="Reservar"
        class="mt-8"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
definePageMeta({
  menuOrder: 2,
  title: 'Hotel',
  icon: 'mdi-domain',
})


import img1 from '@/assets/example/img-1.jpg';
import img2 from '@/assets/example/img-2.jpg';
import img3 from '@/assets/example/img-3.jpg';

const images = [ img1, img2, img3 ];

</script>
