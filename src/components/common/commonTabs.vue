<script setup lang="ts">
import type { Tab } from '@/interfaces/global.interface'
import { ref, onMounted, type PropType } from 'vue'



// const tabs = ref<Tab[]>([
//     { id: 'today', label: 'Aujourd\'hui' },
//     { id: 'yesterday', label: 'Hier' },
//     { id: '24h', label: '24 heures' },
//     { id: '7days', label: '7 jours' },
//     { id: '30days', label: '30 jours' },
// ])

const { tabs } = defineProps({
    tabs: {
        type: Array as PropType<Tab[]>,
        required: true,
    }
})

// const show = ref<String>('today');

const activeTab = ref<string>(tabs[0].id)
const indicator = ref<HTMLElement | null>(null)
const tabsList = ref<HTMLElement | null>(null)

const updateIndicator = (index: number) => {
    if (!tabsList.value || !indicator.value) return

    const tabElement = tabsList.value.children[index] as HTMLElement
    const tabPosition = tabElement.offsetLeft
    const tabWidth = tabElement.offsetWidth

    indicator.value.style.transform = `translateX(${tabPosition - 8}px)`
    indicator.value.style.width = `${tabWidth}px`
}

const switchTab = (id: string, index: number) => {
    activeTab.value = id
    updateIndicator(index)
}

const navigate = (e: any) => {
    if (e.target.dataset.show) {
        e.preventDefault();
        // show.value = e.target.dataset.id;
    }
}

onMounted(() => {
    updateIndicator(0)
})
</script>

<template>
    <div class="w-fit bg-gray-50 rounded-lg">
        <div class="relative">
            <!-- Liste des tabs -->
            <div ref="tabsList" class="flex p-1 space-x-1 bg-gray-100 rounded-lg flex-wrap">
                <button v-for="(tab, index) in tabs" :key="tab.id" @click="switchTab(tab.id, index)"
                    class="relative flex-wrap z-20 px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md"
                    :class="[
                        activeTab === tab.id
                            ? 'text-gray-900'
                            : 'text-gray-600 hover:text-gray-900'
                    ]">
                    {{ tab.label }}
                </button>

                <!-- Indicateur animé -->
                <div ref="indicator"
                    class="z-10 absolute   inset-y-1 bg-white rounded-md shadow-sm transition-all duration-200 ease-out" />
            </div>
        </div>
    </div>

    <!-- <transition-group name="fade-up" target="div" appear @click.native="navigate($event)"> -->
    <div v-for="(tab, index) in tabs" v-show="activeTab == tab.id" :key="index">
        <div>
            <slot :name="tab.id"></slot>
        </div>
    </div>
    <!-- </transition-group> -->
</template>

<style scoped>
.section {
    padding: 2em 0;
}

.fade-up-enter-active,
.fade-up-leave-active {
    transition: all 0.3s ease-in-out;
}

.fade-up-enter,
.fade-up-leave-to {
    height: 0;
    transform: translateY(30px);
    opacity: 0;
}
</style>