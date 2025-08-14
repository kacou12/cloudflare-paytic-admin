<template>

    <!-- <div class=""> -->
    <div class="flex justify-end text-sm ">
        <section class="flex items-center gap-3  group ">
            <Button @click="currentTypeTransactionFilter = 'collected'"
                :disabled="currentTypeTransactionFilter == 'collected'"
                class="p-4 flex items-center hover:opacity-50 transition-opacity " variant="ghost">
                <span class="flex w-3 h-3 me-3 bg-orange-500 rounded-full"></span>
                <p>Collecté</p>
            </Button>
            <Button @click="currentTypeTransactionFilter = 'transferred'"
                :disabled="currentTypeTransactionFilter == 'transferred'"
                class="p-4 flex items-center hover:opacity-50 transition-opacity " variant="ghost">
                <span class="flex w-3 h-3 me-3 bg-green-500 rounded-full"></span>
                <p>Transferé</p>
            </Button>

        </section>

    </div>
    <div class="h-[314px]">

        <bar-chart :data="currentTypeTransactionFilter === 'collected' ? chartDataCollected : chartDataTransferred"
            :options="chartOptions"></bar-chart>
    </div>
    <!-- </div> -->

</template>

<script setup lang="ts">

import { Bar as BarChart } from 'vue-chartjs';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    type ChartData,
    type ChartOptions
} from 'chart.js'
import { onBeforeMount, ref } from 'vue';
import { Button } from '../ui/button';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const currentTypeTransactionFilter = ref<'collected' | 'transferred'>('collected');

const chartDataCollected: ChartData<"bar"> = {

    labels: ["Orange", "MTN", "Wave", "Moov"],


    datasets: [
        {
            // label: "Blue",
            backgroundColor: '#4CAF50',
            // fillColor: "blue",
            data: [3, 2, 1, 4],
            barThickness: 20,
            borderRadius: 10,
            borderWidth: 4,
            borderColor: 'white'

        },
        {
            // label: "Red",
            backgroundColor: "#F44336",
            data: [4, 5, 6, 7],
            barThickness: 20,
            borderRadius: 10,
            borderWidth: 4,
            borderColor: 'white'

        },
        // {
        //     label: "Green",
        //     backgroundColor: "green",
        //     data: [7, 6],
        //     barThickness: 16,
        // }
    ]
};
const chartDataTransferred: ChartData<"bar"> = {

    labels: ["Orange", "MTN", "Wave", "Moov"],


    datasets: [
        {
            // label: "Blue",
            backgroundColor: '#4CAF50',
            // fillColor: "blue",
            data: [5, 3, 1, 5],
            barThickness: 20,
            borderRadius: 10,
            borderWidth: 4,
            borderColor: 'white'

        },
        {
            // label: "Red",
            backgroundColor: "#F44336",
            data: [2, 2, 4, 9],
            barThickness: 20,
            borderRadius: 10,
            borderWidth: 4,
            borderColor: 'white'

        },
        // {
        //     label: "Green",
        //     backgroundColor: "green",
        //     data: [7, 6],
        //     barThickness: 16,
        // }
    ]
};
onBeforeMount(() => {
    console.log(";dm");
})

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
    },
    {
        id: "2",
        amount: "11450551",
        color: "#005CA8",
        label: "Moov",
        percentage: "55",
        value: 23450551
    },


]);

const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,

    scales: {
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Montant en F CFA',
                font: {
                    // size: 14,

                    family: "Work Sans"
                },
                // Rotation du texte si nécessaire

            }



        },
        x: {

            ticks: {
                // fontFamily: 'FontAwesome'
                font: {
                    family: "Work Sans"
                }
            },
            title: {
                display: true,
                text: 'Réseau',
                font: {
                    size: 14,
                    family: "Work Sans"
                },
                // Rotation du texte si nécessaire

            }

            // axis:

            //   barPercentage: 0.6, // set the bar width to 60% of the category width
            //   categoryPercentage: 0.8 // set the category width to 80% of the overall chart area
        }
    },




    plugins: {

        legend: {

            display: false
            // tooltip
        },


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

    }

};
</script>