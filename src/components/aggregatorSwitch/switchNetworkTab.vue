<template>

    <!-- <Tabs v-model="currentProvider" :default-value="providers![0].id" class="w-full "> -->
    <Tabs v-model="provider" class="w-full ">
        <TabsList class="w-full  rounded-xl">
            <TabsTrigger v-for="provider in providers" :key="provider.id" class="w-full" :value="provider.id">
                {{ provider.operator }}
            </TabsTrigger>
            <!-- <TabsTrigger class="w-[25%]" value="orange">
                Orange
            </TabsTrigger>
            <TabsTrigger class="w-[25%]" value="MTN">
                MTN
            </TabsTrigger>
            <TabsTrigger class="w-[25%]" value="Wave">
                Wave
            </TabsTrigger> -->
        </TabsList>
        <!-- <TabsContent value="userData">
            <UsersDataTab></UsersDataTab>
        </TabsContent>
        <TabsContent value="userVerification">
            <UsersVerficationTab></UsersVerficationTab>
        </TabsContent> -->
    </Tabs>
</template>

<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ProviderResponse } from '@/services/providers/provider-type';
import { computed, nextTick, ref, type PropType } from 'vue';

const provider = defineModel({ type: String });

const { providers } = defineProps({
    providers: {
        type: Object as PropType<ProviderResponse[]>,
        required: true
    },
})
const tabsKey = ref(0);

const providerWidthClass = computed(() => {

    if (providers?.length === 0) {
        return "w-auto";

    }
    // tabsKey.value++;
    // nextTick(() => {
    //     tabsKey.value++;
    // })


    // return `w-[calc(100%/${providers?.length})]`;
    return `w-full`;
});


</script>