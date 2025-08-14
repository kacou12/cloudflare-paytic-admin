<template>

    <div class="bg-white p-4 rounded-lg shadow border border-neutral-70 flex flex-col justify-between gap-3">
        <section class="flex justify-between items-end">
            <h2 class="text-sm xl:text-base font-medium text-black">{{ title }}</h2>
            <Button variant="ghost" class="w-8 h-8 p-0 text-neutral-30">
                <span class="sr-only">Open menu</span>
                <!-- <MoreVertical class="w-4 h-4" /> -->
            </Button>
        </section>

        <section class="flex justify-between  items-center">

            <div class="">
                <span class="text-2xl lg:text-3xl font-bold font-merriweather">{{ amount }}</span>
            </div>

            <CommonBadge type="up" :value="10" />


        </section>


    </div>


</template>

<script setup lang="ts">

import { Button } from '@/components/ui/button'; /* PartiallyEnd: #3632/scriptSetup.vue */
import { MoreVertical } from 'lucide-vue-next';
import CommonBadge from '@/components/common/commonBadge.vue';

defineProps({
    title: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: false
    },
    // subTitle: {
    //     type: String,
    //     required: true
    // },
    // percentage: {
    //     type: Number,
    //     required: true
    // }
})



</script>

<style scoped>
.card {
    width: 300px;
}
</style>