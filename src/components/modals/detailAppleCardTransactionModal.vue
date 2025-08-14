<template>
    <CommonModal v-model:open="open" backgroudColor="bg-neutral-80" :showDivider="false">
        <template #trigger>
            <div class="p-1 cursor-pointer">

                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 13.1337C9.37906 13.1337 8.77206 12.9496 8.25577 12.6046C7.73947 12.2596 7.33707 11.7693 7.09945 11.1956C6.86182 10.622 6.79965 9.9907 6.92079 9.38169C7.04193 8.77268 7.34094 8.21327 7.78001 7.7742C8.21909 7.33513 8.7785 7.03612 9.38751 6.91498C9.99652 6.79384 10.6278 6.85601 11.2014 7.09363C11.7751 7.33126 12.2655 7.73366 12.6104 8.24995C12.9554 8.76625 13.1395 9.37324 13.1395 9.99419C13.1372 10.8261 12.8057 11.6234 12.2174 12.2116C11.6292 12.7999 10.8319 13.1314 10 13.1337ZM10 8.16279C9.63778 8.16279 9.2837 8.2702 8.98253 8.47144C8.68136 8.67267 8.44662 8.9587 8.30801 9.29334C8.1694 9.62799 8.13313 9.99622 8.20379 10.3515C8.27446 10.7067 8.44888 11.0331 8.70501 11.2892C8.96113 11.5453 9.28746 11.7197 9.64271 11.7904C9.99797 11.8611 10.3662 11.8248 10.7008 11.6862C11.0355 11.5476 11.3215 11.3128 11.5227 11.0117C11.724 10.7105 11.8314 10.3564 11.8314 9.99419C11.8314 9.50847 11.6384 9.04265 11.295 8.69919C10.9515 8.35574 10.4857 8.16279 10 8.16279ZM10 18.1134C7.63675 18.0051 5.38923 17.0591 3.65988 15.4448C1.75872 13.7791 0.625 11.7384 0.625 9.99419C0.625 6.12209 5.53488 1.875 10 1.875C14.4651 1.875 19.375 6.23546 19.375 9.99419C19.375 13.936 14.5523 18.1134 10 18.1134ZM10 3.18314C6.31105 3.18314 1.93314 6.87209 1.93314 9.99419C1.93314 11.3547 2.92733 13.064 4.54942 14.4593C6.03824 15.8512 7.96564 16.6808 10 16.8052C14.1512 16.8052 18.0669 12.968 18.0669 9.99419C18.0669 7.17733 13.8983 3.18314 10 3.18314Z"
                        fill="#666666" />
                </svg>
            </div>

        </template>

        <template #title>

        </template>
        <template #content class=" ">
            <!-- First section  -->
            <div class="space-y-2">

                <section class="flex flex-col gap-2 p-3 rounded-xl bg-white">
                    <div class="flex justify-between items-center">
                        <img :src="appleCard" alt="">
                        <p class="text-neutral-10 font-bold text-xl font-merriweathersans">15 450 F CFA</p>
                    </div>
                    <div>
                        <p class="text-neutral-40 text-sm">App card</p>
                    </div>

                </section>
                <!-- detail code -->
                <section class="detailPayment p-3 rounded-xl space-y-3  bg-white">

                    <h2 class="text-[16px] font-medium text-neutral-10">Code de la recharge</h2>

                    <div class="flex justify-between">
                        <p class="text-[16px] font-normal text-neutral-30">XX345678901234Ab</p>

                        <!-- copy icon -->
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.829 13.361C21 12.948 21 12.423 21 11.375C21 10.327 21 9.802 20.829 9.389C20.7159 9.11593 20.5502 8.86782 20.3412 8.65883C20.1322 8.44984 19.8841 8.28407 19.611 8.171C19.198 8 18.673 8 17.625 8H11.1C9.84 8 9.21 8 8.729 8.245C8.30526 8.46078 7.96078 8.80526 7.745 9.229C7.5 9.709 7.5 10.339 7.5 11.6V18.125C7.5 19.173 7.5 19.698 7.671 20.111C7.9 20.662 8.338 21.101 8.889 21.329C9.302 21.5 9.827 21.5 10.875 21.5C11.923 21.5 12.448 21.5 12.861 21.329M20.829 13.361C20.7159 13.6341 20.5502 13.8822 20.3412 14.0912C20.1322 14.3002 19.8841 14.4659 19.611 14.579C19.198 14.75 18.673 14.75 17.625 14.75C16.577 14.75 16.052 14.75 15.639 14.921C15.3659 15.0341 15.1178 15.1998 14.9088 15.4088C14.6998 15.6178 14.5341 15.8659 14.421 16.139C14.25 16.552 14.25 17.077 14.25 18.125C14.25 19.173 14.25 19.698 14.079 20.111C13.9659 20.3841 13.8002 20.6322 13.5912 20.8412C13.3822 21.0502 13.1341 21.2159 12.861 21.329M20.829 13.361C20.2912 15.216 19.3017 16.9086 17.9492 18.2873C16.5967 19.666 14.9233 20.6878 13.079 21.261L12.861 21.329M16.5 8V7.1C16.5 5.84 16.5 5.21 16.255 4.729C16.0395 4.30541 15.6954 3.96095 15.272 3.745C14.79 3.5 14.16 3.5 12.9 3.5H6.6C5.34 3.5 4.71 3.5 4.229 3.745C3.80526 3.96078 3.46078 4.30526 3.245 4.729C3 5.209 3 5.839 3 7.1V13.4C3 14.66 3 15.29 3.245 15.771C3.461 16.195 3.805 16.539 4.229 16.755C4.709 17 5.34 17 6.601 17H7.5"
                                stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>


                </section>
                <section class="detailPayment p-3 rounded-xl space-y-3  bg-white">

                    <h2 class="text-[16px] font-medium text-neutral-10">Details achat</h2>
                    <!-- border-dashed -->
                    <div class="divide-y divide-neutral-70 divide-dashed space-y-3">

                        <article class="space-y-3 border-dashed ">

                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Montant</p>
                                <p class="flex-1 text-neutral-10 font-medium">10.000 F CFA</p>
                            </div>
                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Frais</p>
                                <p class="flex-1 text-neutral-10 font-medium">450 F CFA</p>
                            </div>
                        </article>

                        <article class="space-y-3 pt-3">
                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Total payer</p>
                                <p class="flex-1 text-neutral-10 font-medium">10.450 F CFA</p>
                            </div>
                        </article>


                        <article class="space-y-3 pt-3">

                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">Date et heure</p>
                                <p class="flex-1 text-neutral-10 font-medium">04/04/2023 à 10h30</p>
                            </div>
                            <div class="flex ">
                                <p class="flex-1 text-neutral-40">ID transaction </p>
                                <p class="flex-1 text-neutral-10 font-medium">XDZ87OL534</p>
                            </div>
                        </article>
                    </div>

                </section>
            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Fermer
                </Button>
                <Button class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                    Voir le profil
                </Button>
            </div>

        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';

const appleCard = new URL("/src/assets/images/gift/apple-card.png", import.meta.url).href;
const open = ref(false);
defineProps({
    id: {
        type: String,
        required: true

    }
})
</script>