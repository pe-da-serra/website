<template>
  <div>
    <v-card min-width="200" width="250" max-width="300" :to="{ name: route }">
      <v-img
        cover
        height="200"
        :src="image"
      ></v-img>

      <v-card-item>
        <v-card-title>{{ title }}</v-card-title>

        <v-card-subtitle>
          <span class="me-1">{{ guests }} hóspedes • {{ beds }} cama</span>
        </v-card-subtitle>
      </v-card-item>

      <!-- <v-card-text>
        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
      </v-card-text> -->

      <v-card-actions >
        <v-spacer />
        <v-btn color="primary" variant="text" :to="{ name: route }">
          Saiba mais
        </v-btn>
        <v-spacer />

      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string,
  guests: number,
  beds: number,
  image: string|undefined,
  route: string,
}>();
</script>
