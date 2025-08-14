<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="console.log('wapiti')" title="Modifier profil"></CommonButton>
        </template>

        <template #title>
            <span>Modification du merchant</span>
        </template>
        <template #content class="">
            <div class="space-y-3">
                <div class="flex gap-4">
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Nom </p>
                        <InputField v-model="merchantState.first_name" name="firstname" id="firstname"
                            placeholder="Nom" />
                    </section>
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Prenoms</p>
                        <InputField v-model="merchantState.last_name" name="lastname" id="lastname"
                            placeholder="Prenoms" />
                    </section>
                </div>
                <div class="flex gap-4">
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Nom de l'entreprise</p>
                        <InputField v-model="merchantState.business_name" name="business_name" id="business_name"
                            placeholder="Nom commercial" />
                    </section>
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Type d'entreprise</p>
                        <InputField v-model="merchantState.business_type" name="business_type" id="business_type"
                            placeholder="Type d'entreprise" />
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
                            placeholder="Identifiant fiscal" />
                    </section>
                </div>



                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Adresse</p>
                    <InputField v-model="merchantState.address" name="address" id="address" placeholder="Adresse" />
                </section>

                <section class="space-y-2 ">
                    <p class="text-sm text-neutral-20">Numéro d'enregistrement</p>
                    <InputField v-model="merchantState.registration_no" name="registration_no" id="registration_no"
                        placeholder="CI-ABJ-03-2020-A10-00001" />
                </section>


                <div class="flex gap-4">
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Téléphone</p>
                        <InputField v-model="merchantState.phone" name="phone" id="phone" placeholder="Téléphone" />
                    </section>
                    <section class="space-y-2 flex-1">
                        <p class="text-sm text-neutral-20">Email</p>
                        <InputField v-model="merchantState.email" name="email" id="email" placeholder="Email" />
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
                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button type="submit" class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal">
                    Confirmer
                </Button>
            </div>
        </template>

    </CommonModal>
</template>

<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import InputField from '@/components/vee-validate/InputField.vue'; // Make sure this path is correct

import { useUpdateMerchantMutation } from '@/composables/queries/useMerchantQueries';
import type { MerchantRequest, MerchantResponse } from '@/services/merchants/merchant-type';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { merchantRequestSchema } from '@/services/merchant-request/merchant-request-schema'; // Assuming the path is correct
import { ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { useWindowSize } from '@vueuse/core'; // Only if still used elsewhere


const props = defineProps<{
    merchant: MerchantResponse
}>();

const toast = useToast();
const { width, height } = useWindowSize(); // Kept if you use it for responsive logic

const open = ref(false); // Controls modal visibility

// Initialize merchantState with the prop's data
const merchantState = ref<MerchantRequest>({ ...props.merchant });

// VeeValidate form setup
const { handleSubmit, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(merchantRequestSchema),
    initialValues: merchantState.value, // Initialize with the prop's data
});

const { mutateAsync: updateMerchant } = useUpdateMerchantMutation(props.merchant.id);

const onSubmit = handleSubmit(async (values) => {
    // values will contain the validated form data
    const payload = values as MerchantRequest;

    await updateMerchant(payload);

    toast.success("Le merchant a bien été modifié !");
    open.value = false;
    // resetForm() might clear the values, but since it's an edit,
    // we want to ensure the modal's state reflects the updated data if it re-opens
    // or if the parent prop changes.
});

// Watch for changes in the 'open' state of the modal
// When the modal opens (newValue is true), re-initialize the form with the current merchant prop data
watch(open, (newValue) => {
    if (newValue) {
        // Reset form to initial values (from props.merchant) and clear errors/touched state
        setValues({ ...props.merchant });
        resetForm({ values: { ...props.merchant } });
        // Also update the local merchantState ref for v-model binding
        merchantState.value = { ...props.merchant };
    }
});

// If you still need deleteMerchantHandler, keep it, but it's not tied to this form's submit.
// const { mutateAsync: deleteMerchant } = useDeleteMerchantMutation(merchant.id);
// const deleteMerchantHandler = async () => { /* ... */ };

// The contentModalAction and isBlocked are not part of this form, keep if used elsewhere.
// const contentModalAction = ref<"SHOW" | "UPDATE_PROFIL" | "UPDATE_CHARGES" | "SHOW_CHARGES" | "DELETE" | "WEBHOOKS_AND_KEYS">();
// const isBlocked = computed(() => false); // Adjusted as per your previous code
// function copy(id: string) { /* ... */ }

</script>

<style scoped></style>