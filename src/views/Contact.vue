<template>
  <!-- <v-row justify="center" class="pt-3">
    <v-col cols="12" class="text-center bg-secondary py-10">
      <p class="text-h3 font-weight-thin">CONTATO</p>
      <v-divider length="100" thickness="2" color="white" class="mt-4 mx-auto border-opacity-75"></v-divider>
    </v-col>
  </v-row> -->
  <v-row class="pt-3">
    <v-col cols="12" lg="4" offset-lg="2" class="pr-0">
      <div class="h-100 d-flex flex-column justify-space-evenly px-7">
        <div class="text-center">
          <p class="text-h4">Contato</p>
          <v-divider length="100" class="mx-auto mt-4"/>
        </div>
        <div class="d-flex">
          <v-spacer />
          <div>
            <p class="py-2">
              <v-icon icon="mdi-phone-outline" start />
              (24) 3355-1234
            </p>
            <p class="py-2">
              <v-icon icon="mdi-whatsapp" start />
              (24) 98765-4321
            </p>
            <p class="py-2">
              <v-icon icon="mdi-email-outline" start />
              reserva@pedaserrahotel.com.br
            </p>
            <p class="pt-2">
              <v-icon icon="mdi-map-marker-outline" start />
              Rua Luís Pistarini, 43
            </p>
            <p>
              <v-icon start />
              Campos Elíseos, Resende - RJ
            </p>
            <p>
              <v-icon start />
              27542-090
            </p>
          </div>
          <v-spacer />
        </div>
      </div>
    </v-col>
    <!-- <v-col cols="12" lg="3" class="pl-0">
      <div class="h-100 d-flex flex-column justify-space-evenly px-7">
        <div class="text-center">
          <p class="text-h4">Localização</p>
          <v-divider length="100" class="mx-auto mt-4"/>
        </div>
        <div class="d-flex">
          <v-spacer />
          <div>
            <p class="py-1">
              <v-icon icon="mdi-map-marker-outline" start />
              Rua Luís Pistarini, 43
            </p>
            <p class="py-1">
              <v-icon start />
              Campos Elíseos, Resende - RJ
            </p>
            <p class="py-1">
              <v-icon start />
              27542-090
            </p>
          </div>
          <v-spacer />
        </div>
      </div>
    </v-col> -->
    <v-col cols="12" lg="6" class="pa-0" style="height: 50vh;">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7374.1661184159375!2d-44.4525732524744!3d-22.46351284423203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9e7e9077b3a101%3A0x3e84f2592afb26ae!2sHotel%20Presidente%20de%20Resende!5e0!3m2!1spt-BR!2sbr!4v1702791207455!5m2!1spt-BR!2sbr"
        width="100%"
        height="100%"
        style="border: 0; border-left: solid 0.1px grey;"
        allowfullscreen="false"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify/lib/framework.mjs';

const { xs, sm, md, lg, xl } = useDisplay();
</script>
