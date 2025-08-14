<template>

    <div class="bg-white p-4 rounded-lg shadow border border-neutral-70 flex flex-col justify-between">
        <section class="flex justify-between items-end">
            <h2 class="text-sm xl:text-base font-medium text-black">Segmentation des vérifications</h2>
            <Button variant="ghost" class="w-8 h-8 p-0 text-neutral-30">
                <span class="sr-only">Open menu</span>
                <MoreVertical class="w-4 h-4" />
            </Button>
        </section>

        <section class="flex justify-between gap-1  ">
            <div class="">
                <span class="text-xl xl:text-2xl font-bold font-merriweathersans">1,200</span>
            </div>

            <!-- CHIP -->
            <!-- <span class="flex text-success-dark text-sm font-medium mr-1">
                <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.99984 15.8333V4.16667M9.99984 4.16667L4.1665 10M9.99984 4.16667L15.8332 10"
                        stroke="#388E3C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                40%
            </span> -->
            <common-badge type="up" :value="40" />
            <!-- CHIP -->

        </section>

        <section class="minichart">
            <status-bar-chart :approved="50" :pending="30" :rejected="20"></status-bar-chart>
        </section>


    </div>


</template>

<script setup lang="ts">
import { computed } from 'vue'

import { MoreVertical } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import statusBarChart from '@/components/common/statusBarChart.vue';
import commonBadge from '@/components/common/commonBadge.vue';



</script>

<style scoped>
.card {
    width: 300px;
}
</style>