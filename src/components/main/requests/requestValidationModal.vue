<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <!-- <CommonButton type="default" @action="console.log('wapiti')" title="Créer un compte"></CommonButton> -->
            <CustomButton class="text-xs" variant="default" size="sm">
                <div class="flex items-center">
                    <Eye class="w-4 h-4 mr-2"></Eye>
                    <span>Examiner</span>
                </div>
            </CustomButton>
        </template>

        <template #title>
            <span v-if="request.status == MerchantRequestStatusEnum.Pending">VALIDATION DE LA REQUETE</span>
            <span v-else>RESUME DE LA REQUETE</span>
        </template>
        <template #content>
            <div class="space-y-6">
                <section v-if="request.status === 'Rejected'">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Raison du rejet</h3>
                    <div class="w-full max-w-[512px]">
                        <Input :default-value="request.reason" type="text" id="reason" placeholder="Raison du rejet"
                            class="py-2 pr-12 bg-gray-100" disabled>
                        </Input>
                    </div>
                </section>

                <section>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Détails de la requête</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-4 border rounded-lg bg-white">
                        <div>
                            <p class="text-sm text-gray-500">Montant</p>
                            <p class="text-base font-medium text-gray-900">{{ formatPrice(request.amount,
                            ) }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Statut</p>
                            <p class="text-base font-medium text-gray-900">{{ request.status }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Type de requête</p>
                            <p class="text-base font-medium text-gray-900">{{ request.type ===
                                MerchantRequestTypeEnum.Deposit ? 'Depot' : 'Retrait' }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Date de création</p>
                            <p class="text-base font-medium text-gray-900">{{ new
                                Date(request.created_at).toLocaleString() }}</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Informations du marchand</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 p-4 border rounded-lg bg-white">
                        <div>
                            <p class="text-sm text-gray-500">Nom de l'entreprise</p>
                            <p class="text-base font-medium text-gray-900">{{ request.merchant.business_name }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Email</p>
                            <p class="text-base font-medium text-gray-900">{{ request.merchant.email }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">Téléphone</p>
                            <p class="text-base font-medium text-gray-900">{{ request.merchant.phone }}</p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500">ID du marchand</p>
                            <p class="text-xs font-mono text-gray-700">{{ request.merchant.id }}</p>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">Document soumis</h3>
                    <DocumentRequest :document-url="request.file_url" class="cursor-pointer">
                    </DocumentRequest>
                </section>

            </div>
        </template>
        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full "
                v-if="request.status == MerchantRequestStatusEnum.Pending || request.status == MerchantRequestStatusEnum.InProgress">

                <div class="flex-1">

                    <RejectRequestModal @close="onSuccessReject" :id="request.id"></RejectRequestModal>
                </div>
                <div class="flex-1">

                    <ConfirmModal v-if="request.status == MerchantRequestStatusEnum.Pending"
                        :confirmHandler="workInProgressMerchantRequestHandler"
                        confirm-text="Voulez vous vraiment initier le traitement de cette requete ?">
                        <Button class="w-full py-[22px] text-sm rounded-lg font-medium">
                            initier le traitement
                        </Button>
                    </ConfirmModal>
                    <ConfirmModal v-if="request.status == MerchantRequestStatusEnum.InProgress"
                        :confirmHandler="validateMerchantRequestHandler"
                        confirm-text="Voulez vous vraiment marquer cette requete comme validée ?">
                        <Button class="w-full py-[22px]  text-sm rounded-lg font-medium">
                            Valider
                        </Button>
                    </ConfirmModal>
                </div>
            </div>
        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import ConfirmModal from '@/components/modals/confirmModal.vue';
import { Button } from '@/components/ui/button';
import { useValidateMerchantRequestMutation } from '@/composables/queries/useMerchantRequestQueries';
import { MerchantRequestStatusEnum, MerchantRequestTypeEnum } from '@/constants/constant.enum';
import type { MerchantRequestResponse } from '@/services/merchant-request/merchant-request.type';
import { useFileDialog } from '@vueuse/core';
import { Eye } from 'lucide-vue-next';
import { ref, type PropType } from 'vue';
import { useToast } from 'vue-toastification';
import DocumentRequest from './documentRequest.vue';
import RejectRequestModal from './rejectRequestModal.vue';
import Input from '@/components/ui/input/Input.vue';
import { formatPrice } from '@/lib/utils';
const toast = useToast();

const { request } = defineProps({
    request: {
        type: Object as PropType<MerchantRequestResponse>,
        required: true,
    }
})

const { mutateAsync: validateMerchantRequest } = useValidateMerchantRequestMutation(request.id);

const validateMerchantRequestHandler = async () => {

    await validateMerchantRequest();
    open.value = false
    toast.success("La requete a bien été validée");
};
const workInProgressMerchantRequestHandler = async () => {
    // await validateMerchantRequest();
    // open.value = false
    // toast.success("La requete a bien été validée");
};

const onSuccessReject = () => {

    open.value = false
    toast.success("La requete a bien été refusée");
}


const { files, open: openSelectFile, reset, onCancel, onChange } = useFileDialog({
    accept: 'image/*', // Set to accept only image files
    directory: true, // Select directories instead of files if set true
});


const open = ref(false);


</script>