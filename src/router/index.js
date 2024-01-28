import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import CountryDetails from "@/views/CountryDetails.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/details/:id",
      name: "countryDetails",
      component: CountryDetails,
    },
  ],
});

export default router;
