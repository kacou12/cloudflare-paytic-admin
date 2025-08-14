<template>
    <div class="dropdown-menu-container">
        <!-- En-tête du menu dropdown (cliquable) -->
        <div class="dropdown-header" @click="toggleDropdown" :class="{ 'active': isOpen }">
            <div class="header-content">
                <component :is="icon" v-if="icon" class="menu-icon" />
                <span class="text-sm">{{ title }}</span>
            </div>
            <ChevronRight class="arrow-icon" :class="{ 'rotate': isOpen }" />
        </div>

        <!-- Contenu du sous-menu -->
        <transition name="dropdown">
            <div class="dropdown-content" v-if="isOpen">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChevronRight } from 'lucide-vue-next';

interface DropdownMenuProps {
    title: string;
    icon?: any; // Optionnel, pour le composant d'icône
    initialOpen?: boolean; // État initial du dropdown
}

const props = defineProps<DropdownMenuProps>();

// État du dropdown
const isOpen = ref(props.initialOpen || false);

// Fonction pour basculer l'état du dropdown
const toggleDropdown = (): void => {
    isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.dropdown-menu-container {
    width: 100%;
}

.dropdown-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.dropdown-header:hover,
.dropdown-header.active {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.header-content {
    display: flex;
    align-items: center;
}

.menu-icon {
    margin-right: 10px;
    width: 18px;
    height: 18px;
}

.arrow-icon {
    transition: transform 0.3s ease;
    width: 16px;
    height: 16px;
}

.arrow-icon.rotate {
    transform: rotate(90deg);
}

.dropdown-content {
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

/* Animation du dropdown */
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.3s;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    max-height: 0;
}

.dropdown-enter-to,
.dropdown-leave-from {
    opacity: 1;
    max-height: 300px;
}
</style>