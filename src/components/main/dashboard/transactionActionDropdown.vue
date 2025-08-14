<template>
    <Dialog v-model:open="open">

        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="w-8 h-8 p-0 text-neutral-30">
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="text-xs text-neutral-10 font-worksans">

                <!-- OPEN USER ACCOUNT MODAL -->
                <DialogTrigger as-child>
                    <DropdownMenuItem @click="contentModalAction = 'VALIDE'">
                        Valider la transaction
                    </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger as-child v-if="transaction.status != TransactionStatusEnum.Failed">
                    <DropdownMenuItem @click="contentModalAction = 'REJECT'">
                        Rejeter la transaction
                    </DropdownMenuItem>
                </DialogTrigger>



            </DropdownMenuContent>
        </DropdownMenu>

        <!-- USER ACCOUNT MODAL -->
        <DialogContent class="max-w-[90%] rounded-lg sm:max-w-[480px] font-worksans ">

            <article v-if="contentModalAction == 'VALIDE'">
                <DialogHeader class="flex flex-row justify-between items-center">
                    <DialogTitle>Valider la transaction</DialogTitle>

                    <!-- CLOSE ICON SVG -->
                    <DialogClose
                        class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <!-- <X class="w-4 h-4" />
                            <span class="sr-only">Close</span> -->
                        <close-icon></close-icon>

                    </DialogClose>


                </DialogHeader>
                <section class="my-8 ">

                    <p class="text-sm text-neutral-20 text-center">Voulez-vous vrament valider la transaction <span
                            class="font-bold">{{ transaction.custom_id }}</span> ?</p>

                    <div class="flex items-center  justify-center gap-1">
                        <p class="text-sm text-neutral-20 text-center">Montant : </p>
                        <span class="text-md font-bold text-neutral-20 ">{{ formatPrice(transaction.amount) }} </span>

                    </div>


                </section>
                <DialogFooter class="flex gap-2 px-6 pb-6 ">
                    <Button class="flex-1 md:py-[22px]  text-sm rounded-lg font-medium" variant="outline"
                        @click="open = false">
                        Annuler
                    </Button>
                    <Button @click="validateTransactionStatusHandler"
                        class="flex-1 md:py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                        Confirmer
                    </Button>
                </DialogFooter>

            </article>
            <article v-else-if="contentModalAction == 'REJECT'">
                <DialogHeader class="flex flex-row justify-between items-center">
                    <DialogTitle>Rejeter la transaction</DialogTitle>

                    <!-- CLOSE ICON SVG -->
                    <DialogClose
                        class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <!-- <X class="w-4 h-4" />
                            <span class="sr-only">Close</span> -->
                        <close-icon></close-icon>

                    </DialogClose>


                </DialogHeader>
                <section class="my-8 ">

                    <p class="text-sm text-neutral-20 text-center">Voulez-vous vraiment marquer la transaction
                        <span class="font-bold">{{ transaction.custom_id }}</span> comme échouée ?
                    </p>

                    <div class="flex items-center  justify-center gap-1">
                        <p class="text-sm text-neutral-20 text-center">Montant : </p>
                        <span class="text-md font-bold text-neutral-20 ">{{ formatPrice(transaction.amount) }} </span>

                    </div>


                </section>
                <DialogFooter class="flex gap-2 px-6 pb-6 ">
                    <Button class="flex-1 md:py-[22px]  text-sm rounded-lg font-medium" variant="outline"
                        @click="open = false">
                        Annuler
                    </Button>
                    <Button @click="rejectTransactionStatusHandler"
                        class="flex-1 md:py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                        Confirmer
                    </Button>
                </DialogFooter>

            </article>

        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import closeIcon from '@/components/svg/closeIcon.vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import rejectReasonModal from '@/components/users/modals/rejectReasonModal.vue'
import { MoreHorizontal } from 'lucide-vue-next'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'

import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { formatPrice } from '@/lib/utils'
import { useAuthStore } from '@/stores/useAuthStore'
import { TransactionRouteApi } from '@/services/transactions/transaction-constants'
import { useLoaderStore } from '@/stores/useLoaderStore'
import { TransactionStatus, type TransactionResponse } from '@/services/transactions/transaction-type'
import { useUpdateTransactionStatusMutation } from '@/composables/queries/useTransactionQueries'
import { TransactionStatusEnum } from '@/constants/constant.enum'

// useUpdateTransactionStatusMutation

const { transaction } = defineProps<{
    transaction: TransactionResponse
}>()


const { startLoading } = useLoaderStore()

const { mutateAsync: updateTransactionStatus } = useUpdateTransactionStatusMutation(transaction.id)


const open = ref(false);

const toast = useToast();

const contentModalAction = ref<"REJECT" | "VALIDE">();



const validateTransactionStatusHandler = async () => {
    try {
        startLoading();
        await updateTransactionStatus(TransactionStatusEnum.Success);
        open.value = false;
        toast.success("Le status de la transaction a bien été mis a jour");

    } catch (err) {

    }

}
const rejectTransactionStatusHandler = async () => {

    try {
        startLoading();
        await updateTransactionStatus(TransactionStatusEnum.Failed);
        open.value = false;
        toast.success("Le status de la transaction a bien été mis a jour");

    } catch (err) {

    }

}


</script>