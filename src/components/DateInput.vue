<template>
  <v-dialog
    fullscreen
    v-model="menu"
    persistent
  >
  <!-- <v-menu
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  > -->
    <template #activator="{ props }">
      <v-text-field
        v-bind="props"
        :model-value="readableDate"
        :variant="variant"
        :label="label"
        :prepend-icon="prependIcon"
        :density="density"
        readonly
        hide-details
      />
    </template>
    <template #default="{ isActive }">
      <!-- <DatePicker
        :model-value="modelValue"
        @update:model-value="selectDate"
        :timezone="timezone"
        :min-date="useToday()"
        mode="date"
        is-required
        locale="pt-br"
        color="green"
      /> -->
      <v-date-picker
        :model-value="modelValue"
        @update:model-value="selectDate"
        :allowed-dates="isDateAllowed"
        hide-header
        color="secondary"
        show-adjacent-months
      />
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import { computed } from 'vue';
import { ref } from 'vue';
import { useDate, useTheme } from 'vuetify/lib/framework.mjs';
import 'v-calendar/style.css';
import { timezone, useToday } from '@/features/date';

const props = defineProps<{
  modelValue: Date,
  minDate?: Date,
  variant?: 'filled' | 'outlined' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled',
  density?: 'default' | 'comfortable' | 'compact',
  label: string | undefined,
  prependIcon?: string | undefined,
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
