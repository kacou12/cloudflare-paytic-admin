<template>
    <div class="h-[240px] w-[99%]">
        <!-- <Bar :data="chartData" :options="chartOptions" /> -->
        <Bar :data="chartDataBloc" :options="chartOptions" />
    </div>
</template>

<script setup lang="ts">
import { Bar } from 'vue-chartjs'
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

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
)

// Définition des types
interface DataSet {
    label: string
    data: number[]
    backgroundColor: string
}

const { chartDataBloc } = defineProps<{ chartDataBloc: ChartData<"bar"> }>()

// Données du graphique
// const chartData: ChartData<"bar"> = {
//     labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
//     datasets: [
//         {
//             label: 'Envoi d\'argent',
//             pointStyle: "circle",
//             // borderRadius: 20,
//             borderRadius: {
//                 topLeft: 8,
//                 topRight: 8,

//             },
//             data: [30, 40, 50, 35, 30, 35, 35, 35, 35, 35, 35, 30],
//             backgroundColor: '#4CAF50', // vert foncé
//             barPercentage: 0.4,


//             // order:1
//         },
//         {
//             label: 'Achat de carte cadeau',
//             pointStyle: "circle",

//             // borderRadius: 10,
//             data: [20, 35, 20, 25, 15, 30, 25, 25, 20, 30, 25, 20],
//             backgroundColor: '#C8E6C9', // vert clair
//             barPercentage: 0.4,
//             base: 0,
//             borderRadius: {

//                 topLeft: 8,
//                 topRight: 8,

//             },
//             // order:0
//         }
//     ]
// }

// Options du graphique
const chartOptions: ChartOptions<"bar"> = {

    responsive: true,
    maintainAspectRatio: false,
    bar: {

        datasets: {
            // barPercentage: 0.8,
            // borderColor: "#AB7AE6",
            borderRadius: {
                topLeft: 10,
                topRight: 10,
                // bottomLeft: 10,
                // bottomRight: 10
            }
        }
    },
    scales: {
        x: {
            stacked: true,


            border: {
                display: false
            },
            grid: {
                display: false
            },
            ticks: {
                // fontFamily: 'FontAwesome'
                font: {
                    family: "Work Sans"
                }
            }
        },
        y: {
            grace: '10%',
            beginAtZero: true,

            border: {

                display: false // Optionnel : cache la ligne verticale de l'axe Y
            },
            stacked: true,
            // grid: {
            //     display: false
            // },
            // number side
            ticks: {
                stepSize: 20,
                display: false

            }
        }
    },
    plugins: {
        legend: {
            position: 'top' as const,
            align: 'end' as const,

            labels: {
                usePointStyle: true,
                boxWidth: 5,
                boxHeight: 5,
                padding: 10,
                font: {
                    family: "Work Sans"
                }
            }


        }
    }
}
</script>