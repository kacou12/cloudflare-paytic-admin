<template>
    <div class="">

        <Dialog v-model:open="open">

            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button variant="ghost" class="w-8 h-8 p-0 text-neutral-30">
                        <span class="sr-only">Open menu</span>
                        <MoreHorizontal class="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" class="text-xs text-neutral-10 font-worksans">

                    <!-- OPEN USER ACCOUNT MODAL -->
                    <!-- <DialogTrigger as-child>

                        <DropdownMenuItem @click="contentModalAction = 'SHOW_PROVIDERS'">
                            Voir les providers
                        </DropdownMenuItem>
                    </DialogTrigger> -->

                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'UPDATE_PROVIDERS'">Modifier les providers
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <!-- <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'DELETE'">Supprimer</DropdownMenuItem>
                    </DialogTrigger> -->

                </DropdownMenuContent>
            </DropdownMenu>

            <!-- USER ACCOUNT MODAL -->
            <DialogContent class="max-w-[90%] rounded-lg sm:max-w-[480px] font-worksans ">
                <article v-if="contentModalAction == 'UPDATE_PROVIDERS'">

                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Modification de providers</DialogTitle>
                        <!-- CLOSE ICON SVG -->
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <!-- <X class="w-4 h-4" />
                            <span class="sr-only">Close</span> -->
                            <close-icon></close-icon>

                        </DialogClose>


                    </DialogHeader>
                    <div class="text-sm px-6   my-8 space-y-4">
                        <!-- content -->
                        <div class="space-y-5">
                            <div class="space-y-2">
                                <p class="text-sm text-neutral-20">Nom de l'agreggateur</p>
                                <Input disabled :default-value="groupedIssuerRates.issuer.name" type="text"
                                    id="issuer_name" />
                            </div>


                            <div class="space-y-2">
                                <p class="text-sm text-neutral-20">Choix du provider</p>
                                <!-- <CommonSelect v-if="isFetchedProvider"
                                    v-model="issuersProviderRateActionState.provider_id"
                                    border-color="border-neutral-60" default-width="w-full" class="w-full"
                                    title="Choix du provider"
                                    :elements="groupedIssuerRates!.providers.map((provider) => ({ name: `${provider.provider.name}(${provider.provider.country.name})`, value: provider.provider_id }))">
                                </CommonSelect> -->
                                <CommonSelect v-if="isFetchedProvider"
                                    v-model="issuersProviderRateActionState.provider_id"
                                    border-color="border-neutral-60" default-width="w-full" class="w-full"
                                    title="Choix du provider" :elements="groupedIssuerRates!.providers.map((provider) => ({
                                        name: `${provider.provider.operator} `,
                                        value: provider.provider.id,

                                    }))">
                                </CommonSelect>
                            </div>

                        </div>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">taux de collecte (cash out)</p>
                            <div class="flex gap-3 w-full relative">
                                <Input class="pl-14" id="cashin_rate" v-model="cashout_rate_model"
                                    placeholder="cash out rate" required />
                                <span
                                    class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                                    %
                                </span>
                            </div>
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">taux de transfert (cash in)</p>
                            <div class="flex gap-3 w-full relative">
                                <Input class="pl-14" id="cashin_rate" v-model="cashin_rate_model"
                                    placeholder="cash in rate" required />
                                <span
                                    class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                                    %
                                </span>
                            </div>
                        </section>

                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6 ">

                        <!-- <Button class="flex-1 py-[22px]  text-sm rounded-lg" variant="outline">
                            Rejeter la verification
                        </Button> -->
                        <Button class="flex-1 md:py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="updateIssuerHandler"
                            class="flex-1 md:py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                    <!-- <common-modal></common-modal> -->
                </article>


            </DialogContent>
        </Dialog>

    </div>
</template>
<script setup lang="ts">
import CommonSelect from '@/components/common/commonSelect.vue'
import closeIcon from '@/components/svg/closeIcon.vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-vue-next'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'

