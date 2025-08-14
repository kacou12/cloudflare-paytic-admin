<template>
    <Dialog v-model:open="open">
        <DialogTrigger as-child>
        </DialogTrigger>
        <DialogContent :onInteractOutside="(e) => {
            e.preventDefault();
        }" class="max-w-[90%] rounded-lg sm:max-w-[480px] font-worksans ">
            <DialogHeader :class="[showDivider ? 'border-b-[1px]' : '']"
                class="flex flex-row justify-between   border-neutral-200">
                <DialogTitle>
                    <h2 class="text-lg font-bold text-red-600">Important : clé d'acces</h2>
                </DialogTitle>
            </DialogHeader>

            <section :class="`text-sm px-4 py-4 `">
                <div class="space-y-4 p-4 ">

                    <div class=" gap-2 space-y-1 rounded-md bg-[#ffedd5] p-4 text-orange-800 border border-left-4  border-left-[#FA703F]"
                        style="background-color: #FEF3EB; color: #B45309;">

                        <div class="flex items-center gap-2 text-[#771505]">
                            <AlertTriangleIcon class=" w-5 h-5" />
                            <p class="text-[#771505] font-bold">Attention</p>
                        </div>

                        <div>
                            <p>Veuillez copier le mot de passe immédiatement. Il ne sera plus affiché à nouveau
                                après la
                                fermeture de cette fenêtre.</p>
                        </div>
                    </div>

                    <section
                        class="flex gap-2 items-center justify-between rounded-md border border-gray-300 bg-gray-50 p-3">

                        <div class="relative flex flex-col items-start ">
                            <span class="text-sm text-gray-500">Email :</span>
                            <p class="break-all font-mono text-lg text-gray-900">{{ email }}</p>
                        </div>
                        <CommonClipBoard :data-to-copy="email">
                        </CommonClipBoard>
                    </section>

                    <section
                        class="flex gap-2 items-center justify-between rounded-md border border-gray-300 bg-gray-50 p-3">
                        <div class="relative flex flex-col items-start ">
                            <span class="text-sm text-gray-500">Mot de passe :</span>
                            <p class="break-all font-mono text-lg text-gray-900">{{ password }}</p>
                        </div>
                        <CommonClipBoard :data-to-copy="password">
                        </CommonClipBoard>
                    </section>

                </div>
            </section>

            <DialogFooter>
                <div class="p-4 w-full flex gap-x-2  border-t-[1px] ">
                    <CustomButton :is-disabled="!isCopied" class="w-full py-[22px] text-sm rounded-lg font-medium"
                        variant="destructive" @click="closeModal">
                        Fermer
                    </CustomButton>
                    <CustomButton class="w-full py-[22px] text-sm rounded-lg font-medium" variant="default"
                        @click="copyPasswordToClipboard">
                        Copier Mot de Passe
                    </CustomButton>
                </div>
            </DialogFooter>

        </DialogContent>
    </Dialog>
</template>

<script setup lang="ts">
import closeIcon from '@/components/svg/closeIcon.vue' // Garder si utilisé ailleurs, sinon peut être retiré
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import DialogClose from '@/components/ui/dialog/DialogClose.vue' // Garder si utilisé ailleurs, sinon peut être retiré

import { ref, type PropType } from 'vue'
import CustomButton from '../buttons/customButton.vue'
import { AlertTriangleIcon } from 'lucide-vue-next'
import { copyToClipBoard } from '@/lib/utils' // Assurez-vous que cette fonction gère bien le texte brut
import { useToast } from 'vue-toastification'
import CommonClipBoard from './commonClipBoard.vue'

const isCopied = ref(false);
const toast = useToast();

const props = defineProps({ // Utilisation de `props` pour accéder aux props
    backgroudColor: {
        default: 'bg-[#F5F5F5]',
        type: String as PropType<'bg-neutral-80' | 'bg-white'>
    },
    showDivider: {
        default: true,
        type: Boolean
    },
    email: {
        type: String,
        default: ''
    },
    password: { // secretKey est maintenant `password`
        type: String,
        default: ''
    },
});

const open = defineModel({ type: Boolean, default: false });
const emit = defineEmits(['close']);

const closeModal = () => {
    // open.value = false;
    emit('close');
}


const copyPasswordToClipboard = () => {
    if (props.password) { // Vérifier si le mot de passe existe
        copyToClipBoard(props.password); // Copie le mot de passe
        isCopied.value = true;
        toast.info("Mot de passe copié !", { timeout: 3000 });
    } else {
        toast.error("Aucun mot de passe à copier.", { timeout: 3000 });
    }
}
</script>