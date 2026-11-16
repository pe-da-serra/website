<template>
  <v-row justify="center">
    <v-col md="10" xl="7" class="px-sm-10 mt-sm-3">
      <PhotoGallery :images="images" />
      <v-row class="px-8 px-sm-0 mt-1 mb-5" justify="center">
        <v-col cols="12" md="8">
          <h1 class="text-h5 font-weight-medium">Duplo - banheiro compartilhado</h1 >
          <p class="text-subtitle-1">2 hóspedes • 2 camas</p>

          <v-divider class="my-4"/>
          <p class="text-h6 font-weight-medium">Comodidades</p >
          <v-row>
            <v-col>
              <v-list bg-color="background">
                <RoomFeature icon="mdi-bed-queen-outline" text="Cama de casal" />
                <RoomFeature icon="mdi-shower-head" text="Banheiro compartilihado" />
                <RoomFeature icon="mdi-coffee-outline" text="Café da manhã" />
              </v-list>
            </v-col>
            <v-col>
              <v-list bg-color="background">
                <RoomFeature icon="mdi-wifi" text="Rede Wi-Fi" />
                <RoomFeature icon="mdi-television" text="Televisão LED" />
                <RoomFeature icon="mdi-snowflake" text="Ar condicionado" />
              </v-list>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="text-center">
          <!-- <v-btn
            v-if="xs"
            color="primary"
            variant="flat"
            size="large"
            prepend-icon="mdi-calendar-clock"
            text="Reservar"
          /> -->
          <v-card border class="h-">
            <v-card-text class="my-5">
              <p class="text-body-1 font-weight-bold">Reserve antes que esgote!</p>
              <p class="text-subtitle-2 font-weight-light">A reserva online é fácil, rápida e segura.</p>
              <v-btn
                color="primary"
                variant="flat"
                block
                size="x-large"
                prepend-icon="mdi-calendar-clock"
                text="Reservar"
                class="mt-4"
                to="/reserva"
              />
              <v-divider class="my-7"/>
              <v-btn variant="outlined" icon="mdi-whatsapp" class="mr-5"/>
              <v-btn variant="outlined" icon="mdi-phone-outline" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { usePageSeo } from '@/features/seo';
usePageSeo({
  title: 'Quarto Duplo com banheiro compartilhado | Pé da Serra Hotel',
  description: 'Quarto duplo econômico para 2 hóspedes com banheiro compartilhado, café da manhã, Wi-Fi, TV LED e ar-condicionado em Resende (RJ). Reserve online.',
  path: '/quartos/duplo-banheiro-compartilhado',
  image: img1,
});

import PhotoGallery from '@/components/PhotoGallery.vue';
import RoomFeature from '@/components/RoomFeature.vue';
import img1 from "@/assets/double-shared-bathroom-1.jpg";
import img2 from "@/assets/double-shared-bathroom-2.jpg";
import img3 from "@/assets/double-shared-bathroom-3.jpg";
import img4 from "@/assets/double-shared-bathroom-4.jpg";
import img5 from "@/assets/double-shared-bathroom-5.jpg";

const images = [img1, img2, img3, img4, img5];
</script>
