<template>
    <CommonModal backgroud-color="bg-white" v-model:open="open" :showDivider="false">
        <template #trigger>
            <CommonButton type="default" @action="console.log('wapiti')" title="Créer une notification"></CommonButton>
        </template>

        <template #title>
            <span>Nouvelle notification</span>
        </template>
        <template #content>
            <div class="space-y-3">

                <!-- First section  -->
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Titre de la notification</p>
                    <Input type="title" id="title" placeholder="Titre" class="" required />
                </section>
                <section class="space-y-2">
                    <p class="text-sm text-neutral-20">Message principalt</p>
                    <Textarea placeholder="Message de la notification" />
                </section>
                <section class="flex flex-col space-y-2">

                    <p class="flex-1 text-neutral-20">Statut de la notification</p>


                    <div class="w-full">

                        <CommonSelect border-color="border-neutral-60" default-width="w-full" class="w-full"
                            title="Role"
                            :elements="[{ name: 'Administrateur', value: '1' }, { name: 'Super Administrateur', value: '2' }]">
                        </CommonSelect>
                    </div>
                </section>
            </div>
        </template>

        <template #footer>
            <div class="flex gap-2 px-6 py-5 w-full">


                <Button class="flex-1  text-sm rounded-lg font-medium" variant="outline" @click="open = false">
                    Annuler
                </Button>
                <Button class="flex-1  text-sm rounded-lg bg-primary font-normal" variant="default">
                    Créer maintenant
                </Button>
            </div>

        </template>

    </CommonModal>
</template>
<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import CommonModal from '@/components/common/commonModal.vue';
import { Button } from '@/components/ui/button';
import { ref } from 'vue';
import CommonSelect from '../common/commonSelect.vue';
import { Input } from '../ui/input';
import { Textarea } from '@/components/ui/textarea'

const open = ref(false);

</script>