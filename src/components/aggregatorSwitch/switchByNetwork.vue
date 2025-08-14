<template>
    <div class="space-y-5 ">

        <section class="flex justify-between items-center my-7 flex-wrap">
            <h1 class="text-[16px] font-semibold text-neutral-10">Switch par réseau</h1>

            <SwitchNetworkTab v-model="currentProvider" :providers="serviceAvailabilities.map((el) => el.provider!)"
                class="max-w-[500px]">
            </SwitchNetworkTab>
        </section>

        <section class="flex md:flex-row flex-col justify-between  ">

            <article class="flex flex-col md:flex-row items-start justify-between w-full md:w-[60%] 2xl:w-[75%] gap-5 ">
                <!-- Prelevement -->
                <div class="md:flex-1 w-full md:w-auto space-y-5 ">
                    <div class=" ">

                        <p class="text-sm text-[#3B506E] font-medium">Prélèvements (cash out)</p>
                        <FadeSlideAnimation mode="out-in">
                            <div v-if="listCashOutIssuers!.length > 0" class="mt-1">

                                <SwitchNetworkSelect v-model="prelev_cash_out" default-width="w-full"
                                    title="Prélèvement" :elements="listCashOutIssuers!">
                                </SwitchNetworkSelect>
                            </div>
                            <!-- <div v-else-if="isFetchingIssuer" class="my-5">
                                <div class="animate-pulse bg-gray-200 h-[40px]  rounded-lg"></div>
                            </div> -->
                            <div v-else class="my-5">
                                <p class="text-sm">Veuillez ajouter des issuers</p>
                            </div>
                        </FadeSlideAnimation>

                    </div>

                    <!-- <section class="space-y-1">
                        <p class="flex-1 text-neutral-20 text-sm">Activer les frais de prélèvement de l'expéditeur</p>

                        <div class="flex gap-3 w-full max-w-[512px] relative">
                            <CommonSwitch v-model="must_pay_fees"></CommonSwitch>
                        </div>
                    </section> -->

                </div>
                <!-- Depot -->
                <div class="space-y-1 md:flex-1  w-full  md:w-auto ">
                    <p class="text-sm text-[#3B506E] font-medium">Dépôt (cash in)</p>


                    <!-- <div v-if="isFetchedIssuer && listCashInIssuers!.length > 0">

                        <SwitchNetworkSelect v-model="cash_in" default-width="w-full" title="Dépôt"
                            :elements="listCashInIssuers!">
                        </SwitchNetworkSelect>
                    </div>
                    <div v-else class="my-5">
                        <p class="text-sm">Veuillez ajouter des issuers</p>
                    </div> -->

                    <FadeSlideAnimation mode="out-in">
                        <div v-if="listCashInIssuers!.length > 0" class="mt-1">

                            <SwitchNetworkSelect v-model="cash_in" default-width="w-full" title="Dépôt"
                                :elements="listCashInIssuers!">
                            </SwitchNetworkSelect>
                        </div>
                        <div v-else class="my-5">
                            <p class="text-sm">Veuillez ajouter des issuers</p>
                        </div>
                    </FadeSlideAnimation>
                </div>
            </article>

            <div class="  md:mt-5">

                <div class="space-x-2 flex h-[40px] md:my-0 ">
                    <!-- <div> -->


                    <!-- <CommonButton v-if="isFetchedIssuer && listCashInIssuers!.length > 0 && hasActionPermission({
                        v1_object: ProviderServiceAvailibilityRouteApi.default,
                        v2_action: 'PUT'
                    })" @click="updateCurrentServiceProviderHandler" class="h-full" type="outline" :is-disabled="prelev_cash_out == null ||
                        cash_in == null" title="Actualiser le flux">
                    </CommonButton> -->
                    <!-- </div> -->

                    <CustomButton v-if="listCashInIssuers!.length > 0" @click="updateCurrentServiceProviderHandler"
                        class="h-full" type="outline" :is-disabled="prelev_cash_out == null ||
                            cash_in == null">
                        <!-- Actualiser le flux -->
                        <div class="w-[150px] flex justify-center gap-2 mr-8">
                            <div class="w-5 h-5">

                                <img v-if="isPending" :src="reloadIcon" alt="refresh" class="w-5 h-5">
                            </div>
                            Actualiser le flux
                        </div>

                    </CustomButton>

                </div>
            </div>


        </section>



    </div>
