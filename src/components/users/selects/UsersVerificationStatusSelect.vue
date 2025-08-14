<template>
    <!-- v-model:open="open" -->
    <div class="selectParent">

        <Select v-model:open="open">
            <SelectTrigger
                :class="[open ? 'ring-4 ring-primary-70 transition-all duration-300' : '', 'min-w-[120px] xl:max-w-[350px] w-full']">
                <SelectValue placeholder="Statut" class="" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="attempt">
                        <div class='flex items-center py-1'> <span
                                class='flex w-[8px] h-[8px] me-2 bg-red-500 rounded-full'></span><span
                                class="text-sm font-medium"> En attente </span>
                        </div>
                    </SelectItem>
                    <SelectItem value="blueberry">
                        <div class='flex items-center py-1'> <span
                                class='flex w-[8px] h-[8px] me-2 bg-red-500 rounded-full'></span><span
                                class="text-sm font-medium"> Rejetées </span>
                        </div>
                    </SelectItem>
                    <SelectItem value="grapes">
                        <div class='flex items-center py-1'> <span
                                class='flex w-[8px] h-[8px] me-2 bg-red-500 rounded-full'></span><span
                                class="text-sm font-medium"> Approuvées </span>
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