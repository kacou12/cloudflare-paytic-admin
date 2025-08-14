<template>
    <Breadcrumb class="text-sm font-publicsans">
        <BreadcrumbList>
            <BreadcrumbItem>
                <router-link class="transition-colors hover:text-foreground" :to="{ name: links![0].route }">
                    {{ links![0].title }}
                </router-link>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
                <router-link active-class="font-semibold text-neutral-10 cursor-default" disabled
                    :to="{ name: links![1].route, params: links![1].params }">
                    {{ links![1].title }}
                </router-link>
            </BreadcrumbItem>


        </BreadcrumbList>
    </Breadcrumb>
</template>
<script lang="ts" setup>
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import type { PropType } from 'vue';
defineProps({
    links: Array as PropType<{ title: string, route: string, params?: Record<string, string> }[]>
})
</script>
