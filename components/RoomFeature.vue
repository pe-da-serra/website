<template>
  <v-list-item class="px-1">
    <v-icon start color="secondary">{{ icon }}</v-icon>
    {{ text }}
  </v-list-item>
</template>

<script setup lang="ts">
defineProps<{
  icon: string,
  text: string,
}>();
</script>
