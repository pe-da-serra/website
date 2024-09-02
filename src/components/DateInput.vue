<template>
  <v-text-field
    v-if="xs"
    v-bind="props"
    :model-value="readableDate"
    :variant="variant"
    :label="label"
    :prepend-icon="prependIcon"
    :density="density"
    readonly
    hide-details
  >
    <v-dialog
      activator="parent"
      fullscreen
    >
      <template v-slot:default="{ isActive }">
        <v-date-picker
          :model-value="model.toJSDate()"
          @update:model-value="selectDate($event, isActive)"
          :min="minDate?.toISODate()"
          color="secondary"
          show-adjacent-months
        />
      </template>
    </v-dialog>
  </v-text-field>

  <v-text-field
    v-else
    v-bind="props"
    :model-value="readableDate"
    :variant="variant"
    :label="label"
    :prepend-icon="prependIcon"
    :density="density"
    readonly
    hide-details
  >
    <v-menu
      activator="parent"
      :close-on-content-click="false"
      transition="scale-transition"
      location="bottom"
    >
      <template v-slot:default="{ isActive }">
        <v-date-picker
          :model-value="model.toJSDate()"
          @update:model-value="selectDate($event, isActive)"
          :min="minDate?.toISODate()"
          color="secondary"
          show-adjacent-months
          hide-header
        />
      </template>
    </v-menu>
  </v-text-field>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ref } from 'vue';
import { useDate } from 'vuetify';
import { DateTime } from 'luxon';
import { useDisplay } from 'vuetify';
import { Ref } from 'vue';

const props = defineProps<{
  minDate?: DateTime,
  variant?: 'filled' | 'outlined' | 'plain' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled',
  density?: 'default' | 'comfortable' | 'compact',
  label: string | undefined,
  prependIcon?: string | undefined,
}>();
const model = defineModel<DateTime>({ required: true });

const { xs } = useDisplay();
const readableDate = computed(() =>  model.value.setLocale('pt-BR').toLocaleString());

function selectDate(event: Date, isActive: Ref<boolean>): void {
  model.value = DateTime.fromJSDate(event);
  isActive.value = false;
}

function isDateAllowed(date: Date): boolean {
  if (!props.minDate) return true;

  return date >= props.minDate.toJSDate();
}
</script>
