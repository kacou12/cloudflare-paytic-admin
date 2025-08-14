<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart, ArcElement, Tooltip } from 'chart.js'
import type { ChartData, ChartOptions } from 'chart.js'

// Register required Chart.js components
Chart.register(ArcElement, Tooltip)
// Chart.overrides.doughnut.cutout = '70%'

interface Props {
    amount: number
}

const props = defineProps<Props>()
const chartCanvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
    if (!chartCanvas.value) return

    const data: ChartData = {
        datasets: [{
            data: [35, 25, 20, 20], // Différentes tailles des segments
            backgroundColor: [
                '#36A2EB', // bleu
                '#FF6384', // orange
                '#FFCE56', // jaune
                '#4BC0C0'  // bleu foncé
            ],
            borderWidth: 0,

        }]
    }

    const options: ChartOptions = {
        responsive: true,
        // cutout: '70%',

        plugins: {
            tooltip: {
                enabled: false
            },
            legend: {
                display: false
            }
        },
        // animation: {
        //     animateRotate: true,
        //     animateScale: true
        // }
    }

    new Chart(chartCanvas.value, {
        type: 'doughnut',
        data: data,
        options: options
    })
})
</script>

<template>
    <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
        <div class="amount-overlay">
            <div class="transaction-label">Transaction de la journée</div>
            <div class="amount">{{ amount.toLocaleString() }} F CFA</div>
        </div>
    </div>
</template>

<style scoped>
.chart-container {
    position: relative;
    width: 300px;
    height: 300px;
    margin: auto;
}

.amount-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.transaction-label {
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
}

.amount {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}
</style>