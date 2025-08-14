<template>
    <div class="w-full h-full relative p-7 backdrop-blur-lg rounded-2xl ">

        <Carousel :plugins="[Autoplay({
            delay: 5000,
        })]" :opts="{
            loop: true,
        }" class="z-10 w-full h-full relative rounded-b-2xl"
            v-slot="{ canScrollNext, canScrollPrev, scrollNext, scrollPrev }">
            <CarouselContent>
                <CarouselItem v-for="(text, index) in carousselItems" :key="index">
                    <p class="text-[28px] text-white font-semibold">{{ text }}</p>
                </CarouselItem>
            </CarouselContent>


            <section class="flex gap-x-5 absolute bottom-0 right-0">

                <button :disabled="!canScrollPrev" @click="scrollPrev" size="lg"
                    :class="{ 'opacity-50 cursor-not-allowed': !canScrollPrev }"
                    class="rounded-full  border border-white flex items-center p-3 cursor-pointer hover:bg-gray-400 transition-all duration-300">
                    <ArrowLeft :size="24" class=" text-current text-white" />

                </button>

                <button :disabled="!canScrollNext" @click="scrollNext"
                    :class="{ 'opacity-50 cursor-not-allowed': !canScrollNext }"
                    class="rounded-full  border border-white flex items-center p-3 cursor-pointer hover:bg-gray-400 transition-all duration-300">
                    <ArrowRight :size="24" class=" text-current text-white" />

                </button>
            </section>

        </Carousel>
        <div
            class="z-0 absolute left-0 right-0 bottom-0 top-0  bg-[#FFFFFF4D] border-t-2 border-t-[#FFFFFF4D] rounded-b-2xl">
        </div>


    </div>
</template>

<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { ArrowLeft, ArrowRight } from 'lucide-vue-next';
import { Button } from '../ui/button';
import Autoplay from 'embla-carousel-autoplay'


// const { orientation, canScrollPrev, scrollPrev } = useCarousel()

// const { orientation, canScrollNext, scrollNext, canScrollPrev, scrollPrev } = useCarousel()

const carousselItems = [
    "“Simplifiez vos paiements de masse avec Sendchap Business, la solution efficace pour vos transactions d’entreprise.”",
    "“Automatisez et centralisez vos paiements de masse en quelques clics, sans les tracas des virements multiples”",
    "“Envoyez des paiements à travers plusieurs réseaux de mobile money (Moov, Orange, MTN, Wave), garantissant une couverture maximale et une flexibilité accrue”",
    "“Accédez à des Analyse de donnéess détaillés et en temps réel pour suivre vos transactions et optimiser la gestion financière de votre entreprise.”"

]

</script>

<style scoped></style>