<template>
    <!-- v-model:open="open" -->
    <div class="selectParent ">

        <Select v-model:open="open">
            <!-- <SelectTrigger class="min-w-[120px] max-w-[350px]  "> -->
            <SelectTrigger
                :class="[open ? 'ring-4 ring-primary-70 transition-all duration-300' : '', 'w-full xl:w-fit ']">
                <SelectValue placeholder="Type de document" class="" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="attempt">
                        <div class=' py-1'> <span class="text-sm font-medium"> Carte d'identité </span>
                        </div>
                    </SelectItem>
                    <SelectItem value="blueberry">
                        <div class="py-1"> <span class="text-sm font-medium">Permis d econduire </span>
                        </div>

                    </SelectItem>
                    <SelectItem value="grapes">

                        <div class="py-1"> <span class="text-sm font-medium">Passeport</span>
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