<!-- AnimatedTabs.vue -->
<script setup lang="ts">
// import { Tabs, TabsContent } from 'radix-vue'
import { ref } from 'vue'
import { Tabs, TabsContent } from './ui/tabs';

interface Tab {
    value: string
    label: string
    content?: string
}

const props = defineProps<{
    tabs: Tab[]
    defaultTab?: string
}>()

const currentTab = ref(props.defaultTab || props.tabs[0].value)

const handleTabChange = (value: string) => {
    currentTab.value = value
}
</script>

<template>
    <Tabs :default-value="defaultTab" @update:value="handleTabChange" class="w-full">
        <div class="tabs relative grid h-12 auto-cols-fr grid-flow-col rounded-lg border-4 border-black bg-black"
            :class="[
                'after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:top-0',
                'after:w-[calc(100%/var(--count))] after:translate-x-[calc(var(--active)*100%)]',
                'after:rounded-md after:bg-white after:mix-blend-difference',
                'after:transition-transform after:duration-200 after:content-[\'\']',
            ]" :style="{
                '--count': tabs.length,
                '--active': tabs.findIndex(tab => tab.value === currentTab)
            }">
            <template v-for="(tab, index) in tabs" :key="tab.value">
                <input type="radio" :id="tab.value" :name="'tabs'" :value="tab.value"
                    :checked="currentTab === tab.value"
                    class="sr-only [&:checked+label]:[--highlight:1] [&:not(:checked)+label:hover]:bg-[hsl(0,0%,20%)] [&:not(:checked)+label:hover]:[--highlight:0.35]"
                    @change="handleTabChange(tab.value)" />
                <label :for="tab.value"
                    class="grid h-full cursor-pointer place-items-center rounded-md px-[clamp(0.5rem,2vw+0.25rem,2rem)] text-center text-[hsla(0,0%,100%,calc(0.5+var(--highlight,0)))]">
                    {{ tab.label }}
                </label>
            </template>
        </div>

        <template v-for="tab in tabs" :key="tab.value">
            <TabsContent :value="tab.value" class="mt-4">
                <slot :name="tab.value">
                    {{ tab.content }}
                </slot>
            </TabsContent>
        </template>
    </Tabs>
</template>