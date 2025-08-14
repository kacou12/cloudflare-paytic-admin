<template>
    <div class="bg-white p-4 rounded-xl shadow border border-neutral-70
     flex gap-4 w-full">
        <section>

            <img v-if="serviceAvailability.provider!.operator.toLocaleLowerCase() === OperatorsEnum.Moov" width="48"
                height="48" src="@/assets/images/logos/moov.png" alt="" class="bg-cover rounded-lg">
            <img v-else-if="serviceAvailability.provider!.operator.toLocaleLowerCase() === OperatorsEnum.Mtn" width="48"
                height="48" src="@/assets/images/logos/mtn.png" alt="" class="bg-cover rounded-lg">
            <img v-else-if="serviceAvailability.provider!.operator.toLocaleLowerCase() === OperatorsEnum.Orange"
                width="48" height="48" src="@/assets/images/logos/orange.png" alt="" class="bg-cover rounded-lg">
            <img v-else-if="serviceAvailability.provider!.operator.toLocaleLowerCase() === OperatorsEnum.Wave"
                width="48" height="48" src="@/assets/images/logos/wave.png" alt="" class="bg-cover rounded-lg">



        </section>

        <div class="space-y-3">

            <section>
                <div class="flex gap-2 ">
                    <!-- icon zctive or inactive -->
                    <div class="w-2 h-2 mt-1 rounded-full bg-success-500"></div>

                    <div class=" ">
                        <p class="text-xs  text-neutral-20 font-normal">Prélèvement</p>
                        <p class="text-sm text-neutral-10 font-semibold">{{ serviceAvailability.cashout_issuer?.name ??
                            "non defini" }}</p>
                    </div>
                </div>
            </section>

            <section>
                <div class="flex gap-2">
                    <!-- icon zctive or inactive -->
                    <div class="w-2 h-2 mt-1  rounded-full bg-success-500"></div>

                    <div class="">
                        <p class="text-xs text-neutral-20 font-normal">Dépot</p>
                        <p class="text-sm text-neutral-10 font-semibold">{{ serviceAvailability.cashin_issuer?.name ??
                            "non defini" }}</p>
                    </div>
                </div>
            </section>

        </div>


    </div>
</template>

<script setup lang="ts">
import { OperatorsEnum } from '@/constants/constant.enum';
import type { ServiceAvailabilityResponse } from '@/services/providers/provider-type';
import type { PropType } from 'vue';


const { serviceAvailability } = defineProps({
    serviceAvailability: {
        type: Object as PropType<ServiceAvailabilityResponse>,
        required: true
    }
})

</script>

<style scoped></style>