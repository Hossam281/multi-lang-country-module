<template>
    <div class="w-[90%] mx-auto flex gap-7 flex-col mt-4">
        <h1 class="text-3xl font-bold text-center">{{ data.name }}</h1>
        <h4 class="text-2xl font-sans"><span class="font-bold">{{$t('Population')}}:</span> <br/> {{ data.population }}</h4>
        <h4 class="text-2xl font-sans"><span class="font-bold">{{$t('Capital')}}:</span> <br/> {{ data.capital }}</h4>
        <p class="text-md overflow-cl2ip font-sans h-[70%]"><span class="font-bold text-2xl">{{$t('Details')}}:</span> <br/> {{ data.details ? data.details : $t('NoDetails') }}</p>

    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
const route = useRoute();
const data = ref({});
const id = route.params.id;

onMounted(async () => {
    const docRef = doc(db, "countries", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        data.value = docSnap.data();
    }
    
    
})
</script>

