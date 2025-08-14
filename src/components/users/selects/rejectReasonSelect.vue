<template>
    <!-- v-model:open="open" -->
    <div class="selectParent space-y-2">
        <p class="text-sm text-neutral-20">Selectionner un motif</p>

        <Select v-model:open="open">
            <!-- <SelectTrigger class="min-w-[120px] max-w-[350px]  "> -->
            <SelectTrigger :class="[open ? 'ring-4 ring-primary-70 transition-all duration-300' : '', 'w-full ']">
                <SelectValue placeholder="Motif" class="" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="attempt">
                        <div class=' py-1'> <span class="text-sm font-medium"> Document illisible </span>
                        </div>
                    </SelectItem>
                    <SelectItem value="blueberry">
                        <div class="py-1"> <span class="text-sm font-medium">Document incomplett </span>
                        </div>

                    </SelectItem>
                    <SelectItem value="grapes">

                        <div class="py-1"> <span class="text-sm font-medium">Document expiré</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="conforme">

                        <div class="py-1"> <span class="text-sm font-medium">Document non conforme</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="fraude">

                        <div class="py-1"> <span class="text-sm font-medium">Fausse identité ou fraude suspectée</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="Erreur">

                        <div class="py-1"> <span class="text-sm font-medium">Erreur dans les informations</span>
                        </div>
                    </SelectItem>
                    <SelectItem value="pays">

                        <div class="py-1"> <span class="text-sm font-medium">Document non valide dans le pays </span>
                        </div>
                    </SelectItem>

                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
</template>

<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ref } from 'vue';
const open = ref(false);
</script>
<style scoped></style>