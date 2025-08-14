<template>
    <div>

        <Switch :checked="defaultActive" @update:checked="$emit('update:modelValue', $event)">
            <template #thumb>
                <div class="w-full h-full  relative">

                    <div v-if="defaultActive" class="w-[4px] h-[4px] 
                        absolute
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        rounded-full flex  bg-primary">
                    </div>


                    <div v-else class="w-[4px] h-[4px] 
                        absolute
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        rounded-full flex  bg-neutral-60">
                    </div>
                </div>
            </template>
        </Switch>
    </div>

</template>
<script setup lang="ts">
import { Switch } from '@/components/ui/switch';


// const isActive = defineModel({ type: Boolean })
const { defaultActive } = defineProps({
    defaultActive: {
        type: Boolean, default: false
    }
})

// const isDark = ref(false);
// const toggleTheme = () => {
//     isDark.value = !isDark.value
// }
</script>