import Input from '@/components/ui/input/Input.vue'
import { useUpdateIssuerProviderRateMutation } from '@/composables/queries/useIssuerProviderRateQueries'
import { useIssuersFiltersQuery } from '@/composables/queries/useIssuerQueries'
import { useProvidersFiltersQuery } from '@/composables/queries/useProviderQueries'
import type { GroupedIssuerRates, IssuerProviderRateResponse, UpdateIssuerProviderRateUpdatePayload } from '@/services/issuer-provider-rate/Issuer-provider-rate-type'
import { computed, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'

const { groupedIssuerRates } = defineProps<{
    groupedIssuerRates: GroupedIssuerRates
}>();


const { mutateAsync: updateIssuersProviderRate } = useUpdateIssuerProviderRateMutation()
const { data: issuersData, isFetched: isFetchedIssuer } = useIssuersFiltersQuery();
const { data: providersData, isFetched: isFetchedProvider } = useProvidersFiltersQuery();
// const { mutateAsync: deleteIssuer } = useDeleteIssuerMutation(issuersProviderRate.id);

const toast = useToast();


const issuersProviderRateActionState = ref<IssuerProviderRateResponse>({
    cashin_rate: groupedIssuerRates.providers[0].cashin_rate,
    cashout_rate: groupedIssuerRates.providers[0].cashout_rate,
    id: groupedIssuerRates.id,
    issuer_id: groupedIssuerRates.issuer_id,
    provider_id: groupedIssuerRates.providers[0].provider_id,
    issuer: groupedIssuerRates.issuer,
    provider: groupedIssuerRates.providers[0].provider,
});

// watch(() => issuersProviderRateActionState.value.provider_id, (n, o) => {
//     currentCountryProvider.value = n;

// }, { immediate: true, deep: true })

const cashin_rate_model = defineModel('cashin_rate_model', {
    set(value: string) {

        issuersProviderRateActionState.value.cashin_rate = parseFloat(value);

        return value
    },
    get(v) {
        if (v === undefined) {
            const default_cashin_rate = issuersProviderRateActionState.value.cashin_rate;
            return default_cashin_rate;
        }
        return v;
    },
    default: undefined,

});

const cashout_rate_model = defineModel('cashout_rate_model', {
    set(value: string) {

        issuersProviderRateActionState.value.cashout_rate = parseFloat(value);

        return value
    },
    get(v) {
        if (v === undefined) {
            const default_cashout_rate = issuersProviderRateActionState.value.cashout_rate;
            return default_cashout_rate;
        }
        return v;
    },
    default: undefined,

});


watch(() => issuersProviderRateActionState.value.provider_id, (n, o) => {
    const findedProvider = groupedIssuerRates.providers.find((provider) => {
        return provider.provider_id == n;

    })

    issuersProviderRateActionState.value.cashin_rate = findedProvider!.cashin_rate;
    issuersProviderRateActionState.value.cashout_rate = findedProvider!.cashout_rate;
    issuersProviderRateActionState.value.provider = findedProvider!.provider;
    issuersProviderRateActionState.value.provider_id = findedProvider!.provider.id;

})

const updateIssuerHandler = async () => {
    const findedProvider = groupedIssuerRates.providers.find((provider) => {
        return provider.provider_id == issuersProviderRateActionState.value.provider_id;

    })
    // const payload = { ...issuersProviderRateActionState.value };
    const payload: UpdateIssuerProviderRateUpdatePayload = {
        cashin_rate: issuersProviderRateActionState.value.cashin_rate,
        cashout_rate: issuersProviderRateActionState.value.cashout_rate,
        id: findedProvider?.id_line_to_update!
    };
    await updateIssuersProviderRate(payload);
    open.value = false;
    toast.success("Les taux ont bien été modifiés");

}

// const deleteIssuerHandler = async () => {
//     await deleteIssuer();
//     open.value = false;
//     toast.success("L'issuer a bien été supprimée");
// }




const open = ref(false);
const contentModalAction = ref<"SHOW_PROVIDERS" | "UPDATE_PROVIDERS" | "DELETE">();


function copy(id: string) {
    navigator.clipboard.writeText(id)
}
</script>