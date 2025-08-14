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
                        <DialogTitle>Modification du provider</DialogTitle>

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
                        <!-- content -->
                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">nom du provider</p>
                            <Input type="title" id="title" placeholder="Titre" v-model="providerState.operator" class=""
                                required />
                        </section>

                        <!-- <section class="space-y-2">
                            <p class="text-sm text-neutral-20">lien de l'image du provider</p>
                            <Input v-model="providerState.image_url" placeholder="Lien de l'image" required />
                        </section> -->

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Choix des aggregateurs de collecte (cash out)</p>
                            <CommonMultiselect v-model="providerState.cashout_issuer_used!"
                                :options="provider.cashout_issuer_used!.map((issuer) => ({ label: issuer, value: issuer }))"
                                placeholder="Choix des aggregateurs" :animation="0.5" :max-count="2" variant="default">
                            </CommonMultiselect>
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Choix des aggregateurs de transfert d'argent (cash in)
                            </p>
                            <CommonMultiselect v-model="providerState.cashin_issuer_used!"
                                :options="provider.cashin_issuer_used.map((issuer) => ({ label: issuer, value: issuer }))"
                                placeholder="Choix des aggregateurs" :animation="0.5" :max-count="2" variant="default">
                            </CommonMultiselect>
                        </section>




                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6 ">

                        <!-- <Button class="flex-1 py-[22px]  text-sm rounded-lg" variant="outline">
                            Rejeter la verification
                        </Button> -->
                        <Button class="flex-1 md:py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="updateProviderHandler"
                            class="flex-1 md:py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                    <!-- <common-modal></common-modal> -->
                </article>
                <article v-else-if="contentModalAction == 'DELETE'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Supprimer ce provider</DialogTitle>

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
                        <p>Etes vous sur de vouloir supprimer ce provider ?</p>
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6 ">

                        <!-- <Button class="flex-1 py-[22px]  text-sm rounded-lg" variant="outline">
                            Rejeter la verification
                        </Button> -->
                        <Button class="flex-1 md:py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="deleteProviderHandler"
                            class="flex-1 md:py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                    <!-- <common-modal></common-modal> -->
                </article>
                <article v-else-if="contentModalAction == 'SHOW'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Detail du provider</DialogTitle>

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
                            <p class="text-sm text-neutral-20">nom du provider</p>
                            <Input disabled type="title" id="title" placeholder="Titre" v-model="providerState.operator"
                                class="" required />
                        </section>

                        <!-- <section class="space-y-2">
                            <p class="text-sm text-neutral-20">lien de l'image du provider</p>
                            <Input disabled v-model="providerState.image_url" placeholder="Lien de l'image" required />
                        </section> -->

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Choix des aggregateurs de prelevement (cash out)</p>


                            <CommonMultiselect v-model="providerState.cashout_issuer_used!"
                                :options="provider.cashout_issuer_used!.map((issuer) => ({ label: issuer, value: issuer }))"
                                placeholder="Choix des aggregateurs" :animation="0.5" :max-count="2" variant="default">
                            </CommonMultiselect>
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Choix des aggregateurs de collecte (cash in)</p>

                            <CommonMultiselect v-model="providerState.cashin_issuer_used!"
                                :options="provider.cashin_issuer_used.map((issuer) => ({ label: issuer, value: issuer }))"
                                placeholder="Choix des aggregateurs" :animation="0.5" :max-count="2" variant="default">
                            </CommonMultiselect>
                        </section>





                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6 ">

                        <!-- <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="createProviderHandler"
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
import { useDeleteProviderMutation, useUpdateProviderMutation } from '@/composables/queries/useProviderQueries'
import type { ProviderResponse } from '@/services/providers/provider-type'
import { computed, onMounted, ref, toRaw } from 'vue'
import { useToast } from 'vue-toastification'
import Input from '@/components/ui/input/Input.vue'
import CommonSelect from '@/components/common/commonSelect.vue'
import CommonMultiselect from '@/components/common/commonMultiselect.vue'
import { useIssuersFiltersQuery } from '@/composables/queries/useIssuerQueries'

const { provider } = defineProps<{
    provider: ProviderResponse
}>();

// const { data: issuersData, isFetched } = useIssuersFiltersQuery(100);
const { mutateAsync: updateProvider } = useUpdateProviderMutation(provider.id)
const { mutateAsync: deleteProvider } = useDeleteProviderMutation(provider.id);

const toast = useToast();

// const providerState = ref({ ...provider });
const providerState = ref({
    operator: provider.operator,
    // image_url: provider.image_url,
    cashout_issuer_used: provider.cashout_issuer_used ?? [],
    cashin_issuer_used: provider.cashin_issuer_used ?? []
});
onMounted(() => {

})


const updateProviderHandler = async () => {
    await updateProvider(providerState.value);
    open.value = false;
    toast.success("Le provider a bien été modifiée");

}

const deleteProviderHandler = async () => {
    await deleteProvider();
    open.value = false;
    toast.success("Le provider a bien été supprimée");
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