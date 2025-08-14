<template>
  <div class="flex pt-[75px] xl:pt-0">
    <!-- DEBUT NAVBAR -->
    <NavBar></NavBar>
    <!-- FIN NAVBAR -->

    <!-- DEBUT BARRE DES MENUS -->
    <AsideBar class="w-[290px]" :width-aside-bar="widthAsideBar"></AsideBar>
    <!-- FIN BARRE DES MENUS -->

    <!-- DEBUT DES PAGES DU ROUTER -->
    <div class="p-[2px] lg:p-4  xl:ml-[290px] w-full">
      <router-view></router-view>
    </div>
    <!-- FIN DES PAGES DU ROUTER -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AsideBar from '../aside/asideBar.vue';
import NavBar from '../aside/navBar.vue';
import TestMenuSideBar from '@/components/MenuDropdownSideBar.vue';
// import TestMenuSideBar from '../testMenuSideBar.vue';

let widthAsideBar = 500;




const isOpen = ref(false);




// Déconnexion
//   const LogOut= async () {
//   const response = await this.$swal({
//     title: `Se déconnecter !`,
//     text: "Êtes vous sûr de vouloir vous déconnecter ?",
//     type: "success",
//     showCancelButton: true,
//     cancelButtonText: "Non !",
//     confirmButtonText: "Oui confirmer !",
//     showCloseButton: true,
//     showLoaderOnConfirm: true,
//   });
//   if (response.isConfirmed) {
//     localStorage.clear();
//     this.$router.push({ name: 'Login' })
//   }


</script>
<style scoped>
.fadeslide-enter-active,
.fadeslide-leave-active {
  transition: all 0.5s ease-in-out;
}

.fadeslide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fadeslide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>