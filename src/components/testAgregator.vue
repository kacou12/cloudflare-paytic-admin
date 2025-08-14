<template>
    <div class="h-96 w-full">
        <Bar :data="chartData" :options="chartOptions" />
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
    LinearScale
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

// Données du graphique
const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
    datasets: [
        {
            label: 'Envoi d\'argent',
            data: [30, 40, 25, 35, 30, 35, 35, 35, 35, 35, 35, 30],
            backgroundColor: '#4ade80', // vert foncé
        },
        {
            label: 'Achat de carte cadeau',
            data: [20, 35, 20, 25, 15, 30, 25, 25, 20, 30, 25, 20],
            backgroundColor: '#bbf7d0', // vert clair
        }
    ]
}

// Options du graphique
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            stacked: true,
            grid: {
                display: false
            }
        },
        y: {
            stacked: true,
            grid: {
                display: false
            },
            ticks: {
                stepSize: 20
            }
        }
    },
    plugins: {
        legend: {
            position: 'top' as const,
            align: 'end' as const,
        }
    }
}
</script>