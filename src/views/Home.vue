<template>
  <v-carousel
    hide-delimiters
    show-arrows="hover"
    touch
    cycle
    :height="carouselHeight"
  >
    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
      position="50% 50%"
      cover
    />
    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      position="50% 50%"
      cover
    />
    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      position="50% 50%"
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
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()

var carouselHeight = computed(() => (smAndDown.value ? '40vh' : '50vh'));

</script>
