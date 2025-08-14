<template>

    <div
        class="bg-white p-5 rounded-xl shadow border border-neutral-70 flex flex-col justify-between gap-6 font-publicsans ">
        <section class="flex justify-between items-end xl:h-[150px] h-[100px] space-x-3">
            <!-- chart doughnut -->
            <div class="max-w-[30%] xl:w-[150px]  h-full flex items-center">
                <!-- <doughnut-chart :data="card.chartData" :options="chartOptions" /> -->
                <doughnut-chart class="mb-2 " :data="chartData" :options="chartOptions" />
            </div>
            <!-- informations transaction -->
            <div class="flex h-full flex-col w-full xl:justify-between justify-around pt-2">

                <article class="flex justify-between  w-full">
                    <p class="font-medium text-[16px]">{{ title }}</p>
                    <!-- <MoreVertical class="w-4 h-4" /> -->
                </article>

                <div>
                    <article class="mb-2">
                        <p class="text-sm font-medium text-neutral-20">{{ subTitle }}</p>
                    </article>

                    <article class="flex justify-between items-center">
                        <p class="font-merriweathersans font-bold text-lg xl:text-[28px]">{{ amount }} <span
                                v-if="isMoney">F
                                CFA</span></p>
                        <CommonBadge :value="percentage"></CommonBadge>
                    </article>
                </div>

            </div>
        </section>

        <div v-if="showNetworkDetails" class="my-2 h-[1px] bg-neutral-70 mx-4"></div>

        <!-- info network -->
        <section v-if="showNetworkDetails" class="flex flex-col justify-between gap-2 text-neutral-20 font-[16px] mx-5">
            <article class="flex justify-between">
                <div>
                    <img width="32" height="32" src="/src/assets/images/logos/orange.png" alt="">
                </div>
                <p>463 377 CFA</p>
                <p>5.53 %</p>
            </article>
            <article class="flex justify-between">
                <div>
                    <img width="32" height="32" src="/src/assets/images/logos/moov.png" alt="">
                </div>
                <p>463 377 CFA</p>
                <p>5.53 %</p>
            </article>
            <article class="flex justify-between">
                <div>
                    <img width="32" height="32" src="/src/assets/images/logos/mtn.png" alt="">
                </div>
                <p>463 377 CFA</p>
                <p>5.53 %</p>
            </article>
            <article class="flex justify-between">
                <div>
                    <img width="32" height="32" src="/src/assets/images/logos/wave.png" alt="">
                </div>
                <p>463 377 CFA</p>
                <p>5.53 %</p>
            </article>

        </section>


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

import CommonBadge from '@/components/common/commonBadge.vue';
import { onBeforeUnmount, ref } from 'vue';

ChartJS.register(
    {
        ArcElement,
        Title,
        Tooltip,
        Legend
    }

);

