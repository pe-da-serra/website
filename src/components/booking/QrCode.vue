<template>
  <img :src="qrCodeData" />
</template>

<script setup lang="ts">
import qrCode from 'qrcode';
import { computedAsync } from '@vueuse/core'

const props = defineProps<{ value: string }>();

const qrCodeData = computedAsync(
  async () => await qrCode.toDataURL(props.value),
  '',
);
</script>
