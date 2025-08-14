<template>
    <div class="flex items-center gap-3">
        <section
            :class="[transactionType === TransactionTypesEnum.Payout ? 'bg-[#e4f3db] border-[#5fd71d]' : 'bg-[#d1e6f3] border-[#0084CE]']"
            class="rounded-full p-2 opacity-1 border-[1px] ">

            <svg v-if="transactionType === TransactionTypesEnum.Payin" width="20" height="20" viewBox="0 0 20 20"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.89583 16.1033C4.25824 16.4657 4.84582 16.4657 5.20823 16.1033L14.518 6.7935V13.8332C14.518 14.3457 14.9335 14.7612 15.446 14.7612C15.9585 14.7612 16.374 14.3457 16.374 13.8332V4.5531C16.374 4.04057 15.9585 3.62509 15.446 3.62509H6.16595C5.65343 3.62509 5.23795 4.04057 5.23795 4.5531C5.23795 5.06562 5.65343 5.4811 6.16595 5.4811H13.2056L3.89583 14.7909C3.53342 15.1533 3.53342 15.7409 3.89583 16.1033Z"
                    fill="#0084CE" />
            </svg>



            <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M16.1042 3.8967C15.7418 3.5343 15.1542 3.5343 14.7918 3.8967L5.48203 13.2065V6.1668C5.48203 5.6543 5.0665 5.2388 4.55398 5.2388C4.04145 5.2388 3.62598 5.6543 3.62598 6.1668V15.4469C3.62598 15.9594 4.04145 16.3749 4.55398 16.3749H13.834C14.3466 16.3749 14.762 15.9594 14.762 15.4469C14.762 14.9344 14.3466 14.5189 13.834 14.5189H6.7944L16.1042 5.2091C16.4666 4.8467 16.4666 4.2591 16.1042 3.8967Z"
                    fill="#5fd71d" />
            </svg>

        </section>
        <section>
            <p class="text-neutral-10 text-sm font-medium">
                {{ transactionType == TransactionTypesEnum.Payout ? 'Collecte' : 'Transfert' }}
            </p>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { PiggyBankIcon } from 'lucide-vue-next';
import { TransactionTypesEnum } from '@/constants/constant.enum';


const { transactionType } = defineProps({
    transactionType: {
        type: String as PropType<TransactionTypesEnum>,
        required: true
    },

})

</script>

<style scoped></style>