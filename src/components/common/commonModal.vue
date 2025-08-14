<template>
    <Dialog v-model:open="open">
        <DialogTrigger as-child>

            <!-- <Button class=" py-[22px]  text-sm rounded-lg" variant="outline">
                Rejeter la verification
            </Button> -->
            <slot name="trigger"></slot>
        </DialogTrigger>
        <DialogContent class="max-w-[90%] rounded-lg sm:max-w-[480px] font-worksans 
        max-h-[90%]  ">
            <form @submit.prevent="() => handleSubmit()" class="space-y-3 flex flex-col h-full">
                <!-- max-h-[calc(100vh-64px-76px)] overflow-y-auto -->
                <!-- h-[calc(100%-150px)] -->


                <!-- bg-[url('/src/assets/images/hexagone.png')]  -->
                <DialogHeader :class="[showDivider ? 'border-b-[1px]' : '']"
                    class="flex flex-row justify-between  border-neutral-200">
                    <DialogTitle>
                        <slot name="title"></slot>
                    </DialogTitle>
                    <!-- <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription> -->


                    <!-- CLOSE ICON SVG -->
                    <DialogClose class="w-fit rounded-sm opacity-70  
                        transition-opacity hover:opacity-100 
                        disabled:pointer-events-none 
                        data-[state=open]:bg-accent 
                        data-[state=open]:text-muted-foreground border-none">
                        <!-- <X class="w-4 h-4" />
                        <span class="sr-only">Close</span> -->
                        <close-icon></close-icon>

                    </DialogClose>


                </DialogHeader>
                <section class="flex-1 w-full ">
                    <div :class="`text-sm px-4 py-4 max-h-[calc(100vh-250px)]  overflow-y-auto ${backgroudColor}`">
                        <slot name="content"></slot>
                    </div>
                </section>


                <DialogFooter>

                    <slot name="footer"></slot>

                </DialogFooter>
            </form>


        </DialogContent>
    </Dialog>
</template>
<script setup lang="ts">
import closeIcon from '@/components/svg/closeIcon.vue'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import DialogClose from '@/components/ui/dialog/DialogClose.vue'

import { type PropType } from 'vue'
defineProps({
    backgroudColor: {
        default: 'bg-[#F5F5F5]',
        type: String as PropType<'bg-neutral-80' | 'bg-white'>
    },
    showDivider: {
        default: true,
        type: Boolean
    },
    handleSubmit: {
        type: Function as PropType<() => void>,
        default: () => { }
    }
})

// defineEmits(['onSubmit'])

const open = defineModel({ type: Boolean, default: false });
// const open = ref(false);



</script>