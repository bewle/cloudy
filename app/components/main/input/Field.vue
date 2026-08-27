<script lang="ts" setup>
const { inputField } = useInputForm()
</script>

<template>
  <input
    v-model="inputField"
    class="h-main-input-field-h ps-2 font-medium text-sm w-full outline-none"
    placeholder="https://soundcloud.com/pilarsierra/dewey-a2a"
  />
</template>
