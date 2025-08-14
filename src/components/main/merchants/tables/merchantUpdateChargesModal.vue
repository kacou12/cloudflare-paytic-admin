<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="open = true" title="Modifier les charges"></CommonButton>
        </template>

        <template #title>
            <span>Modification des charges</span>
        </template>
        <template #content>
            <form @submit.prevent="onSubmit" class="space-y-3">
                <Tabs v-model="currentTab">
                    <TabsList class="grid w-full grid-cols-2">
                        <TabsTrigger value="collecte">Collectes</TabsTrigger>
                        <TabsTrigger value="transfert">Transfert</TabsTrigger>
                    </TabsList>

                    <TabsContent value="collecte">
                        <section v-if="merchant.merchant_charges.length == 0"
                            class="h-20 flex justify-center items-center">
                            <p>Aucune charge en collecte</p>
                        </section>
                        <section v-else class="space-y-2" v-for="(merchantCharge, index) in merchant.merchant_charges"
                            :key="index">
                            <p class="text-sm text-neutral-20">{{ merchantCharge.provider.operator }}</p>
                            <div class="flex flex-col w-full relative">

                                <CustomInputField :name="`payout_${merchantCharge.provider.operator}`" id="charge"
                                    v-model="all_payout_charges[index][`${merchantCharge.provider.operator}`]"
                                    :placeholder="`Charge ${merchantCharge.provider.operator}`" />
                            </div>
                        </section>
                    </TabsContent>

                    <TabsContent value="transfert">
                        <section v-if="merchant.merchant_charges.length == 0"
                            class="h-20 flex justify-center items-center">
                            <p>Aucune charge en transfert</p>
                        </section>
                        <section v-else class="space-y-2" v-for="(merchantCharge, index) in merchant.merchant_charges"
                            :key="index">
                            <p class="text-sm text-neutral-20">{{ merchantCharge.provider.operator }}</p>
                            <div class="">
                                <!-- <InputField :name="`payin_${merchantCharge.provider.operator}`" class="pl-10"
                                    id="charge"
                                    v-model="all_payin_charges[index][`${merchantCharge.provider.operator}`]"
                                    :placeholder="`Charge ${merchantCharge.provider.operator}`"  />
                                <span
                                    class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                                    %
                                </span> -->
                                <CustomInputField :name="`payin_${merchantCharge.provider.operator}`" id="charge"
                                    v-model="all_payin_charges[index][`${merchantCharge.provider.operator}`]"
                                    :placeholder="`Charge ${merchantCharge.provider.operator}`" />
                            </div>
                        </section>
                    </TabsContent>
                </Tabs>

                <div class="flex gap-2 px-6 py-5 w-full">
                    <Button type="button" class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                        @click="open = false">
                        Annuler
                    </Button>
                    <Button type="submit" class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal">
                        Confirmer les charges
                    </Button>
                </div>
            </form>
        </template>
    </CommonModal>
</template>

<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useUpdateMerchantChargesMutation } from '@/composables/queries/useMerchantQueries';
import type { MerchantPayinPayoutChargePayload, MerchantResponse } from '@/services/merchants/merchant-type';
import { computed, reactive, ref, type Reactive } from 'vue';
import { useToast } from 'vue-toastification';
import { useForm } from 'vee-validate';
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod';
import CustomInputField from '@/components/vee-validate/CustomInputField.vue';


const { merchant } = defineProps<{
    merchant: MerchantResponse
}>();
const currentTab = ref<'collecte' | 'transfert'>('collecte');

const open = ref(false);

