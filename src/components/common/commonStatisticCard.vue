<template>

    <div class="bg-white p-5 rounded-xl shadow border border-neutral-70 flex flex-col justify-between  gap-6 font-publicsans 
        relative
        ">
        <section class="flex justify-between items-center">
            <p class="text-sm">{{ title }}</p>

            <p class="text-xs">Aujoud'hui</p>
        </section>

        <section class=" flex justify-center">
            <div v-if="id == 1" class="w-10 h-10 rounded-full bg-[#f4edfc] flex justify-center items-center">
                <Database class="text-[#AB7AE6]"></Database>
            </div>
            <div v-else-if="id == 2" class="w-10 h-10 rounded-full bg-[#e4f3db] flex justify-center items-center">
                <ArrowDownLeftIcon class="text-[#5fd71d]"></ArrowDownLeftIcon>
            </div>
            <div v-else-if="id == 3" class="w-10 h-10 rounded-full bg-[#d1e6f3] flex justify-center items-center">
                <ArrowUpRightIcon class="text-[#0084CE]"></ArrowUpRightIcon>
            </div>

        </section>

        <section class="space-y-3 flex flex-col items-center ">
            <h2 class="text-2xl font-semibold">{{ formatPrice(parseInt(amount)) }}</h2>
            <p class="text-center text-sm">{{ subTitle }}</p>
        </section>
        <div class="absolute top-0 bottom-[-1px] right-0 left-0 border-b-2 border-red-400 rounded-lg"></div>

    </div>


</template>

<script setup lang="ts">
//                    
import { formatPrice } from '@/lib/utils';
import { ArrowDownLeftIcon, ArrowUpRightIcon, Database } from 'lucide-vue-next';





defineProps({
    title: {
        type: String,
        required: true,
        // default: "Envoi d'argent inter reseau"
    },
    subTitle: {
        type: String,
        required: false,
        default: "L'essentiel des transactions payées"
    },
    id: {
        type: Number,
        required: true,
    },
    amount: {
        type: String,
        required: true,


    },
    percentage: {
        type: Number,
        required: false,
        default: 5
    },
    showNetworkDetails: {
        type: Boolean,
        required: false,
        default: true
    }

});








</script>

<style scoped>
.card {
    width: 300px;
}
</style>