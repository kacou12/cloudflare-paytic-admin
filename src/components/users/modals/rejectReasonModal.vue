<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open">
        <template #trigger>

            <Button class=" py-[22px]  text-sm rounded-lg" variant="outline">
                Rejeter la verification
            </Button>
        </template>

        <template #title>
            <span>Quel est le motif du rejet</span>
        </template>
        <template #content>
            <section class="user-informations space-y-3">
                <p class="font-medium">Êtes-vous sûr(e) de vouloir rejeter cette vérification ?</p>

                <p class="text-neutral-20">Nous comprenons que cette décision peut avoir un impact
                    important pour
                    l’utilisateur.
                    Assurez-vous que le motif de rejet sélectionné est précis et justifié pour éviter
                    toute
                    confusion ou frustration.</p>

            </section>

            <RejectReasonSelect class="mt-5"></RejectReasonSelect>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 pb-5 w-full">

                <Button class="flex-1 py-[22px] text-sm rounded-lg" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button class="flex-1 py-[22px] text-sm rounded-lg" variant="destructive">
                    Confirmer le rejet
                </Button>
            </div>
        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CommonModal from '@/components/common/commonModal.vue'
import { Button } from '@/components/ui/button'
import { ref } from 'vue'
import RejectReasonSelect from '../selects/rejectReasonSelect.vue';

const open = ref(false);
</script>