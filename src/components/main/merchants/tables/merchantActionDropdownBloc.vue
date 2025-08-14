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
                    <DropdownMenuItem
                        @click="$router.push({ name: AppRoute.MERCHANT_DETAILS.name, params: { id: merchant.id } })">
                        Voir les details
                    </DropdownMenuItem>

                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'UPDATE_PROFIL'">Modifier le profil
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'UPDATE_CHARGES'">Modifier les charges
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'SHOW_CHARGES'">Voir les charges
                        </DropdownMenuItem>
                    </DialogTrigger>

                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'TOGGLE_STATUS'">
                            {{ merchant.status == MerchantStatusEnum.active
                                ? 'Desactiver le compte' : 'Activer le compte' }}
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'DELETE_MERCHANT'">Supprimer le compte
                        </DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuItem
                        @click="$router.push({ name: AppRoute.MERCHANT_WEBHOOKS_KEYS.name, params: { id: merchant.id } })">
                        Webhook & Keys
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DialogContent class="sm:max-w-[480px] font-worksans">
                <article v-if="contentModalAction == 'UPDATE_PROFIL'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Modification du merchant</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>
                    </DialogHeader>
                    <!-- update profil form -->
                    <form @submit.prevent="() => onSubmit()">
                        <div class="text-sm px-6 my-8  max-h-[calc(100vh-250px)]  overflow-y-auto ">
                            <!-- content form -->
                            <div class="space-y-3 ">
                                <div class="flex gap-4">
                                    <section class="space-y-2 flex-1">
                                        <p class="text-sm text-neutral-20">Nom </p>
                                        <InputField v-model="merchantState.first_name" name="first_name" id="first_name"
                                            placeholder="Nom" required />
                                    </section>
                                    <section class="space-y-2 flex-1">
                                        <p class="text-sm text-neutral-20">Prenoms</p>
                                        <InputField v-model="merchantState.last_name" name="last_name" id="last_name"
                                            placeholder="prenoms" required />
                                    </section>
                                </div>
                                <div class="flex gap-4">
                                    <section class="space-y-2 flex-1">
                                        <p class="text-sm text-neutral-20">Nom de l'entreprise</p>
                                        <InputField v-model="merchantState.business_name" name="business_name"
                                            id="business_name" placeholder="Nom commercial" required />
                                    </section>
                                    <section class="space-y-2 flex-1">
                                        <p class="text-sm text-neutral-20">Type d'entreprise</p>
                                        <InputField v-model="merchantState.business_type" name="business_type"
                                            id="business_type" placeholder="Type d'entreprise" required />
                                    </section>
                                </div>

                                <div class="flex gap-4">

                                    <section class="space-y-2 flex-1">
                                        <p class="text-sm text-neutral-20">Rib</p>
                                        <InputField v-model="merchantState.rib" name="rib" id="rib"
                                            placeholder="CI10590100112024345600240" />
                                    </section>
                                    <section class="space-y-2 flex-1">
                                        <p class="text-sm text-neutral-20">Identifiant fiscal</p>
                                        <InputField v-model="merchantState.tax_id" name="tax_id" id="tax_id"
                                            placeholder="Identifiant fiscal" />
                                    </section>
                                </div>

                                <section class="space-y-2 ">
                                    <p class="text-sm text-neutral-20">Numéro d'enregistrement</p>
                                    <InputField v-model="merchantState.registration_no" name="registration_no"
                                        id="registration_no" placeholder="Numéro d'enregistrement" />
                                </section>

                                <section class="space-y-2">
                                    <p class="text-sm text-neutral-20">Adresse</p>
                                    <InputField v-model="merchantState.address" name="address" id="address"
                                        placeholder="Adresse" />
                                </section>

                                <div class="flex gap-4">
                                    <section class="space-y-2 flex-1">
                                        <p class="text-sm text-neutral-20">Téléphone</p>
                                        <InputField v-model="merchantState.phone" name="phone" id="phone"
                                            placeholder="Téléphone" required />
                                    </section>
                                    <section class="space-y-2 flex-1">
                                        <p class="text-sm text-neutral-20">Email</p>
                                        <InputField v-model="merchantState.email" name="email" id="email"
                                            placeholder="Email" required />
                                    </section>
                                </div>

                                <section class="space-y-2">
                                    <p class="text-sm text-neutral-20">Site web (optionnel)</p>
                                    <InputField v-model="merchantState.website" name="website" id="website"
                                        placeholder="https://www.example.com" />
                                </section>
                            </div>

                        </div>
                        <DialogFooter class="flex gap-2 px-6 pb-6">
                            <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                                @click="open = false">
                                Annuler
                            </Button>
                            <Button type="submit" class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal"
                                variant="default">
                                Confirmer
                            </Button>
                        </DialogFooter>
                    </form>

                </article>

                <article v-if="contentModalAction == 'UPDATE_CHARGES'">
                    <MerchantUpdateChargesBloc :merchant @close="open = false"></MerchantUpdateChargesBloc>
                </article>

                <article v-if="contentModalAction == 'SHOW_CHARGES'">
                    <MerchantShowChargesBloc :merchant></MerchantShowChargesBloc>
                </article>

                <article v-else-if="contentModalAction == 'DELETE_MERCHANT'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Supprimer ce merchant</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>
                    </DialogHeader>
                    <div class="text-sm px-6   my-8  text-center">
                        <p>Etes vous sur de vouloir supprimer ce merchant: <strong>{{ merchant.business_name }}</strong>
                            ?</p>
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6">
                        <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="deleteMerchantHandler"
                            class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                </article>

                <article v-else-if="contentModalAction == 'TOGGLE_STATUS'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>{{ merchant.status == MerchantStatusEnum.active ? 'Desactiver ce compte marchant' :
                            'Activer ce compte marchant' }}</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>

                        </DialogClose>
                    </DialogHeader>
                    <div class="text-sm px-6   my-8  text-center">
                        <p v-if="merchant.status == MerchantStatusEnum.active">Etes vous sur de vouloir desactiver ce
                            compte marchant: <strong>{{ merchant.business_name }}</strong> ?</p>

                        <p v-else>Etes vous sur de vouloir activer ce compte marchant: <strong>{{ merchant.business_name
                                }}</strong> ?</p>
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6">
                        <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="toggleMerchantStatusHandler"
                            class="flex-1 py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                </article>

                <article v-else-if="contentModalAction == 'SHOW'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Detail du merchant</DialogTitle>
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>
                    </DialogHeader>
                    <div class="text-sm px-6   my-8">
                        <div class="space-y-3">
                            <!-- Les champs en lecture seule... -->
                        </div>
                    </div>
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
import Input from '@/components/ui/input/Input.vue'
import { useDeleteMerchantMutation, usetoggleMerchantStatusMutation, useUpdateMerchantMutation } from '@/composables/queries/useMerchantQueries'
import { AppRoute } from '@/constants/app-route'
import type { MerchantResponse, MerchantRequest } from '@/services/merchants/merchant-type';
import { useWindowSize } from '@vueuse/core'
import { computed, ref, watch } from 'vue'
import { useToast } from 'vue-toastification'
import MerchantShowChargesBloc from './merchantShowChargesBloc.vue'
import MerchantUpdateChargesBloc from './merchantUpdateChargesBloc.vue'
import { useLoaderStore } from '@/stores/useLoaderStore'
import InputField from '@/components/vee-validate/InputField.vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { merchantRequestSchema } from '@/services/merchant-request/merchant-request-schema';
import { MerchantStatusEnum } from '@/constants/constant.enum'

