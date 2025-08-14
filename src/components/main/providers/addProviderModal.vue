<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="console.log('wapiti')" title="Ajouter un provider"></CommonButton>
        </template>

        <template #title>
            <span>Nouveau provider</span>
        </template>
        <template #content>
            <div class="space-y-3">
                <!-- Nom du provider -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Nom du provider</p>
                    <Input type="title" id="name" placeholder="Nom du provider" v-model="providerState.name" required />
                </section>



                <!-- Méthode de paiement -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Méthode de paiement</p>
                    <Input type="title" id="method" placeholder="Méthode de paiement" v-model="providerState.method"
                        required />
                </section>

                <!-- Devise -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Devise</p>
                    <Input type="title" id="currency" placeholder="Devise" v-model="providerState.currency" required />
                </section>

                <!-- country -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Pays</p>
                    <CommonSelect v-if="countries.length > 0" v-model="providerState.country" default-width="w-full"
                        title="Pays"
                        :elements="countries.map(country => ({ name: country.label, value: country.value }))">
                    </CommonSelect>
                    <!-- <CommonComboBoxCountry v-model="providerState.country"></CommonComboBoxCountry> -->
                </section>

                <!-- Fournisseur -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Fournisseur</p>
                    <!-- <Input type="title" id="supplier" placeholder="Fournisseur (HUB2, BIZAO...)"
                        v-model="providerState.supplier" required /> -->
                    <div class="w-full ">
                        <CommonSelect v-model="providerState.supplier" default-width="w-full"
                            title="Fournisseur (HUB2, BIZAO...)" :elements="[{ name: 'HUB2', value: 'HUB2' },
                            { name: 'BIZAO', value: 'BIZAO' },
                            { name: 'TOUCH_PAY', value: 'touch_pay' },
                            { name: 'WAVE', value: 'wave' },
                            { name: 'MTN', value: 'mtn' }]">
                        </CommonSelect>
                    </div>
                </section>

                <!-- Frais d'entrée -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Frais d'entrée par défaut</p>
                    <div class="flex gap-3 w-full relative">
                        <Input class="pl-10" id="payin_charge" v-model.number="providerState.default_payin_charge"
                            placeholder="Frais d'entrée par défaut" required />
                        <span
                            class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                            %
                        </span>
                    </div>
                </section>

                <!-- Frais de sortie -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Frais de sortie par défaut</p>

                    <div class="flex gap-3 w-full relative">
                        <Input class="pl-10" id="payout_charge" v-model.number="providerState.default_payout_charge"
                            placeholder="Frais de sortie par défaut" required />
                        <span
                            class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                            %
                        </span>
                    </div>

                </section>

                <!-- Statut de disponibilité -->
                <section class="space-y-2">
                    <p class="flex-1 text-neutral-20">Disponible</p>

                    <div class="flex gap-3 w-full max-w-[512px] relative">
                        <CommonSwitch v-model="providerState.is_available"></CommonSwitch>
                    </div>
                </section>

            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1  text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button @click="createProviderHandler" class="flex-1  text-sm rounded-lg bg-primary font-normal"
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

import { onBeforeMount, ref } from 'vue';
import { useToast } from 'vue-toastification';

import CommonSelect from '@/components/common/commonSelect.vue';
import CommonSwitch from '@/components/common/commonSwitch.vue';
import Input from '@/components/ui/input/Input.vue';
import { useCreateProviderMutation } from '@/composables/queries/useProviderQueries';
import type { ProviderRequest } from '@/services/providers/provider-type';
import { useWindowSize } from '@vueuse/core';

const open = ref(false);
const toast = useToast();
const { width, height } = useWindowSize()



const { mutateAsync: createProvider } = useCreateProviderMutation();


const countries = ref<{ label: string, value: string }[]>([]);

// const countryModel = defineModel({ type: String });

const providerState = ref<ProviderRequest>(
    {
        country: undefined,
        name: undefined,
        method: undefined,
        currency: undefined,
        is_available: true,
        supplier: undefined,
        default_payin_charge: 0,
        default_payout_charge: 0

    }
);

const createProviderHandler = async () => {
    const payload = { ...providerState.value };


    await createProvider(payload);
    providerState.value = {
        country: undefined,
        name: undefined,
        method: undefined,
        currency: undefined,
        is_available: true,
        supplier: undefined,
        default_payin_charge: 0,
        default_payout_charge: 0
    }
    open.value = false;
    toast.success("Le provider a bien été ajouté");

}


</script>