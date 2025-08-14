<template>
    <div class="space-y-2  ">
        <!-- header -->
        <section class="h-[48px] flex  rounded">
            <!-- skeleton -->
            <Skeleton class="h-full w-full rounded-t-xl"></Skeleton>
            <!-- <Skeleton class="h-full w-full"></Skeleton>
            <Skeleton class="h-full w-full"></Skeleton>
            <Skeleton class="h-full w-full"></Skeleton>
            <Skeleton class="h-full w-full"></Skeleton> -->
        </section>

        <div class="space-y-2 divide-y-2">

            <!-- columns  -->
            <div v-for="i in 10" class="h-[60px] flex items-center gap-5 ">
                <!-- skeleton line -->
                <Skeleton v-for="i in 6" class="h-3  w-full"></Skeleton>

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'

</script>

<style scoped></style>