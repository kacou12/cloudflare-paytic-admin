<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <!-- <CommonButton type="default" @action="console.log('wapiti')" title="Créer un compte"></CommonButton> -->
            <CustomButton type="outline">
                <div class="flex items-center gap-2">
                    <SubtitlesIcon class="w-5 h-5 mr-2" />
                    <span>CREATE SUBSCRITPION</span>
                </div>
            </CustomButton>
        </template>

        <template #title>
            <span>WEB HOOKS</span>
        </template>
        <template #content class="">
            <!-- First section  -->
            <div class="space-y-4">
                <section class="  ">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Nom</p>
                    </div>
                    <div class=" w-full max-w-[512px]">
                        <Input v-model="payloadState.name" type="text" id="name" placeholder="WEBHOOK  NAME"
                            class="py-2 pr-12" required>
                        </Input>

                    </div>
                </section>

                <section class="  ">
                    <div>
                        <p class="flex-1 text-neutral-20 ">URL</p>
                    </div>
                    <div class=" w-full max-w-[512px]">
                        <Input v-model="payloadState.url" type="text" id="name" placeholder="URL WEB HOOK"
                            class="py-2 pr-12" required>
                        </Input>

                    </div>
                </section>
                <section class="">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Environnement</p>
                    </div>
                    <div class="">
                        <CommonSelect v-model="payloadState.environment" border-color="border-neutral-60"
                            default-width="w-full" title="Environnement" :elements="[
                                { name: 'SandBox', value: EnvironmentsEnum.Sandbox },
                                { name: 'Live', value: EnvironmentsEnum.Live },
                            ]">

                        </CommonSelect>

                    </div>
                </section>
                <section class="">
                    <div>
                        <p class="flex-1 text-neutral-20 ">Evenement</p>
                    </div>
                    <div class="">
                        <!-- <CommonSelect v-model="payloadState.events" border-color="border-neutral-60"
                            default-width="w-full" title="event" :elements="webhookElements">
                        </CommonSelect> -->
                        <CommonMultiselect v-model="payloadState.events" :options="webhookElements" placeholder="event"
                            :animation="0.5" :max-count="2" variant="default">
                        </CommonMultiselect>


                    </div>
                </section>

            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">
                <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button @click="createWebhookHandler" class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal"
                    variant="default">
                    Create
                </Button>
            </div>
        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CustomButton from '@/components/buttons/customButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import CommonMultiselect from '@/components/common/commonMultiselect.vue';
import CommonSelect from '@/components/common/commonSelect.vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateWebhookMutation } from '@/composables/queries/useWebhookQueries';
import { EnvironmentsEnum, WebhookEnum } from '@/constants/constant.enum';
import type { WebhookPayload } from '@/services/webhook/webhook-type';
import { useLoaderStore } from '@/stores/useLoaderStore';
import { SubtitlesIcon } from 'lucide-vue-next';
import { ref } from 'vue';
import { useRoute } from 'vue-router';



const route = useRoute()
const { startLoading, stopLoading, stopLoadingSkeleton } = useLoaderStore();
const { mutateAsync: createWebhook } = useCreateWebhookMutation(route.params.id as string);

const payloadState = ref<WebhookPayload>(
    {
        events: [],
        environment: "",
        merchant_id: route.params.id as string,
        url: undefined,
        name: undefined

    }
);

const webhookElements = [
    { label: 'Transaction Created', value: WebhookEnum.TransactionCreated },
    { label: 'Transaction Processing', value: WebhookEnum.TransactionProcessing },
    { label: 'Transaction Pending', value: WebhookEnum.TransactionPending },
    { label: 'Transaction Updated', value: WebhookEnum.TransactionUpdated },
    { label: 'Transaction Failed', value: WebhookEnum.TransactionFailed },
    { label: 'Transaction Refunded', value: WebhookEnum.TransactionRefunded },
    { label: 'Transaction Success', value: WebhookEnum.TransactionSuccess },
];

const open = ref(false);

const createWebhookHandler = async () => {

    startLoading();
    await createWebhook(payloadState.value);
    open.value = false

}



</script>