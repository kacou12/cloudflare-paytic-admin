<template>
    <div class="bg-white p-5 rounded-xl shadow border border-neutral-70 ">
        <h2 class="text-xl font-semibold">Flux cumulé par operateur</h2>
        <div class="flex flex-col xs:flex-row gap-6 font-worksans items-center"
            v-if="sum_txns_amount_group_by_provider.length > 0">

            <section class="items-end space-x-3">
                <div class="max-w-[150px] max-h-[140px] h-fit flex items-center ">
                    <doughnut-chart class="mb-2" :data="chartData" :options="chartOptions" />
                </div>
            </section>

            <section class="flex-1 h-full py-8  w-full ">
                <div class="grid grid-cols-3 xs:grid-cols-2  sm:grid-cols-3 gap-y-10 ">
                    <article class="flex gap-2 items-center" v-for="provider in data.sum_txns_amount_group_by_provider">
                        <div :style="`background-color: ${getProviderColor(provider.operator)};`"
                            class="w-3 h-3 rounded-full"></div>
                        <p class=" text-sm">{{ provider.operator }}</p>
                    </article>
                </div>
            </section>
        </div>

        <div v-else class="flex flex-col items-center justify-center h-full">
            <p class="text-center text-sm">Aucune donnée disponible</p>
        </div>
    </div>
</template>

<script setup lang="ts">
interface CustomDataPoint {
    id: string;
    value: number;
    label: string;
    amount: string;
    percentage: string;
    color: string;
}

import {
    ArcElement,
    Chart as ChartJS,
    Legend,
    Title,
    Tooltip,
    type ChartData,
    type ChartOptions
} from 'chart.js';

import { Doughnut as DoughnutChart } from "vue-chartjs";
import { computed, onBeforeUnmount, onMounted, ref, watch, type PropType } from 'vue';
import { createDecreasingArray, formatPrice } from '@/lib/utils';
import { getProviderColor } from '@/services/auth/auth-util';
import type { SumTxnsAmountGroupByProvider, TransactionStatsResponse } from '@/services/transactions/transaction-type';

ChartJS.register(
    ArcElement,
    Title,
    Tooltip,
    Legend
);

// Utilisez defineProps pour définir les props passées au composant
const props = defineProps({
    count_txns_failed: {
        type: Number,
        required: true
    },
    count_txns_success: {
        type: Number,
        required: true
    },
    sum_txns: {
        type: Number,
        required: true
    },
    sum_txns_amount_group_by_provider: {
        type: Array as PropType<SumTxnsAmountGroupByProvider[]>,
        required: true
    }
});

// Créez une ref 'data' qui encapsule les props pour une meilleure lisibilité
const data = ref({
    count_txns_failed: props.count_txns_failed,
    count_txns_success: props.count_txns_success,
    sum_txns: props.sum_txns,
    sum_txns_amount_group_by_provider: props.sum_txns_amount_group_by_provider,
});

// Watcher pour mettre à jour 'data' si les props changent
watch(props, (newProps) => {
    data.value = {
        count_txns_failed: newProps.count_txns_failed,
        count_txns_success: newProps.count_txns_success,
        sum_txns: newProps.sum_txns,
        sum_txns_amount_group_by_provider: newProps.sum_txns_amount_group_by_provider,
    };
}, { deep: true });


setTimeout(() => {
    ChartJS.register(customDoughnutPlugin);
}, 100);

