<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template #activator="{ props }">
      <v-text-field
        v-bind="props"
        :model-value="readableDate"
        :variant="variant"
        :label="label"
        :prepend-icon="prependIcon"
        readonly
        hide-details
      />
    </template>

    <v-date-picker
      :model-value="modelValue"
      @update:model-value="selectDate"
      :allowed-dates="isDateAllowed"
      hide-header
      color="secondary"
      show-adjacent-months
    />
  </v-menu>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ref } from 'vue';
import { useDate } from 'vuetify/lib/framework.mjs';

const props = defineProps<{
  modelValue: Date,
  minDate?: Date,
  variant: 'filled' | 'outlined' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled' | undefined,
  label: string | undefined,
  prependIcon: string | undefined,
}>();
const emit = defineEmits(['update:model-value']);

const menu = ref(false);

const dateAdapter = useDate();
const readableDate = computed(() =>  dateAdapter.format(props.modelValue, 'keyboardDate'));

function selectDate(event: Date): void {
  emit('update:model-value', event);
  menu.value = false;
}

function isDateAllowed(date: Date): boolean {
  if (!props.minDate) return true;

  return date >= props.minDate;
}
</script>
