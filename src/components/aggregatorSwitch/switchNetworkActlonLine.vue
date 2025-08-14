<template>
    <article class="flex justify-between items-center">
        <div class="flex justify-between items-center gap-2">
            <div>
            
            <img v-if="serviceAvailability.provider!.operator.toLocaleLowerCase() === OperatorsEnum.Moov"
                src="@/assets/images/logos/moov.png" alt="" class="w-[32px] h-[32px]">
            <img v-else-if="serviceAvailability.provider!.operator.toLocaleLowerCase() === OperatorsEnum.Mtn"
                src="@/assets/images/logos/mtn.png" alt="" class="w-[32px] h-[32px]">
            <img v-else-if="serviceAvailability.provider!.operator.toLocaleLowerCase() === OperatorsEnum.Orange"
               src="@/assets/images/logos/orange.png" alt="" class="w-[32px] h-[32px]">
            <img v-else-if="serviceAvailability.provider!.operator.toLocaleLowerCase() === OperatorsEnum.Wave"
                src="@/assets/images/logos/wave.png" alt="" class="w-[32px] h-[32px]">


            </div>
            <p class="font-medium xs:text-xs text-sm">{{ serviceAvailability.provider!.operator }}</p>
        </div>

        <!-- <CommonSwitch></CommonSwitch> -->
        <CommonBigSwitch v-model="isActive"></CommonBigSwitch>

    </article>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import CommonSwitch from '../common/commonSwitch.vue';
import CommonBigSwitch from '../common/commonBigSwitch.vue';
import type { ServiceAvailabilityResponse } from '@/services/providers/provider-type';
import { OperatorsEnum } from '@/constants/constant.enum';

const isActive = defineModel({ type: Boolean, required: true });

defineProps({

    serviceAvailability: {
        type: Object as PropType<ServiceAvailabilityResponse>,
        required: true
    }

})

</script>

<style scoped></style>