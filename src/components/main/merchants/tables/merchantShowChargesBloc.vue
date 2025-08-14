<template>
    <DialogHeader class="flex flex-row justify-between items-center">
        <DialogTitle>details des charges</DialogTitle>

        <DialogClose
            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <close-icon></close-icon>
        </DialogClose>
    </DialogHeader>
    <div class="text-sm px-6   my-8 ">
        <!-- content -->
        <div class="space-y-3">
            <Tabs v-model="currentTab">
                <TabsList class="grid w-full grid-cols-2">
                    <TabsTrigger value="collecte">Collectes</TabsTrigger>
                    <TabsTrigger value="transfert">Transfert</TabsTrigger>
                </TabsList>

                <TabsContent value="collecte">
                    <section v-if="merchant.merchant_charges.length == 0" class="h-20 flex justify-center items-center">
                        <p>Aucune charge en collecte</p>
                    </section>
                    <section v-else class="space-y-2" v-for="merchantCharge, index in merchant.merchant_charges">
                        <p class="text-sm text-neutral-20">{{ merchantCharge.provider.operator }}</p>
                        <div class="flex gap-3 w-full relative">
                            <Input class="pl-10" id="charge" disabled
                                v-model="all_payout_charges[index][`${merchantCharge.provider.operator}`]"
                                :placeholder="`Charge ${merchantCharge.provider.operator}`" required />
                            <span
                                class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                                %
                            </span>
                        </div>
                    </section>


                </TabsContent>

                <TabsContent value="transfert">
                    <section v-if="merchant.merchant_charges.length == 0" class="h-20 flex justify-center items-center">
                        <p>Aucune charge en transfert</p>
                    </section>
                    <section v-else class="space-y-2" v-for="merchantCharge, index in merchant.merchant_charges">
                        <p class="text-sm text-neutral-20">{{ merchantCharge.provider.operator }}</p>
                        <div class="flex gap-3 w-full relative">
                            <Input class="pl-10" id="charge" disabled
                                v-model="all_payin_charges[index][`${merchantCharge.provider.operator}`]"
                                :placeholder="`Charge ${merchantCharge.provider.operator}`" required />
                            <span
                                class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                                %
                            </span>
                        </div>
                    </section>

                </TabsContent>

            </Tabs>

        </div>
    </div>

</template>

<script setup lang="ts">
import {
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';
import DialogClose from '@/components/ui/dialog/DialogClose.vue';
import Input from '@/components/ui/input/Input.vue';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { MerchantResponse } from '@/services/merchants/merchant-type';
import { reactive, ref } from 'vue';

const { merchant } = defineProps<{
    merchant: MerchantResponse
}>();

const currentTab = ref<'collecte' | 'transfert'>('collecte');


const all_payin_charges = reactive(merchant.merchant_charges.map((el) => {
    return {
        [`${el.provider!.operator}`]: el.payin_charge,
    }
}));

const all_payout_charges = reactive(merchant.merchant_charges.map((el) => {
    return {
        [`${el.provider!.operator}`]: el.payout_charge,
    }
}));


</script>

<style scoped></style>