const customDoughnutPlugin = {
    id: 'customDoughnutPlugin',
    afterDraw: (chart: ChartJS) => {
        if (data.value.sum_txns == 0) { // Utilisez data.value
            return;
        }
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        const GAP_ANGLE = 0.02;

        if (!meta.data || (meta.data! as Array<any>).length == 0) return;

        ctx.save();
        const firstDatapoint = meta.data[0];
        ctx.beginPath();
        // @ts-ignore
        ctx.arc(firstDatapoint.x, firstDatapoint.y, firstDatapoint.outerRadius + 1, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        meta.data.forEach((datapoint: any, index) => {
            const radiusMultipliers = createDecreasingArray({ numberOfElements: data.value.sum_txns_amount_group_by_provider!.length }); // Utilisez data.value

            const { x, y } = datapoint;
            const innerRadius = datapoint.innerRadius * radiusMultipliers[index];
            const outerRadius = datapoint.outerRadius;
            const startAngle = datapoint.startAngle + GAP_ANGLE;
            const endAngle = datapoint.endAngle - GAP_ANGLE;

            ctx.beginPath();
            ctx.arc(x, y, outerRadius, startAngle, endAngle);
            ctx.arc(x, y, innerRadius, endAngle, startAngle, true);
            ctx.closePath();

            // Appliquer le style
            // @ts-ignore
            ctx.fillStyle = chart.data.datasets[0].backgroundColor![index] as string;
            ctx.fill();
        });

        ctx.restore();
    }
};

const isRegister = ref(false);
const componentKey = ref(0);
const doughnutRef = ref();

setTimeout(() => {
    isRegister.value = true
}, 200)

const currentChartDataValues = computed<number[]>(() => {
    if (!isRegister.value) return [];
    // Utilisez data.value partout où vous accédez aux props
    return data.value.sum_txns_amount_group_by_provider?.map((d) => {
        return Math.round((d.total * 100) / data.value.sum_txns)
    }) as number[]
})

watch(isRegister, () => {
    componentKey.value += 1;
}, { once: true })

const currentData = computed(() => {
    return data.value.sum_txns_amount_group_by_provider!.length; // Utilisez data.value
})

const radiusMultipliers = computed(() => {
    return createDecreasingArray({ numberOfElements: data.value.sum_txns_amount_group_by_provider!.length }); // Utilisez data.value
});

const chartData = computed<ChartData<"doughnut", number[], CustomDataPoint>>(() => {
    return {
        datasets: [
            {
                borderWidth: 0,
                data: currentChartDataValues.value,
                backgroundColor:
                    data.value.sum_txns_amount_group_by_provider!.map((d, index) => { // Utilisez data.value
                        return getProviderColor(d.operator)!;
                    }),
                circumference: 360,
            },
        ],
    }
})

const arrayTooltips = ref(
    data.value.sum_txns_amount_group_by_provider?.map((d, index) => { // Utilisez data.value
        return {
            id: index.toString(),
            amount: d.total.toString(),
            color: getProviderColor(d.operator),
            label: d.operator,
            percentage: Math.round((d.total * 100) / data.value.sum_txns).toString(), // Utilisez data.value
            value: data.value.sum_txns // Utilisez data.value
        };
    })
);

const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    aspectRatio: 1,
    plugins: {
        tooltip: {
            enabled: false,
            external: function (context) {
                let tooltipEl = document.getElementById('chartjs-tooltip');

                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.id = 'chartjs-tooltip';
                    tooltipEl.innerHTML = '<div></div>';
                    document.body.appendChild(tooltipEl);
                }

                const tooltipModel = context.tooltip;
                if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = '0';
                    return;
                }

                if (tooltipModel.body) {
                    const dataPoint = tooltipModel.dataPoints[0];
                    const providerData = arrayTooltips.value[dataPoint.dataIndex];

                    const innerHtml = `
                        <div class="text-xs bg-white rounded-md p-5 shadow-lg font-worksans">
                            <section class="flex gap-1 items-center">
                                <div style="background-color: ${providerData.color};" class="w-2 h-2 rounded-full"></div>
                                <p class="font-bold">${providerData.label}</p>
                            </section>
                            <section>
                                <p class="font-medium text-neutral-20">${formatPrice(parseInt(providerData.amount))} / ${formatPrice(providerData.value)} </p>
                            </section>
                            <section class="font-medium text-neutral-20">
                                <p>soit ${providerData.percentage}%</p>
                            </section>
                        </div>`;

                    tooltipEl.querySelector('div')!.innerHTML = innerHtml;
                }

                const position = context.chart.canvas.getBoundingClientRect();
                tooltipEl.style.opacity = '1';
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 30 + 'px';
                tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                tooltipEl.style.pointerEvents = '';
                tooltipEl.style.transition = 'all .3s ease';
            }
        },
        legend: {
            display: true,
            position: "top",
        },
    },
};

onBeforeUnmount(() => {
    ChartJS.unregister(customDoughnutPlugin);
});

onMounted(() => {
    // Les calculs ici se feront avec data.value
    const results = data.value.sum_txns_amount_group_by_provider?.map((d) => {
        return Math.round((d.total * 100) / data.value.sum_txns)
    }) as number[];
});
</script>

<style scoped>
.card {
    width: 300px;
}
</style>