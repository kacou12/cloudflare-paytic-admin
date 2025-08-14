<template>
    <div class="">

        <section class="flex flex-col md:flex-row md:justify-between md:items-center">
            <h2 class="font-bold font-merriweathersans text-sm md:text-xl">Paramètre des actions</h2>
            <div class="my-4 md:my-0">
                <CommonButton @click="updateCurrentServiceProviderHandler" round-size="xl" class="h-[44px]"
                    type="default" title="Mettre à jours les paramètres">
                </CommonButton>
            </div>

        </section>

        <div class="flex flex-col md:flex-row gap-5 2xl:gap-10 my-5">
            <!-- Collectes -->
            <section
                class="flex-1 bg-white p-4 rounded-lg shadow border border-neutral-70 flex flex-col justify-between gap-6">
                <article class="">

                    <h2 class="font-bold font-merriweathersans text-md md:text-xl">Collectes (cash out)</h2>
                    <p class="text-xs md:text-sm text-neutral-20 font-normal">Gérez les réseaux en cas de dépannage</p>
                </article>

                <main class="space-y-2">
                    <!-- grid  -->
                    <SwitchNetworkActlonLine
                        v-model="all_cash_out[index][`${serviceAvailabilities[index].provider!.operator}`]"
                        v-for="item, index in serviceAvailabilities" :key="item.id" :service-availability="item">
                    </SwitchNetworkActlonLine>

                </main>
            </section>

            <!-- Transfert d'argent -->
            <section
                class="flex-1 bg-white p-4 rounded-lg shadow border border-neutral-70 flex flex-col justify-between gap-6">
                <article>

                    <h2 class="font-bold font-merriweathersans text-md md:text-xl">Transfert d'argent</h2>
                    <p class="text-xs md:text-sm text-neutral-20 font-normal">Gérez les réseaux en cas de dépannage</p>
                </article>

                <main class="space-y-2">
                    <!-- grid  -->
                    <SwitchNetworkActlonLine
                        v-model="all_cash_in[index][`${serviceAvailabilities[index].provider!.operator}`]"
                        v-for="item, index in serviceAvailabilities" :key="item.id" :service-availability="item">
                    </SwitchNetworkActlonLine>
                </main>
            </section>

        </div>

    </div>
</template>

<script setup lang="ts">

import { useUpdateProviderServiceAvailibilityMutation } from '@/composables/queries/useProviderQueries';
import { useLoaderStore } from '@/stores/useLoaderStore';
import type { ProviderServiceAvailabilityPayload, ServiceAvailabilityResponse } from '@/services/providers/provider-type';
import { reactive, ref, watch, type PropType, type Reactive } from 'vue';
import { useToast } from 'vue-toastification';
import CommonButton from '../buttons/commonButton.vue';
import SwitchNetworkActlonLine from './switchNetworkActlonLine.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { ProviderServiceAvailibilityRouteApi } from '@/services/providers/provider-constants';

const { serviceAvailabilities } = defineProps({
    serviceAvailabilities: {
        type: Object as PropType<ServiceAvailabilityResponse[]>,
        required: true
    }
})


const toast = useToast();
const { mutateAsync: updateCurrentServiceProvider } = useUpdateProviderServiceAvailibilityMutation();
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();

const all_cash_in = reactive(serviceAvailabilities.map((el) => {
    return {
        [`${el.provider!.operator}`]: el.cashin_enabled,
    }
}));
const testReactive = reactive({
    test: false
});
const all_cash_out = reactive(serviceAvailabilities.map((el) => {
    return {
        [`${el.provider!.operator}`]: el.cashout_enabled,
    }
}));






const getCurrentValue = (data: Reactive<{
    [x: string]: boolean;
}[]>, serviceName: string): boolean => {
    let current_value = false;

    for (let index = 0; index < data.length; index++) {
        const item = data[index];
        // Parcourir chaque entrée de l'objet à l'index actuel
        for (const key in item) {
            // Vérifier si la clé existe dans l'objet
            if (Object.prototype.hasOwnProperty.call(item, key)) {
                // Maintenant vous pouvez accéder à la valeur booléenne en toute sécurité
                const value = item[key];
                console.log(`Index ${index}, Key ${key}: ${value}`);
                // const currentService = serviceAvailabilities[index];
                if (serviceName.toLowerCase() === key.toLowerCase()) {
                    const cash_type = key;

                    current_value = value;
                    return current_value;


                }

            }
        }


    }
    return current_value;
};

const updateCurrentServiceProviderHandler = async () => {
    const payloads: ProviderServiceAvailabilityPayload[] = []

    const cash_in = { ...all_cash_in };
    const cash_out = { ...all_cash_out };

    const test = "";


    for (let index = 0; index < serviceAvailabilities.length; index++) {
        const currentService = serviceAvailabilities[index];
        let current_cash_in = getCurrentValue(all_cash_in, serviceAvailabilities[index].provider!.operator);
        let current_cash_out = getCurrentValue(all_cash_out, serviceAvailabilities[index].provider!.operator);

        // const payload: ProviderServiceAvailabilityPayload = {
        const payload: ProviderServiceAvailabilityPayload = {
            cashin_issuer: currentService.cashin_issuer!.name,
            cashout_issuer: currentService.cashout_issuer!.name,
            id: currentService.id,
            cashin_enabled: current_cash_in,
            cashout_enabled: current_cash_out,

            // provider_name: currentService.provider!.operator!,
            // provider_id: currentService.provider_id!,
        };
        payloads.push(payload);
    }


    await updateCurrentServiceProvider(
        payloads
    );

    toast.success("le flux a bien été actualisé ")

}



</script>

<style scoped></style>