</template>

<script setup lang="ts">
import { useUpdateProviderServiceAvailibilityMutation } from '@/composables/queries/useProviderQueries';
import type { ProviderServiceAvailabilityPayload, ServiceAvailabilityResponse } from '@/services/providers/provider-type';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { computed, onMounted, ref, watch, type PropType } from 'vue';
import { useToast } from 'vue-toastification';
import CustomButton from '../buttons/customButton.vue';
import SwitchNetworkSelect from './switchNetworkSelect.vue';
import SwitchNetworkTab from './switchNetworkTab.vue';

import FadeSlideAnimation from '../animations/fadeSlideAnimation.vue';

const { serviceAvailabilities } = defineProps({
    serviceAvailabilities: {
        type: Object as PropType<ServiceAvailabilityResponse[]>,
        required: true
    }
})


const reloadIcon = new URL("/src/assets/reload.gif", import.meta.url).href;

const toast = useToast();
const { mutateAsync: updateCurrentServiceProvider, isPending } = useUpdateProviderServiceAvailibilityMutation();
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();

const prelev_cash_out = ref<string>();
const cash_in = ref<string>();
const currentProvider = ref<string>();


const must_pay_fees = ref();

const updateCurrentServiceProviderHandler = async () => {
    const currentService = getCurrentServiceAvailability(currentProvider.value!)!;
    const payload: ProviderServiceAvailabilityPayload = {
        cashin_issuer: cash_in.value!,
        cashout_issuer: prelev_cash_out.value!,
        id: currentService.id,
        cashin_enabled: currentService.cashin_enabled,
        cashout_enabled: currentService.cashout_enabled,
    };
    await updateCurrentServiceProvider(
        [
            { ...payload }
        ]
    );

    toast.success("le flux a bien été actualisé ")

}





const listCashOutIssuers = computed(() => {

    if (currentProvider.value == null) return []
    const currentServiceAvailability = getCurrentServiceAvailability(currentProvider.value!)!;
    currentServiceAvailability.provider.cashout_issuer_used
    const testList = currentServiceAvailability.provider.cashout_issuer_used.map((el) => {
        return {
            name: el,
            value: el,
            isActive: prelev_cash_out.value == el,
            // percentage: el.cashin_rate
        }
    });
    return testList;
}
);

const listCashInIssuers = computed(() => {
    if (currentProvider.value == null) return []
    const currentServiceAvailability = getCurrentServiceAvailability(currentProvider.value!)!;
    const testListB = currentServiceAvailability.provider.cashin_issuer_used.map((el) => {
        return {
            name: el,
            value: el,
            isActive: cash_in.value == el,
            // percentage: el.cashin_rate
        }
    })
    return testListB;
});

onMounted(async () => {
    // await refetch();
    const service = serviceAvailabilities[0];

    // initialize switch aggregator data
    currentProvider.value = service.provider!.id;
    prelev_cash_out.value = service.cashout_issuer?.name;
    cash_in.value = service.cashin_issuer!.name;
    // must_pay_fees.value = service.must_pay_fees ?? false;

})




const getCurrentServiceAvailability = (id: string) => serviceAvailabilities.find((el) => el.provider_id == id);

watch(currentProvider, (n, o) => {
    if (currentProvider.value == null) return
    const currentService = serviceAvailabilities.find((el) => el.provider!.id == n);
    const testa = listCashInIssuers.value;
    const testb = listCashOutIssuers.value;
    if (currentService != undefined) {
        prelev_cash_out.value = currentService.cashout_issuer!.name;
        cash_in.value = currentService.cashin_issuer!.name;
        // must_pay_fees.value = currentService.must_pay_fees ?? false;
    }

})

// watch(() => currentCountry.value, async (n, o) => {
//     currentProvider.value = undefined;
//     if (serviceAvailabilities.length == 0) return
//     await refetch();
//     const service = serviceAvailabilities[0];

//     currentProvider.value = service.provider!.id;
//     prelev_cash_out.value = service.cashin_issuer?.id;
//     cash_in.value = service.cashin_issuer!.id;
//     must_pay_fees.value = service.must_pay_fees ?? false;

// })


</script>

<style scoped></style>