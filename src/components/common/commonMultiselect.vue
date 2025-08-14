<template>
    <div class="relative">
        <!-- Trigger Button -->
        <button @click="!disabled && (isPopoverOpen = !isPopoverOpen)" :class="[
            'flex w-full p-1 border-neutral-60 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit',
            disabled ? 'opacity-50 cursor-not-allowed' : ''
        ]">
            <div v-if="selectedValues.length > 0" class="flex justify-between items-center w-full">
                <div class="flex flex-wrap items-center">
                    <div v-for="value in displayedOptions" :key="value" :class="[
                        variantClasses,
                        'inline-flex items-center px-2.5 py-0.5 rounded-full border-2 border-primary text-sm font-medium'
                    ]" :style="isAnimating ? { animationDuration: `${props.animation}s` } : {}">
                        <component v-if="props.options.find(o => o.value === value)?.icon"
                            :is="props.options.find(o => o.value === value)?.icon" class="h-4 w-4 mr-2" />
                        {{props.options.find(o => o.value === value)?.label}}
                        <XCircle class="ml-2 h-4 w-4 cursor-pointer" @click.stop="toggleOption(value)" />
                    </div>

                    <div v-if="hasMoreOptions" :class="[
                        variantClasses,
                        'bg-transparent text-foreground border-foreground/1 hover:bg-transparent inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium'
                    ]">
                        + {{ extraOptionsCount }} more
                        <XCircle class="ml-2 h-4 w-4 cursor-pointer" @click.stop="clearExtraOptions" />
                    </div>
                </div>

                <div class="flex items-center justify-between">
                    <X class="h-4 mx-2 cursor-pointer text-muted-foreground" @click.stop="handleClear" />
                    <div class="w-px h-6 bg-gray-200 mx-2"></div>
                    <ChevronDown class="h-4 mx-2 cursor-pointer text-muted-foreground" />
                </div>
            </div>

            <div v-else class="flex items-center justify-between w-full mx-auto">
                <span class="text-sm text-muted-foreground mx-3">{{ placeholder }}</span>
                <ChevronDown class="h-4 cursor-pointer text-muted-foreground mx-2" />
            </div>
        </button>

        <!-- Popover Content -->
        <div v-if="isPopoverOpen" class="absolute z-50 w-full mt-1 bg-white rounded-md shadow-lg">
            <div class="p-2">
                <div class="flex items-center px-3 py-2 border rounded-md">
                    <Search class="w-4 h-4 text-gray-400" />
                    <input v-model="searchQuery" type="text" placeholder="Search..."
                        class="w-full px-2 py-1 text-sm border-none focus:outline-none" />
                </div>

                <div class="mt-2 max-h-[200px] overflow-y-scroll">
                    <button @click="toggleAll"
                        class="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                        <div :class="[
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            selectedValues.length === options.length
                                ? 'bg-primary text-primary-foreground'
                                : 'opacity-50'
                        ]">
                            <Check v-if="selectedValues.length === options.length" class="h-4 w-4" />
                        </div>
                        <span>(Select All)</span>
                    </button>

                    <button v-for="option in filteredOptions" :key="option.value" @click="toggleOption(option.value)"
                        class="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 rounded-md">
                        <div :class="[
                            'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                            selectedValues.includes(option.value)
                                ? 'bg-primary text-primary-foreground'
                                : 'opacity-50'
                        ]">
                            <Check v-if="selectedValues.includes(option.value)" class="h-4 w-4" />
                        </div>
                        <component v-if="option.icon" :is="option.icon" class="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>{{ option.label }}</span>
                    </button>
                </div>

                <div class="flex items-center justify-between mt-2 pt-2 border-t">
                    <button v-if="selectedValues.length > 0" @click="handleClear"
                        class="flex-1 px-3 py-2 text-sm text-center hover:bg-gray-100 rounded-md">
                        Clear
                    </button>
                    <div v-if="selectedValues.length > 0" class="w-px h-6 bg-gray-200"></div>
                    <button @click="isPopoverOpen = false"
                        class="flex-1 px-3 py-2 text-sm text-center hover:bg-gray-100 rounded-md">
                        Close
                    </button>
                </div>
            </div>
        </div>

        <!-- <WandSparkles v-if="props.animation > 0 && selectedValues.length > 0" :class="[
            'cursor-pointer my-2 w-3 h-3',
            isAnimating ? 'text-foreground' : 'text-muted-foreground'
        ]" @click="isAnimating = !isAnimating" /> -->
    </div>
</template>

<script setup lang="ts">


import { ref, computed } from 'vue';
import { X, XCircle, ChevronDown, Check, Search, WandSparkles } from 'lucide-vue-next';
// import type { MultiSelectProps, Option } from '../types/multi-select';

// types/multi-select.ts
export interface Option {
    label: string;
    value: string;
    icon?: any; // Vue component type
}

export interface MultiSelectProps {
    options: Option[];
    modelValue: string[];
    placeholder?: string;
    animation?: number;
    maxCount?: number;
    variant?: 'default' | 'secondary' | 'destructive' | 'inverted';
    disabled?: boolean; // Ajoutez cette ligne
}


const props = withDefaults(defineProps<MultiSelectProps>(), {
    placeholder: 'Select options',
    animation: 0,
    maxCount: 3,
    variant: 'default',
    disabled: false, // Ajoutez cette ligne
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string[]): void;
}>();

const isPopoverOpen = ref(false);
const isAnimating = ref(false);
const searchQuery = ref('');

const selectedValues = computed(() => props.modelValue);

const filteredOptions = computed(() => {
    return props.options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const displayedOptions = computed(() => {
    return selectedValues.value.slice(0, props.maxCount);
});

const hasMoreOptions = computed(() => {
    return selectedValues.value.length > props.maxCount;
});

const extraOptionsCount = computed(() => {
    return selectedValues.value.length - props.maxCount;
});

const variantClasses = computed(() => {
    const baseClasses = 'm-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300';

    switch (props.variant) {
        case 'secondary':
            return `${baseClasses} border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80`;
        case 'destructive':
            return `${baseClasses} border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80`;
        case 'inverted':
            return `${baseClasses} inverted`;
        default:
            return `${baseClasses} border-foreground/10 text-foreground bg-card hover:bg-card/80`;
    }
});

const toggleOption = (optionValue: string) => {
    if (props.disabled) return;
    const newValues = selectedValues.value.includes(optionValue)
        ? selectedValues.value.filter(value => value !== optionValue)
        : [...selectedValues.value, optionValue];
    emit('update:modelValue', newValues);
};

const handleClear = () => {
    if (props.disabled) return;
    emit('update:modelValue', []);
};

const toggleAll = () => {
    if (props.disabled) return;
    if (selectedValues.value.length === props.options.length) {
        handleClear();
    } else {
        emit('update:modelValue', props.options.map(option => option.value));
    }
};

const clearExtraOptions = () => {
    if (props.disabled) return;
    emit('update:modelValue', selectedValues.value.slice(0, props.maxCount));
};
</script>

<style scoped>
.animate-bounce {
    animation: bounce 1s infinite;
}

@keyframes bounce {

    0%,
    100% {
        transform: translateY(-25%);
        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }

    50% {
        transform: translateY(0);
        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
}
</style>