<template>
  <div class="px-1">
    <p v-if="label" class="text-caption">{{ label }}</p>
    <div class="number-input d-flex justify-center align-center">
      <v-icon color="secondary" class="ma-1" @click="decrease">
        mdi-minus
      </v-icon>
      <span class="px-2">{{  modelValue  }}</span>
      <v-icon color="secondary" class="ma-1" @click="increase">
        mdi-plus
      </v-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: number,
  min: number,
  max: number,
  label?: string,
  disabled?: boolean, // TODO: implement disabled on this input
}>();
const emit = defineEmits(['update:model-value']);


function decrease() {
  emit('update:model-value', Math.max(props.min, (props.modelValue) - 1));
}

function increase() {
  emit('update:model-value', Math.min(props.max, (props.modelValue) + 1));
}
</script>

<style scoped>
.number-input {
  border: 1px solid rgb(118, 118, 118, 0.87);
  border-radius: 16px;
  display: inline-block;
}
</style>
