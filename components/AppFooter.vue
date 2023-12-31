<template>
  <img src="../assets/mountain-1-big.svg" class="pt-10" alt="Divisor de seção em formato de montanhas." />
  <v-footer class="py-10" theme="dark" color="#293F00" style="margin-top: -1px;">
    <v-row>
      <v-col cols="12" md="4" class="px-8 text-center">
        <img src="../assets/logo-white.svg" style="max-height: 100px;" alt="Logotipo do hotel em branco.">
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
        <p class="text-h6 pb-5">MAPA DO SITE</p>
        <router-link
          v-for="i in menuRoutes"
          :key="i.name"
          :to="i"
          style="all: unset; cursor: pointer;"
        >
          <p class="mb-2">{{ i.meta.title }}</p>
        </router-link>
      </v-col>
      <v-col cols="12" md="4" class="px-8">
        <p class="text-center text-h6 pb-5">ATENDIMENTO</p>
        <v-row justify="center">
          <v-col cols="10">
            <p class="py-1">
              <v-icon icon="mdi-phone-outline" start />
              (24) 3355-1234
            </p>
            <p class="py-1">
              <v-icon icon="mdi-whatsapp" start />
              (24) 98765-4321
            </p>
            <p class="py-1">
              <v-icon icon="mdi-email-outline" start />
              reserva@pedaserrahotel.com.br
            </p>
            <p class="pt-1">
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
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup lang="ts">
const menuRoutes = ref(
  useRouter()
    .getRoutes()
    .filter((i) => i.meta.menuOrder !== undefined)
    .sort((a, b) => a.meta.menuOrder - b.meta.menuOrder)
)
</script>
