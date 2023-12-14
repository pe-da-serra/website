<template>
  <v-app id="inspire">
    <v-app-bar scroll-behavior="elevate">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title class="text-center">Hotel Pé da Serra</v-app-bar-title>
      <v-btn variant="outlined">Reservar</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item prepend-icon="mdi-calendar-outline">Reservar</v-list-item>
        <v-list-item prepend-icon="mdi-domain">O Hotel</v-list-item>
        <v-list-item prepend-icon="mdi-bed-outline">Quartos</v-list-item>
        <v-list-item prepend-icon="mdi-image-multiple-outline">Galeria</v-list-item>
        <v-list-item prepend-icon="mdi-phone-outline">Contato</v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-carousel hide-delimiters show-arrows="hover">
        <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
        cover
        />
        <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
        />
        <v-carousel-item
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover
        />
      </v-carousel>
      <v-container>
        <v-card class="mx-16 pa-5" style="margin-top: -2.5rem;">
          <v-form>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  label="Hóspedes"
                  model-value="2"
                  prepend
                  prepend-icon="mdi-account-multiple-outline"
                >
                  <template v-slot:prepend-inner>
                    <v-btn variant="outlined" icon="mdi-minus" size="xs" />
                  </template>
                  <template v-slot:append-inner>
                    <v-btn variant="outlined" icon="mdi-plus" size="xs" />
                  </template>
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  variant="outlined"
                  label="Entrada e Saída"
                  prepend-icon="mdi-calendar-range-outline"
                />
              </v-col>
            </v-row>
            <!-- <v-row justify="center" class="mt-0 px-4 pb-2">
              <v-btn block color="primary">Reservar</v-btn>
            </v-row> -->
            <!-- <v-date-picker></v-date-picker> -->
          </v-form>
          <v-card-actions>
            <v-btn block variant="flat" color="primary">Reservar</v-btn>
          </v-card-actions>
        </v-card>
        <!-- <HelloWorld /> -->
      </v-container>
    </v-main>
    <v-footer class="bg-green-darken-4 py-8">
      <v-row>
        <v-col cols="12" md="4" class="px-8">
          <p class="text-center text-h5">
            Pé da Serra Hotel
          </p>
          <v-divider class="my-2"/>
          <v-btn
            class="mx-4"
            icon="mdi-instagram"
            variant="text"
          />
          <v-btn
            class="mx-4"
            icon="mdi-whatsapp"
            variant="text"
          />
          <v-btn
            class="mx-4"
            icon="mdi-phone-outline"
            variant="text"
          />
        </v-col>
        <v-col cols="12" md="4" class="px-8">
          <p class="text-h6 pb-5">Mapa do site</p>
          <p>Home</p>
          <p>O Hotel</p>
          <p>Quartos</p>
          <p>Galeria</p>
          <p>Contato</p>
        </v-col>
        <v-col cols="12" md="4" class="px-8">
          <p class="text-h6 pb-5">Atendimento</p>
          <p>
            <v-icon icon="mdi-phone-outline" size="small" />
            (24) 3355-1234
          </p>
          <p>
            <v-icon icon="mdi-whatsapp" size="small" />
            (24) 98765-4321
          </p>
          <p class="text-caption">
            <v-icon icon="mdi-email-outline" size="large" />
            reservas@pedaserrahotel.com.br
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue';

const drawer = ref(false);
</script>

