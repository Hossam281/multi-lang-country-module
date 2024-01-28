import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";

export const useCountriesStore = defineStore("countries", () => {
  const isOpen = ref(false);
  const isEdit = ref(false);
  const editableCountry = ref(null);


  function setEditableCountry(country) {
    editableCountry.value = country;
  }
  function closeModal() {
    isOpen.value = false;
    isEdit.value = false;
  }
  function openModal() {
    isOpen.value = true;
  }
  function editModal() {
    isEdit.value = true;
    openModal();
  }
  function closeEditModal() {
    isEdit.value = false;
    closeModal();
  }

  return { isOpen, closeModal, openModal, isEdit, editModal, closeEditModal, setEditableCountry, editableCountry };
});
