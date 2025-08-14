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
                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'SHOW'">
                            Voir les details
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'UPDATE'">Modifier</DropdownMenuItem>
                    </DialogTrigger>
                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'DELETE'">Supprimer</DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent class="sm:max-w-[480px] font-worksans">
                <article v-if="contentModalAction == 'UPDATE'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Modification de la charge</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>
                    </DialogHeader>
                    <div class="text-sm px-6 my-8">
                        <div class="space-y-3">

                            <!-- Charge -->
                            <section class="space-y-2">
                                <p class="text-sm text-neutral-20">Charge</p>
                                <div class="flex gap-3 w-full relative">
                                    <Input class="pl-10" id="charge" v-model.number="chargeState.charge"
                                        placeholder="Charge" required />
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
                                    title="Provider"
                                    :elements="providersData!.items.map(provider => ({ name: provider.operator, value: provider.id }))">
                                </CommonSelect>
                                <!-- <CommonComboBoxCountry v-model="providerState.country"></CommonComboBoxCountry> -->
                            </section>

                            <!-- merchant -->
                            <section class="space-y-2">
                                <p class="text-sm text-neutral-20">Choix du marchant</p>
                                <CommonSelect v-if="isMerchantFetched" v-model="merchantModel" default-width="w-full"
                                    title="marchand"
                                    :elements="merchantsData!.items.map(merchant => ({ name: merchant.business_name, value: merchant.id }))">
                                </CommonSelect>
                                <!-- <CommonComboBoxCountry v-model="providerState.country"></CommonComboBoxCountry> -->
                            </section>




                        </div>
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6">
                        <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="updateChargeHandler"
                            class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                </article>

                <article v-else-if="contentModalAction == 'DELETE'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Supprimer cette charge</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>
                    </DialogHeader>
                    <div class="text-sm px-6 my-8 text-center">
                        <p>Etes vous sur de vouloir supprimer cette charge ?</p>
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6">
                        <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="deleteChargeHandler"
                            class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                </article>

                <article v-else-if="contentModalAction == 'SHOW'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Detail de la charge</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70 transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>
                    </DialogHeader>
                    <div class="text-sm px-6 my-8">
                        <div class="space-y-3">
                            <section class="space-y-2">
                                <p class="text-sm text-neutral-20">Charge </p>
                                <div class="flex gap-3 w-full relative">
                                    <Input class="pl-10" id="charge" v-model="charge.charge" disabled />
                                    <span
                                        class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                                        %
                                    </span>
                                </div>
                            </section>
                            <section class="space-y-2">
                                <p class="text-sm text-neutral-20">Provider</p>
                                <Input type="text" id="provider_id" v-model="charge.provider.operator" disabled />
                            </section>
                            <section class="space-y-2">
                                <p class="text-sm text-neutral-20">Marchant</p>
                                <Input type="text" id="merchant_id" v-model="charge.merchant.business_name" disabled />
                            </section>

                        </div>
                    </div>
                </article>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import CommonSelect from '@/components/common/commonSelect.vue'
import closeIcon from '@/components/svg/closeIcon.vue'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Input from '@/components/ui/input/Input.vue'
import { useDeleteChargeMutation, useUpdateChargeMutation } from '@/composables/queries/useChargeQueries'
import { useMerchantsFiltersQuery } from '@/composables/queries/useMerchantQueries'
import { useProvidersFiltersQuery } from '@/composables/queries/useProviderQueries'
import type { ChargeRequest, ChargeResponse } from '@/services/charge/charge-type'
import { MoreHorizontal } from 'lucide-vue-next'
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const { charge } = defineProps<{
    charge: ChargeResponse
}>();

const { mutateAsync: updateCharge } = useUpdateChargeMutation(charge.id.toString());
const { mutateAsync: deleteCharge } = useDeleteChargeMutation(charge.id.toString());


const { isFetched: isProviderFetched, data: providersData } = useProvidersFiltersQuery();
const { isFetched: isMerchantFetched, data: merchantsData } = useMerchantsFiltersQuery();

const toast = useToast();

const chargeState = ref<ChargeRequest>({

    merchant_id: charge.merchant_id,
    provider_id: charge.provider_id,
    charge: charge.charge
});


const [merchantModel, _] = defineModel('merchantModel', {
    set(value: string) {

        chargeState.value.merchant_id = parseInt(value)

        return value;
    },
    get(v) {
        return v == undefined ? chargeState.value.merchant_id?.toString() : v.toString();

    },

})

const [providerModel, __] = defineModel('providerModel', {
    set(value: string) {

        chargeState.value.provider_id = parseInt(value)

        return value;
    },
    get(v) {
        return v == undefined ? chargeState.value.provider_id?.toString() : v.toString();

    },
})


const updateChargeHandler = async () => {
    await updateCharge(chargeState.value);
    open.value = false;
    toast.success("La charge a bien été modifiée");
}

const deleteChargeHandler = async () => {
    await deleteCharge();
    open.value = false;
    toast.success("La charge a bien été supprimée");
}

const open = ref(false);
const contentModalAction = ref<"SHOW" | "UPDATE" | "DELETE">();
</script>
