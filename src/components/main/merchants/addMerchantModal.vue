<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="console.log('wapiti')" title="Ajouter un merchant"></CommonButton>
        </template>

        <template #title>
            <span>Nouveau marchant</span>
        </template>
        <template #content>
            <div class="space-y-3">
                <div class="flex gap-4">
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Nom </p>
                        <InputField v-model="merchantState.first_name" name="first_name" id="first_name"
                            placeholder="Nom" required />
                    </section>
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Prenoms</p>
                        <InputField v-model="merchantState.last_name" name="last_name" id="last_name"
                            placeholder="Prenoms" required />
                    </section>
                </div>
                <div class="flex gap-4">
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Nom de l'entreprise</p>
                        <InputField v-model="merchantState.business_name" name="business_name" id="business_name"
                            placeholder="Nom commercial" required />
                    </section>
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Type d'entreprise</p>
                        <InputField v-model="merchantState.business_type" name="business_type" id="business_type"
                            placeholder="Type d'entreprise" required />
                    </section>
                </div>


                <div class="flex gap-4">

                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">rib</p>
                        <InputField v-model="merchantState.rib" name="rib" id="rib"
                            placeholder="CI10590100112024345600240" />
                    </section>
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Identifiant fiscal</p>
                        <InputField v-model="merchantState.tax_id" name="tax_id" id="tax_id"
                            placeholder="Identifiant fiscal" required />
                    </section>
                </div>



                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Adresse</p>
                    <InputField v-model="merchantState.address" name="address" id="address" placeholder="Adresse"
                        required />
                </section>

                <section class="space-y-2 ">
                    <p class="text-sm text-neutral-20">Numéro d'enregistrement</p>
                    <InputField v-model="merchantState.registration_no" name="registration_no" id="registration_no"
                        placeholder="CI-ABJ-03-2020-A10-00001" required />
                </section>


                <div class="flex gap-4">
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Téléphone</p>
                        <InputField v-model="merchantState.phone" name="phone" id="phone" placeholder="Téléphone"
                            required />
                    </section>
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Email</p>
                        <InputField v-model="merchantState.email" name="email" id="email" placeholder="Email"
                            required />
                    </section>
                </div>

                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Site web (optionnel)</p>
                    <InputField v-model="merchantState.website" name="website" id="website"
                        placeholder="https://www.example.com" />
                </section>
            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">
                <Button class="flex-1 text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button type="submit" class="flex-1 text-sm rounded-lg bg-primary font-normal">
                    Créer maintenant
                </Button>
            </div>
        </template>
    </CommonModal>
    <ConfirmMerchantInfosModal @close="openConfirm = false" :password :email v-model:open="openConfirm">
    </ConfirmMerchantInfosModal>
</template>

<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import InputField from '@/components/vee-validate/InputField.vue'; // Correct path to InputField
import { useCreateMerchantMutation } from '@/composables/queries/useMerchantQueries';
import type { MerchantRequest } from '@/services/merchants/merchant-type';
import { useWindowSize } from '@vueuse/core';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { merchantRequestSchema } from '@/services/merchant-request/merchant-request-schema';
import ConfirmMerchantInfosModal from '@/components/common/confirmMerchantInfosModal.vue';


const open = ref(false);
const toast = useToast();
const email = ref("");
const password = ref("");
const openConfirm = ref(false);

const { width, height } = useWindowSize();


const { mutateAsync: createMerchant } = useCreateMerchantMutation();

const merchantState = ref<MerchantRequest>(
    {
        address: "",
        email: "",
        phone: "",
        rib: "",
        first_name: "",
        last_name: "",
        business_name: "",
        business_type: "",
        registration_no: "",
        tax_id: "",
        website: "",
    }
);

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(merchantRequestSchema),
    initialValues: merchantState.value,
});

const onSubmit = handleSubmit(async (values) => {
    const payload = values as MerchantRequest;

    try {

        const merchantResponse = await createMerchant(payload);

        password.value = merchantResponse.password;
        email.value = merchantResponse.email;


        toast.success("Le merchant a bien été ajouté");
        open.value = false;
        openConfirm.value = true;
        resetForm();
        merchantState.value = {
            address: "",
            email: "",
            phone: "",
            rib: "",
            first_name: "",
            last_name: "",
            business_name: "",
            business_type: "",
            registration_no: "",
            tax_id: "",
            website: "",
        };

    } catch (err) {

    }
});

watch(open, (newValue) => {
    if (newValue) {
        merchantState.value = {
            address: "",
            email: "",
            phone: "",
            first_name: "",
            last_name: "",
            business_name: "",
            business_type: "",
            rib: "",
            registration_no: "",
            tax_id: "",
            website: "",
        };
        resetForm();
    }
});
</script>

<style scoped></style>