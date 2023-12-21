<template>
  <v-text-field
    v-bind="$attrs"
    type="number"
    class="hide-arrows align-center"
    inputmode="numeric"
    @update:model-value="$emit('update:model-value', $event)"
    :model-value="modelValue"
    readonly
    center-affix
  >
    <template #prepend-inner>
      <v-icon @click="decrease">mdi-minus</v-icon>
    </template>
    <template #append-inner>
      <v-icon @click="increase">mdi-plus</v-icon>
    </template>
  </v-text-field>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: Number,
  min: Number,
  max: Number,
})
const emit = defineEmits(['update:model-value']);


function decrease() {
  emit('update:model-value', Math.max(props.min ?? 0, (props.modelValue ?? 0) - 1));
}

function increase() {
  emit('update:model-value', Math.min(props.max ?? 10, (props.modelValue ?? 0) + 1));
}
</script>

<style scoped>
.hide-arrows{
  -webkit-outer-spin-button,
  -webkit-inner-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  }
  appearance: textfield;
  -moz-appearance: textfield;
}

.align-center :deep(input) {
  text-align: center
}
</style>
