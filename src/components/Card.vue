<template>
    <div class="w-full p-3 overflow-clip  flex h-[400px] flex-col gap-4 text-white bg-[#393E46] rounded-lg shadow-xl shadow-[#00adb5] ">
        <h1 class="text-3xl font-semibold text-center">{{ country.name ? country.name : "No name provided" }}</h1>
        <h4 class="text-xl font-mono">{{ $t('Population') }}: {{ country.population ? country.population : "No population provided" }}</h4>
        <h4 class="text-xl font-mono">{{$t('Capital')}}: {{ country.capital ? country.capital : "No capital provided" }}</h4>
        <p class="text-md overflow-clip font-mono h-[70%]">{{ country.details ? country.details : $t('NoDetails') }}</p>
        <router-link :to="`/details/${country.id}`" class="w-full bg-[#00adb5]  rounded-lg text-center py-2 font-semibold text-lg hover:opacity-40 transition-opacity duration-300">{{ $t('ViewDetails') }}</router-link>
        <div class="w-full flex items-center justify-evenly ">
            <faIcon @click="handleDelete(country.id)" class="cursor-pointer hover:scale-105 transition-all duration-300" :icon="['fas', 'trash']" />
            <faIcon @click="handleEdit(country)" class="cursor-pointer hover:scale-105 transition-all duration-300" :icon="['fas', 'edit']" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    country: Object
})
import { useCountriesStore } from "@/stores/countries";
import { doc,deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import {useToast} from "vue-toastification";
const toast = useToast();

const countriesStore = useCountriesStore();
const handleEdit = (country) => {
    countriesStore.setEditableCountry(country);
    countriesStore.editModal();
}
const handleDelete = async (id) => {
    await deleteDoc(doc(db, "countries", id));
    toast.success("Country deleted successfully");
    
    setTimeout(() => {
        window.location.reload();
    },1000)
}
</script>

