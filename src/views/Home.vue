<template>
  <div class=" w-[90%] mx-auto">
    <CountriesList v-if="dataAPI.length>0" :data="dataAPI" />
    <div  class="w-full mt-5">
      <h1 v-if="!isLoading&&dataAPI.length===0" class="text-3xl font-bold text-center">{{$t('noCountries')}}</h1>
      <h1 v-if="isLoading" class="text-3xl font-bold text-center">{{$t('Loading')}}</h1>
    </div>

    <DialogForm :data="dataAPI" />
     </div>
</template>

<script setup>
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { onMounted, ref } from "vue";
import CountriesList from "@/components/CountriesList.vue";
import DialogForm from "@/components/DialogForm.vue";

const dataAPI = ref([]);
const isLoading = ref(true);
onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "countries"));
  querySnapshot.forEach((country) => {
    dataAPI.value.push({ ...country.data(), id: country.id })
    
  });
  isLoading.value = false
});
</script>
