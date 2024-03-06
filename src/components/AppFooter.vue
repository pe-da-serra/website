<template>
  <img src="../assets/mountain-1-big.svg" class="pt-10" alt="Divisor de seção em formato de montanhas." />
  <v-footer class="py-10" theme="dark" color="#013818" style="margin-top: -1px;">
    <v-row>
      <v-col cols="12" md="4" class="px-8 text-center">
        <img src="../assets/logo-white.svg" style="max-height: 100px;" alt="Logotipo do hotel em branco.">
        <div>
          <v-btn
            class="mx-4"
            icon="mdi-instagram"
            variant="text"
            color="white"
            :href="url.instagram"
            target="_blank"
          />
          <v-btn
            class="mx-4"
            icon="mdi-whatsapp"
            variant="text"
            color="white"
            :href="url.whatsapp"
            target="_blank"
          />
          <v-btn
            class="mx-4"
            icon="mdi-phone-outline"
            variant="text"
            color="white"
            :href="url.phone"
            target="_blank"
          />
        </div>
        <!-- <v-divider class="my-2"/> -->
      </v-col>
      <v-col cols="12" md="4" class="px-8 text-center">
        <p class="text-h6 pb-5">MAPA DO SITE</p>
        <router-link
          v-for="i in menuRoutes"
          :key="i.title"
          :to="{ name: i.route }"
          style="all: unset; cursor: pointer;"
        >
          <p class="mb-2">{{ i.title }}</p>
        </router-link>
      </v-col>
      <v-col cols="12" md="4" class="px-1">
        <p class="text-center text-h6 pb-5">ATENDIMENTO</p>
        <v-row justify="center">
          <v-col cols="1"></v-col>
          <v-col cols="10">
            <a :href="url.phone" target="_blank" class="footer-link">
              <p class="py-1">
                <v-icon icon="mdi-phone-outline" start />
                {{ phone }}
              </p>
            </a>
            <a :href="url.whatsapp" target="_blank" class="footer-link">
              <p class="py-1">
                <v-icon icon="mdi-whatsapp" start />
                {{ whatsapp }}
              </p>
            </a>
            <a :href="url.email" target="_blank" class="footer-link">
              <p class="py-1">
                <v-icon icon="mdi-email-outline" start />
                {{ email }}
              </p>
            </a>
            <a :href="url.address" target="_blank" class="footer-link">
              <p class="pt-1">
                <v-icon icon="mdi-map-marker-outline" start />
                {{ address[0] }}
              </p>
              <p
                v-for="(line, index) in address.filter((l, i) => i !== 0)"
                :key="index"
              >
                <v-icon start />
                {{ line }}
              </p>
            </a>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
import { phone, whatsapp, email, address, url } from '@/features/contact';
import { menuRoutes } from '@/router';

</script>

<style scoped>
.footer-link {
  color: inherit;
  text-decoration: none;
}
</style>
