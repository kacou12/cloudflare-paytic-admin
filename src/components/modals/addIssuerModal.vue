<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="console.log('wapiti')" title="Ajouter un issuer"></CommonButton>
        </template>

        <template #title>
            <span>Nouvel issuer</span>
        </template>
        <template #content>
            <div class="space-y-3">
                <!-- First section  -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20"></p>
                    <Input type="title" id="title" placeholder="nom du issuer" v-model="issuerState.name" class=""
                        required />
                </section>




            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1  text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button @click="createIssuerHandler" class="flex-1  text-sm rounded-lg bg-primary font-normal"
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
import { useCreateIssuerMutation } from '@/composables/queries/useIssuerQueries';

import type { IssuerRequest } from '@/services/issuers/issuer-type';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { Input } from '../ui/input';

const open = ref(false);
const toast = useToast();

const { mutateAsync: createIssuer } = useCreateIssuerMutation();


const issuerState = ref<IssuerRequest>(
    {
        // cashin_rate: 0,
        // cashout_rate: 0,
        name: ""
    }
);

const createIssuerHandler = async () => {
    const payload = { ...issuerState.value };


    await createIssuer(payload);
    issuerState.value = {
        // cashin_rate: 0,
        // cashout_rate: 0,
        name: ""
    }
    open.value = false;
    toast.success("L'issuer a bien été ajoutée");

}


</script>