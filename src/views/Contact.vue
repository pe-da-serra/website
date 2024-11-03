<template>
  <!-- <v-row justify="center" class="pt-3">
    <v-col cols="12" class="text-center bg-secondary py-10">
      <p class="text-h3 font-weight-thin">CONTATO</p>
      <v-divider length="100" thickness="2" color="white" class="mt-4 mx-auto border-opacity-75"></v-divider>
    </v-col>
  </v-row> -->
  <v-row class="pt-3">
    <v-col cols="12" lg="4" offset-lg="2" class="pr-0 py-10">
      <div class="h-100 d-flex flex-column justify-space-evenly px-7">
        <div class="text-center">
          <p class="text-h4">Contato</p>
          <v-divider length="100" class="mx-auto mt-4"/>
        </div>
        <div class="d-flex">
          <v-spacer />
          <div>
            <a :href="url.phone" target="_blank" class="contact-link">
              <p class="py-2">
                <v-icon icon="mdi-phone-outline" color="secondary" start />
                {{ phone }}
              </p>
            </a>
            <a :href="url.whatsapp" target="_blank" class="contact-link">
              <p class="py-2">
                <v-icon icon="mdi-whatsapp" color="secondary" start />
                {{ whatsapp }}
              </p>
            </a>
            <a :href="url.email" target="_blank" class="contact-link">
              <p class="py-2">
                <v-icon icon="mdi-email-outline" color="secondary" start />
                {{ email }}
              </p>
            </a>
            <a :href="url.address" target="_blank" class="contact-link" >
              <p class="pt-2">
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
          </div>
          <v-spacer />
        </div>
      </div>
    </v-col>
    <v-col cols="12" lg="6" class="pa-0" style="height: 50vh;">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.0951394226545!2d-44.45068542394605!3d-22.463058822164943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9e7e9a9d90dee1%3A0xad22210199efec59!2sR.%20Lu%C3%ADs%20Pistarini%2C%2043%20-%20Campos%20El%C3%ADseos%2C%20Resende%20-%20RJ%2C%2027542-090!5e0!3m2!1spt-BR!2sbr!4v1708193734693!5m2!1spt-BR!2sbr"
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
import { useHead } from '@unhead/vue'
useHead({
  title: 'Pé da Serra Hotel',
  meta: [
    {
      name: 'description',
      content: 'Informações de contato e localização do hotel.',
    },
  ],
});

import { phone, whatsapp, email, address, url } from '@/features/contact';
</script>

<style scoped>
.contact-link {
  color: inherit;
  text-decoration: none;
}
</style>
