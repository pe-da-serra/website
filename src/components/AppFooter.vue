<template>
  <img src="../assets/mountain-1.svg" />
  <v-footer class="py-15" theme="dark" color="#293F00" style="margin-top: -1px;">
    <v-row>
      <v-col cols="12" md="4" class="px-8 text-center">
        <p class="text-h5 mb-2">
          Pé da Serra Hotel
        </p>
        <div>
          <v-btn
            class="mx-4"
            icon="mdi-instagram"
            variant="text"
            color="white"
          />
          <v-btn
            class="mx-4"
            icon="mdi-whatsapp"
            variant="text"
            color="white"
          />
          <v-btn
            class="mx-4"
            icon="mdi-phone-outline"
            variant="text"
            color="white"
          />
        </div>
        <!-- <v-divider class="my-2"/> -->
      </v-col>
      <v-col cols="12" md="4" class="px-8 text-center">
        <p class="text-h6 pb-5">Mapa do site</p>
        <router-link
          v-for="i in menuRoutes"
          :key="i.title"
          :to="{ name: i.route }"
          style="all: unset; cursor: pointer;"
        >
          <p class="mb-2">{{ i.title }}</p>
        </router-link>
      </v-col>
      <v-col cols="12" md="4" class="px-8">
        <p class="text-center text-h6 pb-5">Atendimento</p>
        <v-row>
          <v-col offset="3" cols="9" offset-md="1" md="12" offset-lg="3" lg="9">
            <v-icon icon="mdi-phone-outline" size="small" start />
            <span>(24) 3355-1234</span><br>
            <v-icon icon="mdi-whatsapp" size="small" start />
            <span>(24) 98765-4321</span><br>
            <v-icon icon="mdi-email-outline" size="small" start />
            <span>reserva@pedaserrahotel.com.br</span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
import { menuRoutes } from '@/router';

</script>
