<script setup>
const settings = useSettings().settings;
</script>

<template>
  <div class="prose mt-5">
    <h2>Clients</h2>
  </div>
  <div class="divider opacity-50"></div>
  <div class="grid grid-cols-2 gap-5">
    <div>
      <SettingsFormat entity="clients" />
      <div class="divider"></div>
    </div>

    <div class="text-center prose"></div>
  </div>
</template>
