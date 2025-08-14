<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <div class="cursor-pointer " @click.prevent.stop="() => console.log('dd')">
                <CustomCommonSwitch :default-active="isActive"></CustomCommonSwitch>
            </div>
        </template>

        <template #title>Confirmation</template>
        <template #content>
            <div class=" text-center">
                Voulez vous vraiment effectuer cette action ?
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
import CustomCommonSwitch from '@/components/custom-shadcn/customCommonSwitch.vue';

import { Button } from '@/components/ui/button';
import { ref } from 'vue';

const { defaultActive, confirmHandler } = defineProps({
    defaultActive: {
        type: Boolean,
        required: true
    },
    confirmHandler: {
        type: Function,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})

const isActive = ref(defaultActive);


const open = ref(false);


const valideHandler = () => {
    open.value = false;
    isActive.value = !isActive.value;
    confirmHandler();
}


</script>

<style scoped></style>