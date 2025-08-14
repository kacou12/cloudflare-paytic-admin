<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="console.log('wapiti')" title="Ajouter un charge"></CommonButton>
        </template>

        <template #title>
            <span>Nouvelle charge</span>
        </template>
        <template #content>

            <div class="space-y-3">

                <!-- Charge -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Charge</p>
                    <div class="flex gap-3 w-full relative">
                        <Input class="pl-10" id="charge" v-model.number="chargeState.charge" placeholder="Charge"
                            required />
                        <span
                            class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                            %
                        </span>
                    </div>
                </section>

                <!-- provider -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Choix du provider</p>
                    <CommonSelect v-if="isProviderFetched" v-model="providerModel" default-width="w-full"
                        title="Choix du provider"
                        :elements="providersData!.items.map(provider => ({ name: provider.operator, value: provider.id }))">
                    </CommonSelect>
                    <!-- <CommonComboBoxCountry v-model="providerState.country"></CommonComboBoxCountry> -->
                </section>

                <!-- merchant -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Choix du marchant</p>
                    <CommonSelect v-if="isMerchantFetched" v-model="merchantModel" default-width="w-full"
                        title="Choix du marchant"
                        :elements="merchantsData!.items.map(merchant => ({ name: merchant.business_name, value: merchant.id }))">
                    </CommonSelect>
                    <!-- <CommonComboBoxCountry v-model="providerState.country"></CommonComboBoxCountry> -->
                </section>




            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1  text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button @click="createChargeHandler" class="flex-1  text-sm rounded-lg bg-primary font-normal"
                    variant="default">
                    Créer maintenant
                </Button>
            </div>

        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';

import { ref } from 'vue';
import { useToast } from 'vue-toastification';

import CommonSelect from '@/components/common/commonSelect.vue';
import Input from '@/components/ui/input/Input.vue';
import { useCreateChargeMutation } from '@/composables/queries/useChargeQueries';
import { useWindowSize } from '@vueuse/core';

import { useMerchantsFiltersQuery } from '@/composables/queries/useMerchantQueries';
import { useProvidersFiltersQuery } from '@/composables/queries/useProviderQueries';
import type { ChargeForm, ChargeRequest } from '@/services/charge/charge-type';

const open = ref(false);
const toast = useToast();
const { width, height } = useWindowSize()



const { mutateAsync: createCharge } = useCreateChargeMutation();
const { isFetched: isProviderFetched, data: providersData } = useProvidersFiltersQuery();
const { isFetched: isMerchantFetched, data: merchantsData } = useMerchantsFiltersQuery();

// const countryModel = defineModel({ type: String });
const selectedCountry = ref("CI");




const chargeState = ref<ChargeForm>(
    {
        charge: 0,
        merchant_id: undefined,
        provider_id: undefined
    }
);

const [merchantModel, _] = defineModel('merchantModel', {
    set(value: string) {

        chargeState.value.merchant_id = parseInt(value)

        return value;
    },
    default: undefined,
})

const [providerModel, __] = defineModel('providerModel', {
    set(value: string) {

        chargeState.value.provider_id = parseInt(value)

        return value;
    },
    default: undefined,
})


const createChargeHandler = async () => {
    const payload: ChargeRequest = {
        charge: chargeState.value.charge!,
        merchant_id: chargeState.value.merchant_id!,
        provider_id: chargeState.value.provider_id!
    };
    // payload.merchant_id = parseInt(chargeState.value.merchant_id!);
    // payload.provider_id = chargeState.value.provider_id;


    await createCharge(payload);
    chargeState.value = {
        charge: 0,
        merchant_id: undefined,
        provider_id: undefined
    }
    open.value = false;
    toast.success("Le charge a bien été ajoutée");

}


</script>