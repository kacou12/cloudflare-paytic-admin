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

                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'UPDATE'">Modifier</DropdownMenuItem>
                    </DialogTrigger>

                    <DialogTrigger as-child>
                        <DropdownMenuItem @click="contentModalAction = 'DELETE'">Supprimer</DropdownMenuItem>
                    </DialogTrigger>

                </DropdownMenuContent>
            </DropdownMenu>

            <!-- USER ACCOUNT MODAL -->
            <DialogContent class="max-w-[90%] rounded-lg sm:max-w-[480px] font-worksans ">
                <article v-if="contentModalAction == 'UPDATE'">

                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Modification de l'utilisateur</DialogTitle>

                        <!-- CLOSE ICON SVG -->
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>

                    </DialogHeader>
                    <div class="text-sm px-6   my-8 ">
                        <!-- content -->
                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Prénom</p>
                            <Input type="text" id="first_name" placeholder="Prénom" v-model="userState.first_name"
                                class="" required />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Nom</p>
                            <Input type="text" id="last_name" placeholder="Nom" v-model="userState.last_name" class=""
                                required />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Email</p>
                            <Input type="email" id="email" placeholder="Email" v-model="userState.email" class=""
                                required />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Téléphone</p>
                            <Input type="tel" id="phone" placeholder="Téléphone" v-model="userState.phone" class=""
                                required />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Rôle</p>
                            <Input type="text" id="role" placeholder="Rôle" v-model="userState.role" class=""
                                required />
                        </section>

                        <section class="space-y-2 flex items-center">
                            <input type="checkbox" id="is_active" v-model="userState.is_active" class="mr-2" />
                            <label for="is_active" class="text-sm text-neutral-20">Utilisateur actif</label>
                        </section>
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6 ">

                        <Button class="flex-1 md:py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="updateUserHandler"
                            class="flex-1 md:py-[22px] text-sm rounded-lg bg-primary font-normal" variant="default">
                            Confirmer
                        </Button>
                    </DialogFooter>
                </article>

                <article v-else-if="contentModalAction == 'DELETE'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Supprimer cet utilisateur ?</DialogTitle>

                        <!-- CLOSE ICON SVG -->
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>

                    </DialogHeader>
                    <div class="text-sm px-6   my-8  text-center">
                        <!-- content -->
                        <p>Êtes vous sûr de vouloir supprimer cet marchant ?</p>
                        <p class="mt-2 text-neutral-20">{{ userState.first_name }} {{ userState.last_name }}</p>
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6 ">

                        <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Annuler
                        </Button>
                        <Button @click="deleteUserHandler"
                            class="flex-1 py-[22px] text-sm rounded-lg bg-red-600 hover:bg-red-700 font-normal"
                            variant="default">
                            Supprimer
                        </Button>
                    </DialogFooter>
                </article>

                <article v-else-if="contentModalAction == 'SHOW'">
                    <DialogHeader class="flex flex-row justify-between items-center">
                        <DialogTitle>Détails de l'utilisateur</DialogTitle>

                        <!-- CLOSE ICON SVG -->
                        <DialogClose
                            class="w-fit rounded-sm opacity-70  transition-opacity hover:opacity-100  disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                            <close-icon></close-icon>
                        </DialogClose>

                    </DialogHeader>
                    <div class="text-sm px-6   my-8  ">
                        <!-- content -->
                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Prénom</p>
                            <Input disabled type="text" id="first_name" placeholder="Prénom"
                                v-model="userState.first_name" class="" />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Nom</p>
                            <Input disabled type="text" id="last_name" placeholder="Nom" v-model="userState.last_name"
                                class="" />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Email</p>
                            <Input disabled type="email" id="email" placeholder="Email" v-model="userState.email"
                                class="" />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Téléphone</p>
                            <Input disabled type="tel" id="phone" placeholder="Téléphone" v-model="userState.phone"
                                class="" />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Rôle</p>
                            <Input disabled type="text" id="role" placeholder="Rôle" v-model="userState.role"
                                class="" />
                        </section>

                        <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Statut</p>
                            <div class="p-2 border rounded">
                                <span class="px-2 py-1 rounded text-xs"
                                    :class="userState.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                                    {{ userState.is_active ? 'Actif' : 'Inactif' }}
                                </span>
                            </div>
                        </section>

                        <section class="space-y-2" v-if="userState.merchant">
                            <p class="text-sm text-neutral-20">Marchand</p>
                            <Input disabled type="text" placeholder="Marchand"
                                :model-value="userState.merchant.business_name" class="" />
                        </section>

                        <!-- <section class="space-y-2">
                            <p class="text-sm text-neutral-20">Dernière connexion</p>
                            <Input disabled type="text" placeholder="Dernière connexion"
                                :model-value="formatRelativeDate(userState.last_login_at)" class="" />
                        </section> -->
                    </div>
                    <DialogFooter class="flex gap-2 px-6 pb-6 ">
                        <Button class="flex-1 py-[22px] text-sm rounded-lg font-medium" variant="outline"
                            @click="open = false">
                            Fermer
                        </Button>
                    </DialogFooter>
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
import { useDeleteUserMutation, useUpdateUserMutation } from '@/composables/queries/useUserQueries'

import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import Input from '@/components/ui/input/Input.vue'
import type { UserResponse } from '@/services/user/user.type'
import { formatRelativeDate } from '@/lib/utils'

const { user } = defineProps<{
    user: UserResponse
}>();

const { mutateAsync: updateUser } = useUpdateUserMutation(user.id)
const { mutateAsync: deleteUser } = useDeleteUserMutation(user.id);

const toast = useToast();

const userState = ref({ ...user });

const updateUserHandler = async () => {
    const updatePayload = {
        first_name: userState.value.first_name,
        last_name: userState.value.last_name,
        email: userState.value.email,
        phone: userState.value.phone,
        role: userState.value.role,
        is_active: userState.value.is_active,
    };

    await updateUser(updatePayload);
    open.value = false;
    toast.success("L'utilisateur a bien été modifié");
}

const deleteUserHandler = async () => {
    await deleteUser();
    open.value = false;
    toast.success("L'utilisateur a bien été supprimé");
}

const isBlocked = computed(() => {
    return !user.is_active;
})

const open = ref(false);
const contentModalAction = ref<"SHOW" | "UPDATE" | "DELETE">();

function copy(id: string) {
    navigator.clipboard.writeText(id)
}
</script>