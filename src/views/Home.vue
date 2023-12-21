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
  <v-row justify="center">
    <v-col md="8" xl="6" class="px-8 px-sm-0">
      <v-card class="mx-16 pa-5" style="margin-top: -3rem;">
        <v-form>
          <v-row>
            <v-col cols="7" sm="4">
              <!-- <v-text-field
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
              </v-text-field> -->
              <NumberInput
                v-model="guests"
                label="Hóspedes"
                prepend-icon="mdi-account-multiple-outline"
                variant="outlined"
                hide-details
              />
            </v-col>
            <v-col cols="12" sm="4">
              <!-- <v-text-field
                variant="outlined"
                label="Checkin"
                prepend-icon="mdi-calendar-start-outline"
                hide-details
              /> -->
              <DateInput
                v-model="startDate"
                prepend-icon="mdi-calendar-start-outline"
              />
            </v-col>
            <v-col cols="12" sm="4">
              <!-- <v-text-field
                variant="outlined"
                label="Checkout"
                prepend-icon="mdi-calendar-end-outline"
                hide-details
              /> -->
              <DateInput v-model="endDate" prepend-icon="mdi-calendar-end-outline" />
            </v-col>
            <!-- <v-col cols="12">
              <DateInput v-model="startDate" />
            </v-col> -->
          </v-row>
        </v-form>
        <v-card-actions class="mt-5">
          <v-btn
            block
            variant="flat"
            color="primary"
            text="Reservar"
            size="large"
          />
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useDate, useDisplay } from 'vuetify'
import NumberInput from '@/components/NumberInput.vue'
import DateInput from '@/components/DateInput.vue';

const { smAndDown } = useDisplay()
const dateAdapter = useDate();

const guests = ref(2);
const today = new Date();
today.setHours(0, 0, 0, 0);

const startDate = ref(today);
const endDate = ref(dateAdapter.addDays(today, 1));

var carouselHeight = computed(() => (smAndDown.value ? '40vh' : '50vh'));

</script>
