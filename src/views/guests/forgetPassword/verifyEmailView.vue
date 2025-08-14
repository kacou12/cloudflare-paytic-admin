<template>
    <!-- Vérifiez votre courrier électronique -->
    <div class="flex items-center justify-center h-screen p-8">
        <div class="bg-white p-8 rounded-xl shadow-lg w-full  border max-w-[450px]">
            <!-- Icône ou alerte -->
            <div class="flex justify-center mb-6">
                <div class="w-12 h-12 bg-neutral-80 text-neutral-10 rounded-full flex items-center justify-center">
                    <!-- <span class="text-2xl font-bold">!</span> -->
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.4618 6.97664L14 15.75L12.5381 6.97664C12.5031 6.7645 12.5146 6.54727 12.5719 6.34004C12.6292 6.1328 12.731 5.94052 12.8701 5.77655C13.0092 5.61258 13.1823 5.48085 13.3774 5.3905C13.5725 5.30015 13.785 5.25336 14 5.25336C14.215 5.25336 14.4274 5.30015 14.6226 5.3905C14.8177 5.48085 14.9908 5.61258 15.1299 5.77655C15.269 5.94052 15.3707 6.1328 15.428 6.34004C15.4853 6.54727 15.4969 6.7645 15.4618 6.97664Z"
                            stroke="#1A1A1A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M14 23.3333C14.6444 23.3333 15.1667 22.811 15.1667 22.1667C15.1667 21.5223 14.6444 21 14 21C13.3557 21 12.8334 21.5223 12.8334 22.1667C12.8334 22.811 13.3557 23.3333 14 23.3333Z"
                            stroke="#1A1A1A" stroke-width="2" />
                    </svg>

                </div>
            </div>
            <!-- Titre et sous-titre -->
            <h1 class="text-[28px] font-bold text-center mb-2 font-merriweathersans">Vérifiez votre courrier
                électronique
            </h1>
            <p class="text-[#666666] text-center mb-6 text-[16px] font-normal">
                Nous avons envoyé un lien de réinitialisation du mot de passe à philippe@gmail.com
            </p>

            <!-- Lien retour -->
            <div class="text-center mt-3 mb-6 flex items-center space-x-2 ">
                <span class="text-neutral-20 text-center  text-sm">Vous n'avez pas reçu l'e-mail ?

                </span>
                <!-- <CommonButton  title="Cliquer pour renvoyer" type="link"
                    class="text-[16px]  border w-fit text-primary-40 font-semibold hover:underline">

                </CommonButton> -->
                <Button class="text-primary text-sm font-medium" @click="$router.push({ name: 'UpdatePassword' })"
                    variant="link">Cliquer pour renvoyer</Button>
            </div>

            <CommonButton class="w-full " :padding-y="5" title="Retour à la connexion" type="outline"
                @click.prevent="$router.push({ name: 'Login' })">

            </CommonButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';


</script>

<style scoped></style>