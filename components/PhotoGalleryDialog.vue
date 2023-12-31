<template>
  <v-dialog
    :model-value="open"
    @update:model-value="$emit('update:open', $event)"
    eager
    fullscreen
    :class="open ? 'bg-black' : ''"
  >
    <v-row
      v-if="xs || mdAndUp"
      justify="center"
      align="center"
      class="pt-5 mx-0"
    >
      <v-col cols="3" class="pa-0 pl-6">
        <v-btn
          v-if="xs"
          icon="mdi-chevron-left"
          variant="plain"
          color="white"
          @click="close"
        />
        <v-btn
          v-if="mdAndUp"
          variant="text"
          color="white"
          prepend-icon="mdi-close"
          @click="close"
        >
          Fechar
        </v-btn>
      </v-col>
      <v-col cols="6" class="pa-0 text-center">
        {{ index + 1 }} / {{ images.length }}
      </v-col>
      <v-col cols="3" class="pa-0"></v-col>
    </v-row>
    <v-row class="h-100 ma-0" align="center">
      <v-col
        v-if="sm"
        sm="2"
        align-self="start"
      >
        <v-btn
          icon="mdi-chevron-left"
          variant="plain"
          color="white"
          @click="close"
        />
      </v-col>
      <v-col sm="8" md="12" class="pa-0">
        <v-carousel
          hide-delimiters
          :show-arrows="!smAndDown"
          :model-value="index"
          @update:model-value="$emit('update:index', $event)"
          touch
          class="pa-0 ma-0"
        >
          <v-carousel-item
            v-for="image in images"
            :key="image"
            :src="image"
            height="100vh"
          />
          <template #prev="{ props }">
            <v-btn
              variant="outlined"
              color="white"
              icon="mdi-chevron-left"
              @click="props.onClick"
            />
          </template>
          <template #next="{ props }">
            <v-btn
              variant="outlined"
              color="white"
              icon="mdi-chevron-right"
              @click="props.onClick"
            />
          </template>
        </v-carousel>
      </v-col>
    </v-row>
  </v-dialog>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";

defineProps<{
  open: boolean,
  images: string[],
  index: number,
}>();
const emit = defineEmits(["update:open", "update:index"]);

const { xs, sm, smAndDown, mdAndUp } = useDisplay()

function close() {
  emit('update:open', false)
}
</script>
