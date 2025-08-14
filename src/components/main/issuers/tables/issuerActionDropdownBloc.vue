<template>
    <div class="">

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

                        <DropdownMenuItem @click="contentModalAction = 'SHOW'">
                            Voir les details
                        </DropdownMenuItem>
                    </DialogTrigger>

                    <!-- <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'UPDATE'">Modifier</DropdownMenuItem>
                    </DialogTrigger>
                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'DELETE'">Supprimer</DropdownMenuItem>
                    </DialogTrigger> -->

                </DropdownMenuContent>
            </DropdownMenu>

            <!-- USER ACCOUNT MODAL -->
            <DialogContent class="max-w-[90%] rounded-lg sm:max-w-[480px] font-worksans ">
                <article v-if="contentModalAction == 'UPDATE'">

                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Modification du issuer</DialogTitle>

                        <!-- CLOSE ICON SVG -->
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <!-- <X class="w-4 h-4" />
                            <span class="sr-only">Close</span> -->
                            <close-icon></close-icon>

                        </DialogClose>


                    </DialogHeader>
                    <div class="text-sm px-6   my-8 ">
                        <!-- content -->
                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20"></p>
                            <Input type="title" id="title" placeholder="nom du issuer" v-model="issuerState.name"
                                class="" required />
                        </section>

                        <!-- <section class="space-y-2">
                            <p class="text-sm text-neutral-20">cash in rate</p>
                            <div class="flex gap-3 w-full relative">
                                <Input class="pl-14" id="cashin_rate" v-model="issuerState.cashin_rate"
                                    placeholder="cash in rate" required />
                                <span
                                    class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                                    %
                                </span>
                            </div>
                        </section> -->
                        <!-- <section class="space-y-2">
                            <p class="text-sm text-neutral-20">cash out rate</p>
                            <div class="flex gap-3 w-full relative">
                                <Input class="pl-14" id="cashin_rate" v-model="issuerState.cashout_rate"
                                    placeholder="cash out rate" required />
                                <span
                                    class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                                    %
                                </span>
                            </div>
                        </section> -->
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6 ">

                        <!-- <Button class="flex-1 py-[22px]  text-sm rounded-lg" variant="outline">
                            Rejeter la verification
                        </Button> -->
                        <Button class="flex-1 md:py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="updateIssuerHandler"
                            class="flex-1 md:py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                    <!-- <common-modal></common-modal> -->
                </article>
                <article v-else-if="contentModalAction == 'DELETE'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Supprimer ce issuer ?</DialogTitle>

                        <!-- CLOSE ICON SVG -->
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <!-- <X class="w-4 h-4" />
                            <span class="sr-only">Close</span> -->
                            <close-icon></close-icon>

                        </DialogClose>


                    </DialogHeader>
                    <div class="text-sm px-6   my-8  text-center">
                        <!-- content -->
                        <p>Etes vous sur de vouloir supprimer ce issuer ?</p>
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6 ">

                        <!-- <Button class="flex-1 py-[22px]  text-sm rounded-lg" variant="outline">
                            Rejeter la verification
                        </Button> -->
                        <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="deleteIssuerHandler"
                            class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                    <!-- <common-modal></common-modal> -->
                </article>
                <article v-else-if="contentModalAction == 'SHOW'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Detail du issuer</DialogTitle>

                        <!-- CLOSE ICON SVG -->
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <!-- <X class="w-4 h-4" />
                            <span class="sr-only">Close</span> -->
                            <close-icon></close-icon>

                        </DialogClose>


                    </DialogHeader>
                    <div class="text-sm px-6   my-8  ">
                        <!-- content -->
                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20"></p>
                            <Input disabled type="title" id="title" placeholder="nom du issuer"
                                v-model="issuerState.name" class="" required />
                        </section>

                        <!-- <section class="space-y-2">
                            <p class="text-sm text-neutral-20">cash in rate</p>
                            <div class="flex gap-3 w-full relative">
                                <Input disabled class="pl-14" id="cashin_rate" v-model="issuerState.cashin_rate"
                                    placeholder="cash in rate" required />
                                <span
                                    class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                                    %
                                </span>
                            </div>
                        </section> -->
                        <!-- <section class="space-y-2">
                            <p class="text-sm text-neutral-20">cash out rate</p>
                            <div class="flex gap-3 w-full relative">
                                <Input disabled class="pl-14" id="cashin_rate" v-model="issuerState.cashout_rate"
                                    placeholder="cash out rate" required />
                                <span
                                    class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                                    %
                                </span>
                            </div>
                        </section> -->
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6 ">

                        <!-- <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="createIssuerHandler"
                            class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button> -->
                    </DialogFooter>
                    <!-- <common-modal></common-modal> -->
                </article>
            </DialogContent>
        </Dialog>

    </div>
</template>
<script setup lang="ts">
import closeIcon from '@/components/svg/closeIcon.vue'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
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
import { useDeleteIssuerMutation, useUpdateIssuerMutation } from '@/composables/queries/useIssuerQueries'

import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import Input from '@/components/ui/input/Input.vue'
import type { IssuerResponse } from '@/services/issuers/issuer-type'

const { issuer } = defineProps<{
    issuer: IssuerResponse
}>();
const { mutateAsync: updateIssuer } = useUpdateIssuerMutation(issuer.id)
const { mutateAsync: deleteIssuer } = useDeleteIssuerMutation(issuer.id);

const toast = useToast();

const issuerState = ref({ ...issuer });

// const createIssuerHandler = async () => {
//     await updateUser({ active: false });
//     // open.value = false;
//     toast.success("L'utilisateur a bien été bloqué");
// };

const updateIssuerHandler = async () => {
    await updateIssuer(issuerState.value);
    open.value = false;
    toast.success("L'issuer a bien été modifiée");

}

const deleteIssuerHandler = async () => {
    await deleteIssuer();
    open.value = false;
    toast.success("L'issuer a bien été supprimée");
}

const isBlocked = computed(() => {
    // return !user.active;
    return false;
})


const open = ref(false);
const contentModalAction = ref<"SHOW" | "UPDATE" | "DELETE">();


function copy(id: string) {
    navigator.clipboard.writeText(id)
}
</script>