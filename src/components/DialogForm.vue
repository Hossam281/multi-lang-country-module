<template>
  <TransitionRoot appear :show="countriesStore.isOpen" as="template">
    <Dialog as="div" @close="countriesStore.closeModal()" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-[90%] max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                {{ countriesStore.isEdit ? $t('EditCountry') : $t('AddCountry') }}
              </DialogTitle>
              <div class="mt-2">
                <form @submit.prevent="addOrUpdate" action="#" method="post">
                  <div class="mb-4">
                    <label
                      for="name"
                      class="block text-gray-700 text-sm font-bold mb-2"
                      >{{$t('Name')}}</label
                    >
                    <input
                      v-model="country.name"
                      type="text"
                      id="name"
                      name="name"
                      class="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      for="capital"
                      class="block text-gray-700 text-sm font-bold mb-2"
                      >{{$t('Capital')}}</label
                    >
                    <input
                      v-model="country.capital"
                      type="text"
                      id="capital"
                      name="capital"
                      class="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      for="population"
                      class="block text-gray-700 text-sm font-bold mb-2"
                      >{{$t('Population')}}</label
                    >
                    <input
                      v-model="country.population"
                      type="number"
                      id="population"
                      name="population"
                      class="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                    />
                  </div>

                  <div class="mb-4">
                    <label
                      for="confirmPassword"
                      class="block text-gray-700 text-sm font-bold mb-2"
                      >{{$t('Details')}}</label
                    >
                    <textarea
                      v-model="country.details"
                      class="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>
                  <div class="mt-4 flex justify-evenly">
                    <button
                      type="submit"
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      {{ countriesStore.isEdit ? $t('EditCountry'): $t('AddCountry') }} 
                    </button>
                    <button
                      type="button"
                      class="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:opacity-40 transition-opacity duration-300"
                      @click="cancel"
                    >
                      {{ $t('Cancel') }}
                    </button>
                  </div>
                </form>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
defineProps({
  data: Object,
});
import { useCountriesStore } from "@/stores/countries";
import { ref, onMounted, watch } from "vue";
import { db } from "@/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { useToast } from "vue-toastification";
const toast = useToast();

const country = ref({
  name: "",
  capital: "",
  population: "",
  details: "",
});

const countriesStore = useCountriesStore();

const cancel = () => {
  countriesStore.closeModal();
  country.value = {};
};
onMounted(() => {
  if (countriesStore.editableCountry) {
    country.value = countriesStore.editableCountry;
    console.log(country.value);
  }
});
watch(
  () => countriesStore.editableCountry,
  (newEditableCountry) => {
    if (newEditableCountry) {
      country.value = newEditableCountry;
    }
  }
);
const addOrUpdate = async () => {
  if (
    !country.value.name ||
    !country.value.capital ||
    !country.value.population
  ) {
    toast.error("All fields are required");
    return;
  }
  if (countriesStore.isEdit) {
    await updateDoc(doc(db, "countries", countriesStore.editableCountry.id), {
      name: country.value.name,
      capital: country.value.capital,
      population: country.value.population,
      details: country.value.details,
    });

    toast.success("Country updated successfully");
  } else {
    const countryData = {
      name: country.value.name,
      capital: country.value.capital,
      population: country.value.population,
      details: country.value.details,
    };
    await addDoc(collection(db, "countries"), countryData);
    toast.success("Country added successfully");
  }
  countriesStore.closeModal();
  country.value = {};
  setTimeout(() => {
    location.reload();
  }, 1000);
};
</script>
