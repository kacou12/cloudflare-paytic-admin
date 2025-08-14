<template>
    <Pagination v-slot="{ page }" :total="total" :sibling-count="1" show-edges :page="currentPage">
        <PaginationList v-slot="{ items }" class="flex justify-between p-4">
            <!-- <PaginationFirst /> -->
            <PaginationPrev @click="emit('prevPage')" />
            <div class="flex items-center gap-1">

                <template v-for="(item, index) in items">
                    <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
                        <Button @click="emit('goToPage', item.value)"
                            :class="['w-10 h-10 p-0 border-none', item.value === page ? '' : 'text-neutral-40']"
                            :variant="item.value === page ? 'secondary' : 'outline'">
                            {{ item.value }}
                        </Button>
                    </PaginationListItem>
                    <PaginationEllipsis v-else :key="item.type" :index="index" />
                </template>
            </div>

            <PaginationNext @click="emit('nextPage')" />
            <!-- <PaginationLast /> -->
        </PaginationList>
    </Pagination>
</template>
<script setup lang="ts">
import {
    Button,
} from '@/components/ui/button'

import {
    Pagination,
    PaginationEllipsis,
    PaginationFirst,
    PaginationLast,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
} from '@/components/ui/pagination';

// const currentPage = defineModel({ type: Number });


const emit = defineEmits(['nextPage', 'prevPage', 'goToPage']);


defineProps({
    total: {
        type: Number,
        default: 100
    },
    currentPage: {
        type: Number,
        default: 1
    }
})
</script>