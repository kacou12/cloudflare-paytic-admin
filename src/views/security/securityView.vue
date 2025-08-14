<template>
    <div class="px-4 h-full">

        <header class="flex justify-between items-center">
            <div class="mb-6 space-y-1">

                <h1 class="text-xl font-bold font-merriweathersans leading-6 text-black">Developpeur</h1>
                <p class="text-neutral-30 text-sm font-normal">Suivez, gérez vos tokens et vos web books
                </p>
            </div>

            <div>
                <notificationIcon></notificationIcon>
            </div>
        </header>


        <section class="space-y-10">
            <ApiTokens></ApiTokens>
            <WebHooks></WebHooks>
        </section>


    </div>
</template>

<script setup lang="ts">
import ApiTokens from '@/components/developpers/apiTokens.vue';
import WebHooks from '@/components/developpers/webHooks.vue';




</script>

<style scoped></style>