<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <slot></slot>
        </template>

        <template #title>Confirmation</template>
        <template #content>
            <div class=" text-center">
                {{ confirmText }}
            </div>

        </template>



        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">
                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button @click="valideHandler" class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal"
                    variant="default">
                    Confirmer
                </Button>
            </div>

        </template>

    </CommonModal>
</template>

<script setup lang="ts">
import CommonModal from '@/components/common/commonModal.vue';

import { Button } from '@/components/ui/button';
import { ref } from 'vue';




const { confirmHandler } = defineProps({

    confirmHandler: {
        type: Function,
        required: true
    },
    confirmText: {
        type: String,
        required: false,
        default: "Voulez vous vraiment effectuer cette action ?"
    }
})


const open = ref(false);


const valideHandler = async () => {
    await confirmHandler();
    open.value = false;
}


</script>

<style scoped></style>