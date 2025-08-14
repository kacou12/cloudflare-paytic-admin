<template>

    <div class="bg-white p-4 rounded-lg shadow border border-neutral-70 flex flex-col justify-between gap-6">
        <section class="flex justify-between items-end">
            <h2 class="text-sm xl:text-base font-medium text-black">{{ title }}</h2>
            <!-- <Button variant="ghost" class="w-8 h-8 p-0 text-neutral-30">
                <span class="sr-only">Open menu</span>
                <MoreVertical class="w-4 h-4" />
            </Button> -->
        </section>

        <section class="flex justify-between gap-1  ">
            <div class="flex items-end w-[65%]">
                <div>

                    <div class="">
                        <span
                            class="text-xl xl:text-3xl font-bold font-merriweather text-success-500 flex items-center">
                            + <count-up :end-val="value"></count-up>
                        </span>
                    </div>

                    <div v-if="showChart" class="inline-flex items-center justify-between mt-4">

                        <common-badge :show-background="false" type="up" :value="40" />

                        <span class="text-neutral-30 text-[10px] xl:text-sm font-medium mb-1">vs {{ vsDateTitle
                            }}</span>
                    </div>
                </div>
            </div>

            <div class="max-h-[81px] w-[35%] " v-if="showChart">
                <Line :data="chartData" :options="chartOptions" />
            </div>
            <!-- <div class="h-5 w-[35%] bg-purple-500"></div> -->
        </section>


    </div>


</template>

<script setup lang="ts">
import CommonBadge from '@/components/common/commonBadge.vue'
import {
    CategoryScale,
    Chart as ChartJS,
    Filler,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    type ChartData,
    type ChartOptions,
} from 'chart.js'
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
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
    vsDateTitle?: string
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
    title: "Nombre total de demandes",
    vsDateTitle: "Janvier (1202)"
})

const currentValue = computed(() => {
    return props.data[props.data.length - 1].value
})

const percentageChange = computed(() => {
    const lastValue = props.data[props.data.length - 1].value
    const previousValue = props.data[props.data.length - 2].value
    return Math.round(((lastValue - previousValue) / previousValue) * 100)
})



const chartData = computed<ChartData<'line'>>(() => ({
    labels: props.data.map(d => d.month),
    datasets: [
        {
            data: props.data.map(d => d.value),
            fill: 'start',

            // green
            borderColor: '#388E3C',

            // red
            // borderColor: '#d32f2f',

            pointBackgroundColor: 'white',


            backgroundColor: (ctx) => {
                const canvas = ctx.chart.ctx;
                // const gradient = canvas.createLinearGradient(0, 0, 0, 160);
                const gradient = canvas.createLinearGradient(0, 80, 0, 0);

                gradient.addColorStop(0, '#ffffff');

                // green
                gradient.addColorStop(1, '#9cdd9e');

                // red
                // gradient.addColorStop(1, '#e97e80');

                return gradient;
            }


            ,
            tension: 0.4,
            pointRadius: 0,
            borderWidth: 2,

        }
    ]
}))

const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },

    scales: {
        x: {
            display: false
        },
        y: {
            display: false,
            min: Math.min(...props.data.map(d => d.value)) * 0.9,
            max: Math.max(...props.data.map(d => d.value)) * 1.1
        }
    },
    interaction: {
        intersect: false
    }
}

const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('fr-FR').format(num)
}
</script>

<style scoped>
.card {
    width: 300px;
}
</style>