<template>
    <Dialog v-model:open="open">

        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="w-8 h-8 p-0 text-neutral-30">
                    <span class="sr-only">Open menu</span>
                    <MoreVerticalIcon class="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="text-xs text-neutral-10 font-publicsans">

                <DialogTrigger as-child>
                    <DropdownMenuItem @click="$router.push({ name: 'recent-transactions' })">
                        Voir toutes les transactions
                    </DropdownMenuItem>
                </DialogTrigger>
                <!-- <DropdownMenuItem>Valider</DropdownMenuItem>
                <DropdownMenuItem>Rejeter</DropdownMenuItem> -->
            </DropdownMenuContent>
        </DropdownMenu>

        <!-- USER ACCOUNT MODAL -->
        <DialogContent class="sm:max-w-[480px] font-publicsans ">
            <DialogHeader class="flex flex-row justify-between items-center border-b-[1px] border-neutral-200">
                <DialogTitle>Creation de compte</DialogTitle>
                <!-- <DialogDescription>
                    Make changes to your profile here. Click save when you're done.
                </DialogDescription> -->


                <!-- CLOSE ICON SVG -->
                <DialogClose
                    class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                    <!-- <X class="w-4 h-4" />
                    <span class="sr-only">Close</span> -->
                    <close-icon></close-icon>

                </DialogClose>


            </DialogHeader>
            <div class="text-sm px-6 space-y-5 pb-5 border-b-[1px] border-neutral-200">
                <section class="user-informations space-y-3">
                    <h2 class="text-[16px] font-semibold text-neutral-10">Informations utilisateur</h2>
                    <div class="flex ">
                        <p class="flex-1 text-neutral-20">Nom</p>
                        <p class="flex-1 text-neutral-10 font-medium">Otayami</p>
                    </div>
                    <div class="flex ">
                        <p class="flex-1 text-neutral-20">Prénom</p>
                        <p class="flex-1 text-neutral-10 font-medium">Ange Philipe</p>
                    </div>
                    <div class="flex ">
                        <p class="flex-1 text-neutral-20">Numéro de télephone</p>
                        <p class="flex-1 text-neutral-10 font-medium">+225 07 00 00 00 25</p>
                    </div>
                    <div class="flex ">
                        <p class="flex-1 text-neutral-20">Date d'inscription</p>
                        <p class="flex-1 text-neutral-10 font-medium">02/01/2023</p>
                    </div>
                    <div class="flex ">
                        <p class="flex-1 text-neutral-20">Date de naissance</p>
                        <p class="flex-1 text-neutral-10 font-medium">02/01/1990</p>
                    </div>
                    <div class="flex ">
                        <p class="flex-1 text-neutral-20">ID utiliateur</p>
                        <p class="flex-1 text-neutral-10 font-medium">user03458930</p>
                    </div>
                </section>
                <section class="document-informations  space-y-5">
                    <h2 class="text-[16px] font-semibold text-neutral-10">Document soumis</h2>
                    <div class="flex ">
                        <p class="flex-1 text-neutral-20">Type de document</p>
                        <p class="flex-1 text-neutral-10 font-medium">Carte d'identitité</p>
                    </div>

                    <div class="flex ">
                        <div class="flex-1">Recto</div>
                        <div class="flex-1">
                            <div
                                class="w-20 h-20 bg-red-500 rounded-full bg-[url('/src/assets/images/client.jpeg')] bg-cover">
                            </div>


                        </div>

                    </div>
                    <div class="flex ">
                        <div class="flex-1">Document</div>
                        <div class="flex-1 space-y-1">
                            <documentType class="w-full h-14"></documentType>
                            <documentType class="w-full h-14"></documentType>

                        </div>

                    </div>
                </section>
                <section class="historique space-y-3 ">
                    <h2 class="text-[16px] font-semibold text-neutral-10">Historique des actions</h2>
                    <div class="flex ">
                        <p class="flex-1 text-neutral-20">Date de soumission</p>
                        <p class="flex-1 text-neutral-10  font-medium">02/01/2024</p>
                    </div>
                    <div class="flex ">
                        <p class="flex-1 text-neutral-20">Heure de soumission</p>
                        <p class="flex-1 text-neutral-10  font-medium">19h30</p>
                    </div>
                </section>
            </div>
            <DialogFooter class="flex gap-2 px-6 pb-6 ">

                <!-- <Button class="flex-1 py-[22px]  text-sm rounded-lg" variant="outline">
                    Rejeter la verification
                </Button> -->
                <div class="flex-1">
                    <reject-reason-modal></reject-reason-modal>

                </div>
                <Button class="flex-1 py-[22px] text-sm rounded-lg" variant="default" @click="open = false">
                    Valider la verification
                </Button>

            </DialogFooter>
            <!-- <common-modal></common-modal> -->
        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal, MoreVerticalIcon } from 'lucide-vue-next'
import commonModal from '@/components/common/commonModal.vue'
import closeIcon from '@/components/svg/closeIcon.vue'
import documentType from '@/components/users/documentType.vue'
import rejectReasonModal from '@/components/users/modals/rejectReasonModal.vue'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'
import { ref } from 'vue'



const open = ref(false);
const open2 = ref(false);

function copy(id: string) {
    navigator.clipboard.writeText(id)
}
</script>