const { merchant } = defineProps<{
    merchant: MerchantResponse
}>();

const open = ref(false);
const contentModalAction = ref<"SHOW" | "UPDATE_PROFIL" | "UPDATE_CHARGES" | "SHOW_CHARGES" | "DELETE_MERCHANT" | "WEBHOOKS_AND_KEYS" | "TOGGLE_STATUS">();


const { mutateAsync: updateMerchant } = useUpdateMerchantMutation(merchant.id)
const { mutateAsync: toggleMerchantStatus } = usetoggleMerchantStatusMutation(merchant.id)
const { mutateAsync: deleteMerchant } = useDeleteMerchantMutation(merchant.id);
const { width } = useWindowSize();
const toast = useToast();
const { startLoadingSkeleton, stopLoadingSkeleton } = useLoaderStore();

// VeeValidate form setup
const { handleSubmit, resetForm, setValues } = useForm({
    validationSchema: toTypedSchema(merchantRequestSchema),
    // initialValues: merchant as MerchantRequest,
});

const merchantState = ref<MerchantRequest>({ ...merchant });

const onSubmit = handleSubmit(async (values) => {
    const payload = values as MerchantRequest;
    await updateMerchant(payload);
    toast.success("Le merchant a bien été modifié !");
    open.value = false;
});

const toggleMerchantStatusHandler = async () => {
    startLoadingSkeleton()
    await toggleMerchantStatus({ status: merchant.status == MerchantStatusEnum.active ? MerchantStatusEnum.inactive : MerchantStatusEnum.active });
    open.value = false;
    toast.success("Le status du marchant a bien été modifié !");
}

// Watch for changes in the 'open' state of the modal
watch(open, (newValue) => {
    if (newValue && contentModalAction.value === 'UPDATE_PROFIL') {
        // setValues({ ...merchant });
        // resetForm({ values: { ...merchant } });
        merchantState.value = { ...merchant };
    }
});

const deleteMerchantHandler = async () => {
    try {
        startLoadingSkeleton()
        await deleteMerchant();
        open.value = false;
        toast.success("Le merchant a bien été supprimé");
    } catch (err) {

    } finally {

    }
};



function copy(id: string) {
    navigator.clipboard.writeText(id)
}
</script>