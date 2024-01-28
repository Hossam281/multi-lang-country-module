<template>
    <div class="w-full mx-auto ml-3 gap-4  mt-5 grid grid-cols-1 md:grid-cols-4">
        <Card v-for="country in data" :key="country.id" :country="country" />
    </div>
</template>

<script setup>
import Card from "./Card.vue";
defineProps({
  data: {
    type: Array,
    required: true
  }
});

</script>

