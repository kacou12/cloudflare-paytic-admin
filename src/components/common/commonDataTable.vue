<template>
    <!-- tablde -->


    <div class="border rounded-xl ">
        <Table class="border-b">
            <TableHeader class=" bg-neutral-90">
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id">
                        <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header"
                            :props="header.getContext()" />
                    </TableHead>
                </TableRow>
            </TableHeader>

            <Transition name="slide-fade">

                <TableBody :key="table.getRowModel().rows?.length || (isLoadingData ? 'loading' : 'not-loading')">
                    <template v-if="table.getRowModel().rows?.length">
                        <TableRow v-for="row in table.getRowModel().rows" :key="row.id"
                            :data-state="row.getIsSelected() ? 'selected' : undefined">
                            <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id"
                                :width="dynamicWidthColumns ? undefined : cell.column.columnDef.size">
                                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                            </TableCell>
                        </TableRow>
                    </template>
                    <template v-else-if="isLoadingData">
                        <TableRow v-for="row in 10" :key="row" :data-state="undefined">
                            <TableCell v-for="cell in table.getHeaderGroups()[0].headers" :key="cell.id"
                                :width="dynamicWidthColumns ? undefined : cell.column.columnDef.size">
                                <div class="my-4">
                                    <Skeleton class="h-3 w-full"></Skeleton>
                                </div>
                            </TableCell>
                        </TableRow>
                    </template>
                    <template v-else>
                        <TableRow>
                            <TableCell :colspan="columns.length" class="h-[calc(95vh/2)] text-center">
                                <img src="@/assets/images/empty_table.gif" alt="" class="w-[150px] h-[150px] mx-auto">
                            </TableCell>
                        </TableRow>
                    </template>
                </TableBody>
            </Transition>
        </Table>


        <FadeSlideAnimation>
            <commonPagination v-if="table.getRowModel().rows?.length" :items-per-page="pageSize"
                :current-page="defaultPage" @go-to-page="goToPage" @next-page="goNextPage" @prev-page="goPrevPage"
                :total="total" />
            <div v-else-if="isLoadingData">
                <div class="animate-pulse bg-gray-200 h-[72px] rounded-b-xl"></div>
            </div>
        </FadeSlideAnimation>
    </div>



</template>
<script setup lang="ts" generic="TData, TValue">
import commonPagination from '@/components/common/commonPagination.vue';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,

    TableRow,
} from '@/components/ui/table';
import type { ColumnDef } from '@tanstack/vue-table';
// current page  === table.getState().pagination.pageIndex + 1
// {{ table.getState().pagination.pageIndex + 1 }} of
//             {{ table.getPageCount() }}

import { useLoaderStore } from '@/stores/useLoaderStore';
import { useIsFetching } from '@tanstack/vue-query';
import {
    FlexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useVueTable
} from '@tanstack/vue-table';
import { storeToRefs } from 'pinia';
import { computed, onBeforeMount, ref, watch } from 'vue';
import Skeleton from '../ui/skeleton/Skeleton.vue';
import FadeSlideAnimation from '../animations/fadeSlideAnimation.vue';

const isFetching = useIsFetching(
    // { queryKey: [adminQueryKeys.adminFilters] }
);
const { isLoading, isLoadingSkeleton } = storeToRefs(useLoaderStore());
const isLoadingData = computed(() => {
    return isLoading.value || isLoadingSkeleton.value || isFetching.value;
})

const { defaultPage = 1, data, columns, dynamicWidthColumns = true, pageSize = 10, manualPagination = true } = defineProps<{
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    total: number,
    defaultPage?: number
    pageSize?: number
    manualPagination?: boolean
    // onNextPage: () => void,
    // onPrevPage: () => void,
    dynamicWidthColumns?: boolean

}>()

const showTable = ref(true);

onBeforeMount(() => {
    // table.getAllColumns().forEach((column) => {
    //     console.log(column.getSize());


    // })

    // console.log(table.getColumn('id')?.columnDef.size);


})




const emit = defineEmits(['nextPage', 'prevPage', 'goToPage', 'updateSelectedRows'])

const goNextPage = async () => {
    // currentPage.value++
    emit('nextPage', currentPage.value)
}
const goToPage = async (page: number) => {
    // currentPage.value++
    emit('goToPage', page)
}

const goPrevPage = () => {
    // currentPage.value--
    emit('prevPage', currentPage.value)
}

const currentPage = ref(1);

const table = useVueTable({
    // pageCount: 5,
    get data() { return data },
    get columns() { return columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: manualPagination,
    enableColumnResizing: false,

    defaultColumn: {
        size: 187, //starting column size
        minSize: 5, //enforced during column resizing
        maxSize: 440, //enforced during column resizing

    },

    initialState: {

        pagination: {
            pageSize: 5,




        },


    }
})

const selectedRowModel = computed(() => {
    return Object.values(table.getSelectedRowModel().rowsById).map(item => item.original)
})



watch(() => selectedRowModel.value, (n, o) => {
    if (n.length != o.length) {
        emit('updateSelectedRows', n)
    }

    // selectedRowData.value = n[0]
})




</script>
<style scoped>
/* Animation de fade et slide */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from {
    transform: translateX(30px);
    opacity: 0;
}

.slide-fade-leave-to {
    transform: translateX(-30px);
    opacity: 0;
}

/* Alternative: transition avec slide vertical */
.slide-vertical-enter-active,
.slide-vertical-leave-active {
    transition: all 0.3s ease;
}

.slide-vertical-enter-from {
    transform: translateY(20px);
    opacity: 0;
}

.slide-vertical-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

/* Alternative: transition fade simple */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>