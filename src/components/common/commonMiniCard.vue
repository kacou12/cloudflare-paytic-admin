<template>

    <div class="bg-white p-3 rounded-lg shadow border border-neutral-70 flex flex-col justify-between ">
        <section class="flex justify-between items-end">
            <h3 class="text-xs xl:text-base font-medium text-black">{{ title }}</h3>
            <!-- <Button variant="ghost" class="w-8 h-8 p-0 text-neutral-30">
                <span class="sr-only">Open menu</span>
                <MoreVertical class="w-4 h-4" />
            </Button> -->
        </section>

        <section class="flex justify-between gap-1  ">
            <div class="flex items-end w-[65%]">
                <div>

                    <div class="">
                        <span class="text-base xl:text-xl font-bold font-merriweather">
                            <count-up :end-val="value"></count-up>
                        </span>
                    </div>


                </div>
            </div>


            <!-- <div class="h-5 w-[35%] bg-purple-500"></div> -->
        </section>


    </div>


</template>

<script setup lang="ts">
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import CountUp from 'vue-countup-v3'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,

)

interface DataPoint {
    month: string
    value: number
}

interface Props {
    data: DataPoint[]
    showChart?: boolean
    value?: number
    title?: string
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [
        { month: 'Sep', value: 10 },
        { month: 'Oct', value: 1000 },
        { month: 'Nov', value: 20 },
        { month: 'Dec', value: 950 },
        { month: 'Jan', value: 1200 }
    ],
    showChart: true,
    value: 0,
    title: "Nombre total de demandes"
})



</script>

<style scoped>
.card {
    width: 300px;
}
</style>