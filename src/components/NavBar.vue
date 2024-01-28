<template>
  <header class="w-full shadow-xl bg-[#222831]">
    <nav class="flex p-3 justify-between items-center w-full" :dir="$i18n.locale==='ar'?'rtl':'ltr'">
      <router-link
        to="/"
        class="text-lg sm:text-3xl hover:scale-105 transition-transform duration-500 cursor-pointer font-bold text-[#00ADB5]"
      >
        {{ $t('CountryModule') }}
      </router-link>
      <div class="flex item gap-3">
        <button
          @click="countriesStore.openModal()"
          class="rounded-full sm:rounded-lg hover:opacity-45 transition-opacity duration-300 py-2 px-4 text-center text-sm md:text-lg font-semibold bg-[#00adb5] text-[#eeeeee]"
        >
          <span class="hidden sm:inline mr-2">{{$t('AddCountry')}}</span>
          <faIcon icon="fa-solid fa-plus" />
        </button>
        <DropDown />
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
import DropDown from "./DropDown.vue";
import { useCountriesStore } from "@/stores/countries";

const countriesStore = useCountriesStore();

const router = useRouter();
</script>
