<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="console.log('wapiti')" title="Ajouter d'un taux "></CommonButton>
        </template>

        <template #title>
            <span>Nouveau taux</span>
        </template>
        <template #content>
            <div class="space-y-3">
                <div class="space-y-2">

                    <p class="text-sm text-neutral-20">Agreggateur</p>
                    <div v-if="isFetchedIssuer">

                        <CommonSelect v-model="issuerProviderRateState.issuer_id" border-color="border-neutral-60"
                            default-width="w-full" class="w-full" title="Choix de l'agreggateur"
                            :elements="issuersElements">
                        </CommonSelect>
                    </div>
                </div>


                <div class="space-y-2">
                    <p class="text-sm text-neutral-20">Provider</p>
                    <div v-if="isFetchedProvider">

                        <CommonSelect v-model="issuerProviderRateState.provider_id" border-color="border-neutral-60"
                            default-width="w-full" class="w-full" title="Choix du provider"
                            :elements="providersElements">
                        </CommonSelect>
                    </div>
                </div>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">collecte (cash out)</p>
                    <div class="flex gap-3 w-full relative">
                        <Input class="pl-14" id="cashin_rate" v-model.number="issuerProviderRateState.cashout_rate"
                            placeholder="cash out rate" required />
                        <span
                            class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                            %
                        </span>
                    </div>
                </section>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">transfert d'argent (cash in)</p>
                    <div class="flex gap-3 w-full relative">
                        <Input class="pl-14" id="cashin_rate" v-model.number="issuerProviderRateState.cashin_rate"
                            placeholder="cash in rate" required />
                        <span
                            class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                            %
                        </span>
                    </div>
                </section>



            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1  text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button @click="createIssuerProviderRateHandler"
                    class="flex-1  text-sm rounded-lg bg-primary font-normal" variant="default">
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
import { useCreateIssuerProviderRateMutation } from '@/composables/queries/useIssuerProviderRateQueries';
import { useIssuersFiltersQuery } from '@/composables/queries/useIssuerQueries';
import { useProvidersFiltersQuery } from '@/composables/queries/useProviderQueries';
import type { IssuerProviderRateRequest } from '@/services/issuer-provider-rate/Issuer-provider-rate-type';
import { computed, ref, type PropType } from 'vue';
import { useToast } from 'vue-toastification';
import { Input } from '../ui/input';
import CommonSelect from '../common/commonSelect.vue';

const open = ref(false);
const toast = useToast();

defineProps({
    issuersElements: {
        type: Array as PropType<{ name: string, value: string }[]>,
        required: true
    },
    providersElements: {
        type: Array as PropType<{ name: string, value: string }[]>,
        required: true
    },
    isFetchedIssuer: {
        type: Boolean,
        required: true
    },
    isFetchedProvider: {
        type: Boolean,
        required: true
    }

})


const { mutateAsync: createIssuerProviderRate } = useCreateIssuerProviderRateMutation();




const issuerProviderRateState = ref<IssuerProviderRateRequest>(
    {
        cashin_rate: 0,
        cashout_rate: 0,
        issuer_id: undefined,
        provider_id: undefined
    }
);

const createIssuerProviderRateHandler = async () => {
    const payload = { ...issuerProviderRateState.value };


    await createIssuerProviderRate(payload);
    issuerProviderRateState.value = {
        cashin_rate: 0,
        cashout_rate: 0,
        issuer_id: "",
        provider_id: ""
    }
    open.value = false;
    toast.success("Le nouveau taux a bien été crée");

}


</script>