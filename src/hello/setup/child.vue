<template>
  <div>
    this is {{ name }} child component!
  </div>
</template>

<script setup>
defineProps({
  name: String
})
</script>
