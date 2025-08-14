<template>
    <Tabs v-model="tabs" class="w-full  ">
        <TabsList class="w-full md:w-auto flex-wrap border-2">
            <TabsTrigger class="text-xs md:text-sm" value="0">
                Aujourd'hui
            </TabsTrigger>
            <TabsTrigger class="text-xs md:text-sm" value="1">
                Hier
            </TabsTrigger>
            <!-- <TabsTrigger class="text-xs md:text-sm" value="">
                24 heures
            </TabsTrigger> -->
            <TabsTrigger class="text-xs md:text-sm" value="7">
                7 jours
            </TabsTrigger>
            <TabsTrigger class="text-xs md:text-sm" value="30">
                30 jours
            </TabsTrigger>


            <!-- <TabsTrigger value="12months">
                12 mois
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const tabs = defineModel({
    type: String
});
</script>