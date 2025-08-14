<template>
    <CommonModal :handle-submit="onSubmit" backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CustomButton type="outline">
                <div class="flex items-center gap-2">
                    <UserPlus2 class="w-5 h-5 mr-2" />
                    <span>GENERATE TOKEN</span>
                </div>
            </CustomButton>
        </template>

        <template #title>
            <span>API token</span>
        </template>
        <template #content>
            <!-- Suppression de la balise form puisque le modal gère la soumission -->
            <div class="space-y-4">
                <!-- Name Section -->
                <section>
                    <div>
                        <p class="flex-1 text-neutral-20">Nom</p>
                    </div>
                    <div class="w-full max-w-[512px]">
                        <CustomInputField name="name" id="name" v-model="name" placeholder="Api token name"
                            class="py-2 pr-12" />
                    </div>
                </section>

                <!-- Environment Section -->
                <section>
                    <div>
                        <p class="flex-1 text-neutral-20">Environnement</p>
                    </div>
                    <div>
                        <SelectField name="environment" v-model="environment" border-color="border-neutral-60"
                            default-width="w-full" title="Environnement" :elements="[
                                { name: 'SandBox', value: EnvironmentsEnum.Sandbox },
                                { name: 'Live', value: EnvironmentsEnum.Live },
                            ]" />
                    </div>
                </section>
            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">
                <Button type="button" class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                    @click="open = false">
                    Annuler
                </Button>
                <Button type="submit" class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal">
                    Generate
                </Button>
            </div>
        </template>
    </CommonModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { useToast } from 'vue-toastification';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { EnvironmentsEnum } from '@/constants/constant.enum';
import { useCreateKeyMutation } from '@/composables/queries/useKeyQueries';
import type { KeyRequest } from '@/services/keys/key-type';
import CustomInputField from '@/components/vee-validate/CustomInputField.vue';

// Components
import CustomButton from '@/components/buttons/customButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import CommonSelect from '@/components/common/commonSelect.vue';
import { Button } from '@/components/ui/button';
import { UserPlus2 } from 'lucide-vue-next';
import { keySchema } from '@/services/keys/key-schema';
import SelectField from '@/components/vee-validate/selectField.vue';

const open = ref(false);
const environment = ref('');
const name = ref('');

const route = useRoute();
const toast = useToast();
const { startLoading } = useLoaderStore();
const { mutateAsync: createKey } = useCreateKeyMutation(route.params.id as string);

// Définition du schéma de validation
// const keySchema = z.object({
//     name: z.string().min(1, "Le nom est requis"),
//     environment: z.nativeEnum(EnvironmentsEnum, {
//         required_error: "L'environnement est requis",
//     }),
// });

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(keySchema),
});

const onSubmit = handleSubmit(async (values) => {
    const payload: KeyRequest = {
        environment: values.environment,
        merchant_id: route.params.id as string,
        name: values.name!
    };

    startLoading();
    try {
        await createKey(payload);
        toast.success("Token généré avec succès");
        open.value = false;
        // Réinitialiser les champs si nécessaire
        resetForm();
    } catch (error) {
        toast.error("Erreur lors de la génération du token");
    }
});
</script>