const customDoughnutPlugin = {
    id: 'customDoughnutPlugin',
    afterDraw: (chart: ChartJS) => {
        const { ctx } = chart;
        const meta = chart.getDatasetMeta(0);
        const GAP_ANGLE = 0.02;

        if (!meta.data) return;

        ctx.save();
        // ctx .clearRect(0, 0, chart.width, chart.height);
        const firstDatapoint = meta.data[0];
        ctx.beginPath();
        // @ts-ignore
        ctx.arc(firstDatapoint.x, firstDatapoint.y, firstDatapoint.outerRadius + 1, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();

        meta.data.forEach((datapoint: any, index) => {
            const radiusMultipliers = [0.85, 0.90, 0.95, 1];

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
ChartJS.register(customDoughnutPlugin);





defineProps({
    title: {
        type: String,
        required: false,
        default: "Envoi d'argent inter reseau"
    },
    subTitle: {
        type: String,
        required: false,
        default: "Transaction de la journée"
    },
    isMoney: {
        type: Boolean,
        required: false,
        default: true
    },
    amount: {
        type: Number,
        required: false,
        default: 23450551
    },
    percentage: {
        type: Number,
        required: false,
        default: 5
    },
    showNetworkDetails: {
        type: Boolean,
        required: false,
        default: true
    }

});

const chartData: ChartData<"doughnut", number[], CustomDataPoint>
    = {



    datasets: [

        {
            // borderWidth: 2,
            // borderAlign: "center",
            // borderColor: "red",
            // hidden: true,
            // spacing: 10,


            // borderWidth: 10s,
            // weight: 80,
            borderWidth: 0,


            data: [30, 25, 20, 25],
            // data: [

            // ],
            backgroundColor: ["#F58220", "#005CA8", "#FFC403", "#1DC8FF"],
            circumference: 360,


        },
    ],
}

const arrayTooltips = ref([
    {
        id: "1",
        amount: "11450551",
        // color: "#F58220",
        color: "#ED7F10",
        label: "Orange",
        percentage: "55",
        value: 23450551
    },
    {
        id: "2",
        amount: "11450551",
        color: "#005CA8",
        label: "Moov",
        percentage: "55",
        value: 23450551
    },
    {
        id: "3",
        amount: "11450551",
        color: "#FFC403",
        label: "MTN",
        percentage: "55",
        value: 23450551
    },
    {
        id: "4",
        amount: "11450551",
        color: "#1DC8FF",
        label: "Wave",
        percentage: "55",
        value: 23450551
    }
]);


const chartOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    aspectRatio: 1,

    // elements: {
    //     arc: {
    //         spacing: 0,
    //         borderRadius: 0
    //     }
    // },

    plugins: {

        tooltip: {
            enabled: false,  // Désactive le tooltip par défaut
            external: function (context) {
                console.log("banaro")
                // Récupère l'élément tooltip
                let tooltipEl = document.getElementById('chartjs-tooltip');

                // Crée le tooltip s'il n'existe pas
                if (!tooltipEl) {
                    tooltipEl = document.createElement('div');
                    tooltipEl.id = 'chartjs-tooltip';
                    tooltipEl.innerHTML = '<div></div>';
                    document.body.appendChild(tooltipEl);
                }

                // Cache le tooltip si le hover est terminé
                const tooltipModel = context.tooltip;
                if (tooltipModel.opacity === 0) {
                    tooltipEl.style.opacity = '0';
                    return;
                }


                // Met à jour le contenu
                if (tooltipModel.body) {
                    const dataPoint = tooltipModel.dataPoints[0];
                    console.log(`yep ${dataPoint.dataIndex}`);

                    const data = context.chart.data.datasets[0].data[dataPoint.dataIndex] as any;

                    const test = arrayTooltips.value[dataPoint.dataIndex];
                    // const data: CustomDataPoint = {
                    //     id: "1",
                    //     amount: "11450551",
                    //     color: "orange",
                    //     label: "Orange",
                    //     percentage: "55",
                    //     value: 23450551
                    // }

                    const innerHtml = `
                <div class="text-xs bg-white rounded-md p-5 shadow-lg font-publicsans">
                    <section class="flex gap-1 items-center">
                        <div style="background-color: ${test.color};" class="w-2 h-2 rounded-full"></div>
                        <p class="font-bold">${test.label}</p>
                    </section>
                    <section>
                        <p class="font-medium text-neutral-20">11450551 F CFA / 23450551.6 F CFA</p>
                    </section>
                    <section class="font-medium  text-neutral-20">
                        <p>soit 55%</p>
                    </section>
                 </div>`;

                    tooltipEl.querySelector('div')!.innerHTML = innerHtml;
                }

                // Positionne le tooltip
                const position = context.chart.canvas.getBoundingClientRect();
                const bodyFont = { size: 14 };

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
    // Nettoyer le plugin quand le composant est détruit
    ChartJS.unregister(customDoughnutPlugin);
});




</script>

<style scoped>
.card {
    width: 300px;
}
</style>