// Créer un schéma dynamique basé sur les charges du merchant
const createPayoutChargeSchema = () => {
    const schemaObj: { [key: string]: any } = {};

    merchant.merchant_charges.forEach((charge, index) => {
        const operator = charge.provider.operator;
        schemaObj[`payout_${operator}`] = z.string()
            .min(1, "Ce champ est requis").refine((val) => !isNaN(Number(val)), "Le montant doit être un nombre.") // Vérifie si la chaîne peut être convertie en un nombre valide
            .transform(Number) // Transforme la chaîne en nombre
            .pipe(
                z.number()
                    .min(0, "Le pourcentage doit être au moins 0%")
                    .max(100, "Le pourcentage ne peut excéder 100%")

            );

    });

    return z.object(schemaObj);
};
const createPayinChargeSchema = () => {
    const schemaObj: { [key: string]: any } = {};

    merchant.merchant_charges.forEach((charge, index) => {
        const operator = charge.provider.operator;
        schemaObj[`payin_${operator}`] = z.string()
            .min(1, "Ce champ est requis").refine((val) => !isNaN(Number(val)), "Le montant doit être un nombre.") // Vérifie si la chaîne peut être convertie en un nombre valide
            .transform(Number) // Transforme la chaîne en nombre
            .pipe(
                z.number()
                    .min(0, "Le pourcentage doit être au moins 0%")
                    .max(100, "Le pourcentage ne peut excéder 100%")
            );
    });

    return z.object(schemaObj);
};

// Initialisation du schéma
const chargeSchema = computed(() => {
    return currentTab.value === 'collecte' ? createPayoutChargeSchema() : createPayinChargeSchema();
});

const { handleSubmit, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(chargeSchema.value),
    // initialValues: merchant as MerchantRequest,
});


const toast = useToast();

const emit = defineEmits(['close']);






const { mutateAsync: updateMerchantCharges } = useUpdateMerchantChargesMutation();



const all_payin_charges = reactive(merchant.merchant_charges.map((el) => {
    return {
        [`${el.provider!.operator}`]: el.payin_charge.toString(),
    }
}));

const all_payout_charges = reactive(merchant.merchant_charges.map((el) => {
    return {
        [`${el.provider!.operator}`]: el.payout_charge.toString(),
    }
}));

const getCurrentValue = (data: Reactive<{
    [x: string]: string;
}[]>, serviceName: string): number => {
    let current_value = 0;

    for (let index = 0; index < data.length; index++) {
        const item = data[index];
        for (const key in item) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
                const value = parseFloat(item[key].toString());
                console.log(`Index ${index}, Key ${key}: ${value}`);
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

const updatePayinMerchantHandler = async () => {

    const payloads: MerchantPayinPayoutChargePayload[] = []

    // const payin_charges = { ...all_payin_charges };
    // const payout_charges = { ...all_payout_charges };


    for (let index = 0; index < merchant.merchant_charges.length; index++) {
        const currentMerchantCharge = merchant.merchant_charges[index];
        let current_cash_in = getCurrentValue(all_payin_charges, merchant.merchant_charges[index].provider!.operator);

        // const payload: ProviderServiceAvailabilityPayload = {
        const payload: MerchantPayinPayoutChargePayload = {

            id: currentMerchantCharge.id,
            payin_charge: current_cash_in,
            payout_charge: currentMerchantCharge.payout_charge

        };
        payloads.push(payload);
    }


    await updateMerchantCharges(payloads);

    toast.success("les charges de transfert du marchant ont bien été modifiés")
};

const updatePayoutMerchantHandler = async () => {

    const payloads: MerchantPayinPayoutChargePayload[] = []

    // const payin_charges = { ...all_payin_charges };
    // const payout_charges = { ...all_payout_charges };


    for (let index = 0; index < merchant.merchant_charges.length; index++) {
        const currentMerchantCharge = merchant.merchant_charges[index];
        let current_cash_out = getCurrentValue(all_payout_charges, merchant.merchant_charges[index].provider!.operator);

        // const payload: ProviderServiceAvailabilityPayload = {
        const payload: MerchantPayinPayoutChargePayload = {

            id: currentMerchantCharge.id,
            payout_charge: current_cash_out,
            payin_charge: currentMerchantCharge.payin_charge

        };
        payloads.push(payload);
    }


    await updateMerchantCharges(payloads);

    // emit('close');



    toast.success("les charges de collecte du marchant ont bien été modifiés")
};

const onSubmit = handleSubmit(async (values) => {
    if (currentTab.value === 'collecte') {
        await updatePayoutMerchantHandler();
    } else {
        await updatePayinMerchantHandler();
    }
    // emit('close');
    open.value = false
});
</script>

<style scoped></style>
