<template>
  <div class="flex h-screen w-full p-8">
    <!-- Section gauche -->
    <div class="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-8">
      <div class="w-full max-w-sm">
        <div class="flex justify-left mb-5">
          <img :src="appicons" alt="Logo" class="w-14 h-14" />
        </div>
        <h1 class="text-4xl font-merriweather font-semibold mb-2 text-neutral-10">Connexion</h1>
        <p class="text-neutral-20 mb-8">
          Bienvenue à nouveau ! Veuillez saisir vos coordonnées.
        </p>
        <LoginForm>

        </LoginForm>

        <div class="text-center mt-4">
          <RouterLink :to="{ name: AppRoute.LOST_PASSWORD.name }"
            class=" text-sm cursor-pointer font-medium hover:underline text-[15px]">
            Mot de passe oublier
          </RouterLink>
        </div>
      </div>
    </div>
    <!-- Section droite -->
    <div
      class="hidden  w-1/2 bg-cover bg-[url('/src/assets/images/fonds/Section2.png')] bg-center  md:block relative rounded-2xl">
      <div class="w-full h-[288px]  absolute bottom-0 rounded-2xl">
        <LoginCaroussel class="rounded-b-2xl"></LoginCaroussel>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import LoginForm from '@/components/forms/loginForm.vue';
import LoginCaroussel from '@/components/modals/loginCaroussel.vue';
import { AppRoute } from '@/constants/app-route';



const appicons = new URL("/src/assets/images/logos-paytic/paytic-logo.png", import.meta.url).href;


</script>

<style scoped>
/* Styles personnalisés */
</style>
