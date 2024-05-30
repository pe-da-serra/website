<template>
  <v-app id="inspire">
  <v-app-bar scroll-behavior="elevate" elevation="4">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="drawer = !drawer" />
    </template>

    <v-app-bar-title class="text-center">
      <router-link :to="{ name: routeNames.home }">
        <img src="@/assets/logo.svg"
          style="max-height: 60px;"
          class="py-1"
          contain
          alt="Pé da Serra Hotel"
        />
      </router-link>
    </v-app-bar-title>

    <template v-slot:append>
      <!-- <v-btn icon="mdi-dots-vertical"></v-btn> -->
      <v-btn disabled></v-btn>
    </template>

    <template v-slot:extension>
      <v-row class="" justify="center" no-gutters>
        <v-col cols="4" sm="3" md="2" xl="1">
          <DateInput
            v-model="checkinInput"
            :min-date="useToday()"
            label="Entrada"
            variant="outlined"
            density="compact"
            @update:model-value="afterCheckinUpdate"
          />
        </v-col>
        <v-col cols="4" sm="3" md="2" xl="1" class="mx-2">
          <DateInput
            v-model="checkoutInput"
            :min-date="addDays(useToday(), 1)"
            label="Saída"
            variant="outlined"
            density="compact"
            @update:model-value="afterCheckoutUpdate"
          />
        </v-col>
        <v-col cols="2" sm="2" md="1">
          <v-btn
            color="primary"
            variant="elevated"
            block
            class="text-none"
            @click="search"
          >
            <v-icon :start="smAndUp">mdi-magnify</v-icon>
            {{ smAndUp ? 'Buscar' : '' }}
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-app-bar>

  <v-dialog
    v-model="confirmDialog"
    width="auto"
  >
    <v-card
      max-width="400"
      text="Ao alterar as datas de hospedagem, os quartos selecionados serão removidos."
      title="Remover quartos selecionados?"
    >
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="Cancelar"
          variant="plain"
          @click="confirmDialog = false"
        />
        <v-btn
          text="Ok"
          @click="doSearch"
        />
      </template>
    </v-card>
  </v-dialog>

  <app-navigation-drawer v-model="drawer" />

  <v-main>
    <router-view />
  </v-main>

  <app-footer />
</v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useDisplay } from 'vuetify';
import AppFooter from '@/components/AppFooter.vue';
import AppNavigationDrawer from '@/components/AppNavigationDrawer.vue';
import DateInput from '@/components/DateInput.vue';
import { routeNames } from '@/router';
import { DateTime } from 'luxon';
import { addDays, useToday } from '@/features/date';
import { useRoute, useRouter } from 'vue-router';
import { useBooking } from '@/features/booking';
import { BookingPage } from '@/features/booking.types';

const drawer = ref(false);
const confirmDialog = ref(false);

const { smAndUp } = useDisplay();

const route = useRoute();
const router = useRouter();

const { page, selectedRooms, clearRooms } = useBooking();

const checkinInput = ref<DateTime>(DateTime.fromISO(route.query.checkin as string));
const checkoutInput = ref<DateTime>(DateTime.fromISO(route.query.checkout as string));

function afterCheckinUpdate(newCheckin: DateTime) {
  if (checkoutInput.value <= newCheckin) {
    checkoutInput.value = addDays(newCheckin, 1);
  }
}

function afterCheckoutUpdate(newCheckout: DateTime) {
  if (checkinInput.value >= newCheckout) {
    checkinInput.value = addDays(newCheckout, -1);
  }
}

function search() {
  const checkinChanged = route.query.checkin !== checkinInput.value.toISODate();
  const checkoutChanged = route.query.checkout !== checkoutInput.value.toISODate();
  const datesChanged = checkinChanged || checkoutChanged;
  if (datesChanged && selectedRooms.value.length > 0) {
    confirmDialog.value = true;
    return;
  }

  doSearch();
}

function doSearch() {
  confirmDialog.value = false;

  const checkinChanged = route.query.checkin !== checkinInput.value.toISODate();
  const checkoutChanged = route.query.checkout !== checkoutInput.value.toISODate();
  const datesChanged = checkinChanged || checkoutChanged;
  if (!datesChanged) {
    page.value = BookingPage.Search;
    return;
  }

  clearRooms();
  page.value = BookingPage.Search;
  router.push(`/reserva?checkin=${checkinInput.value.toISODate()}&checkout=${checkoutInput.value.toISODate()}`);
}
</script>
