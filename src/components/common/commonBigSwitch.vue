<template>

    <CustomSwitch :defaultChecked="defaultActive" :checked="isActive"
        @update:checked="$emit('update:modelValue', $event)">
        <template #thumb>

            <div class="w-full h-full  relative">

                <div v-if="isActive" class=" 
                w-[4px] h-[4px]
                    absolute
                    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    rounded-full flex  bg-primary">
                </div>


                <div v-else class="
                w-[4px] h-[4px]    
                absolute
                    top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    rounded-full flex  bg-neutral-60">
                </div>
            </div>


        </template>
    </CustomSwitch>


</template>
<script setup lang="ts">
import { ref } from 'vue';
import CustomSwitch from '../custom-ui/customSwitch.vue';

const isActive = defineModel({ type: Boolean })


defineProps({
    isSmall: {
        type: Boolean,
        default: false
    },
    defaultActive: {
        type: Boolean, default: false
    }
})

// const props = defineProps(['modelValue'])
// const emit = defineEmits(['update:modelValue'])


// <input
//     :value="props.modelValue"
//     @input="emit('update:modelValue', $event.target.value)"
//   />
</script>
