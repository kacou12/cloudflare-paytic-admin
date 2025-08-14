<template>
    <!-- Effectué avce succès -->
    <div class="flex items-center justify-center h-screen p-8">
        <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-[360px] ">
            <!-- Icône ou alerte -->
            <!-- <div class="flex justify-center mb-6">
                <div class="w-12 h-12 bg-neutral-80 text-neutral-10 rounded-full flex items-center justify-center">
                    <span class="text-2xl font-bold">!</span>
                </div>
            </div> -->

            <div class="w-full flex items-center justify-center">

                <div
                    class="bg-[#C8E6C9] mb-4 w-[56px] h-[56px] rounded-full flex items-center justify-center text-[#388E3C]">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.83337 16.3333L10.5 20.9999L22.1667 9.33325" stroke="#388E3C" stroke-width="3"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>

                </div>
            </div>

            <!-- Titre et sous-titre -->
            <h1 class="text-[28px] font-bold text-center mb-2 font-merriweathersans">Réinitialisation du mot de passe
            </h1>
            <p class="text-[#666666] text-center mb-6 text-[16px] font-normal">
                Votre mot de passe a été réinitialisé avec succès. Cliquez ci-dessous pour vous connecter comme par
                magie.
            </p>





            <CommonButton @click.prevent="$router.push({ name: 'Login' })" class="w-full mt-3" :padding-y="5"
                type="default" title="Retour à la connexion">
            </CommonButton>
        </div>


    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>