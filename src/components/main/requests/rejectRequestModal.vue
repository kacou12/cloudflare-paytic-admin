<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <!-- <CommonButton type="default" @action="console.log('wapiti')" title="Créer un compte"></CommonButton> -->
            <Button class="w-full py-[22px] text-sm rounded-lg font-medium" variant="destructive">
                Refuser
            </Button>
        </template>

        <template #title>
            <span>REJET DE LA REQUETE</span>
        </template>
        <template #content class="">
            <!-- First section  -->
            <div class="space-y-4">
                <section class="  ">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Motif de rejet</p>
                    </div>
                    <div class=" w-full max-w-[512px]">
                        <Input v-model="payloadState.reason" type="text" id="name" placeholder="Motif de rejet"
                            class="py-2 pr-12">
                        </Input>

                    </div>
                </section>

            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">
                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button @click="rejectMerchantRequestHandler"
                    class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                    Rejeter
                </Button>
            </div>
        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRejectMerchantRequestMutation } from '@/composables/queries/useMerchantRequestQueries';
import { MerchantRequestStatusEnum } from '@/constants/constant.enum';
import type { RejectMerchantRequest } from '@/services/merchant-request/merchant-request-schema';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const { id } = defineProps({
    id: {
        type: String,
        required: true,
    }
})
const emits = defineEmits(['close']);

const payloadState = ref<RejectMerchantRequest>(
    {
        reason: undefined,
        status: MerchantRequestStatusEnum.Rejected

    }
);

const route = useRoute()
const { startLoading, stopLoading, stopLoadingSkeleton } = useLoaderStore();

const { mutateAsync: rejectMerchantRequest } = useRejectMerchantRequestMutation(id);


const rejectMerchantRequestHandler = async (id: string) => {

    await rejectMerchantRequest(payloadState.value);
    open.value = false
    emits('close');
};


const open = ref(false);


</script>