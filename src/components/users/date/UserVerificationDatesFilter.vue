<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button variant="outline" :class="cn(
                'w-full xl:w-[240px]  h-full justify-start text-left font-normal ',
                !value && 'text-muted-foreground',
            )
                ">
                <!-- <CalendarIcon class="mr-2 h-4 w-4" /> -->

                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_14895_5830" fill="white">
                        <path
                            d="M6.13875 10.876C5.99203 10.8778 5.84911 10.9227 5.72796 11.0051C5.6068 11.0876 5.51284 11.2039 5.45788 11.3394C5.40293 11.475 5.38945 11.6236 5.41912 11.7668C5.4488 11.9099 5.52032 12.0411 5.62467 12.1439C5.72903 12.2467 5.86156 12.3164 6.00559 12.3442C6.14962 12.3721 6.29871 12.357 6.4341 12.3006C6.5695 12.2443 6.68514 12.1493 6.76649 12.0277C6.84783 11.906 6.89124 11.7631 6.89125 11.617C6.89126 11.5189 6.87173 11.4219 6.83381 11.3314C6.79589 11.2409 6.74032 11.1589 6.67033 11.09C6.60033 11.021 6.51731 10.9666 6.42606 10.9299C6.33481 10.8932 6.23715 10.8749 6.13875 10.876ZM8.9475 10.876C8.80079 10.8778 8.65786 10.9227 8.53671 11.0051C8.41555 11.0876 8.32159 11.2039 8.26663 11.3394C8.21168 11.475 8.1982 11.6236 8.22787 11.7668C8.25755 11.9099 8.32907 12.0411 8.43342 12.1439C8.53778 12.2467 8.67031 12.3164 8.81434 12.3442C8.95837 12.3721 9.10746 12.357 9.24286 12.3006C9.37825 12.2443 9.49389 12.1493 9.57524 12.0277C9.65658 11.906 9.69999 11.7631 9.7 11.617C9.70001 11.5189 9.68048 11.4219 9.64256 11.3314C9.60464 11.2409 9.54907 11.1589 9.47908 11.09C9.40908 11.021 9.32606 10.9666 9.23481 10.9299C9.14356 10.8932 9.0459 10.8749 8.9475 10.876ZM6.13 13.6654C5.98329 13.6672 5.84036 13.7121 5.71921 13.7945C5.59805 13.877 5.50409 13.9933 5.44913 14.1288C5.39418 14.2644 5.3807 14.413 5.41037 14.5562C5.44005 14.6993 5.51157 14.8305 5.61592 14.9333C5.72028 15.036 5.85281 15.1058 5.99684 15.1336C6.14087 15.1615 6.28996 15.1464 6.42535 15.09C6.56075 15.0337 6.67639 14.9387 6.75774 14.8171C6.83908 14.6954 6.88249 14.5525 6.8825 14.4064C6.88728 14.3054 6.87129 14.2046 6.83551 14.1101C6.79972 14.0155 6.74491 13.9292 6.67442 13.8566C6.60394 13.7839 6.51929 13.7264 6.42566 13.6875C6.33204 13.6487 6.23142 13.6293 6.13 13.6306V13.6654ZM13.8475 2.534V1.23518C13.8296 1.08702 13.7579 0.950527 13.6458 0.851504C13.5338 0.752482 13.3892 0.6978 13.2394 0.6978C13.0896 0.6978 12.945 0.752482 12.8329 0.851504C12.7209 0.950527 12.6491 1.08702 12.6312 1.23518V2.34222H12.3512H9.77875V1.23518C9.77875 1.07335 9.71422 0.918149 9.59935 0.803718C9.48449 0.689287 9.32869 0.625 9.16625 0.625C9.0038 0.625 8.84801 0.689287 8.73315 0.803718C8.61828 0.918149 8.55375 1.07335 8.55375 1.23518V2.32479H5.64875H5.36875V1.23518C5.35088 1.08702 5.27913 0.950527 5.16707 0.851504C5.05501 0.752482 4.91042 0.6978 4.76063 0.6978C4.61084 0.6978 4.46624 0.752482 4.35418 0.851504C4.24212 0.950527 4.17037 1.08702 4.1525 1.23518V2.534C3.02869 2.85693 2.04054 3.53471 1.33675 4.46536C0.632952 5.39601 0.251575 6.52918 0.25 7.69438V14.0054C0.254635 15.4326 0.827598 16.7997 1.84309 17.8064C2.85858 18.8132 4.2336 19.3773 5.66625 19.375H12.3688C13.7953 19.3681 15.1614 18.7999 16.1693 17.7941C17.1772 16.7884 17.7454 15.4266 17.75 14.0054V7.69438C17.7484 6.52918 17.367 5.39601 16.6633 4.46536C15.9595 3.53471 14.9713 2.85693 13.8475 2.534ZM4.1525 3.81538V4.52144C4.17037 4.6696 4.24212 4.8061 4.35418 4.90512C4.46624 5.00414 4.61084 5.05882 4.76063 5.05882C4.91042 5.05882 5.05501 5.00414 5.16707 4.90512C5.27913 4.8061 5.35088 4.6696 5.36875 4.52144V3.56259C5.465 3.56259 5.5525 3.56259 5.64875 3.56259H8.55375V4.52144C8.55375 4.68327 8.61828 4.83847 8.73315 4.95291C8.84801 5.06734 9.0038 5.13162 9.16625 5.13162C9.32869 5.13162 9.48449 5.06734 9.59935 4.95291C9.71422 4.83847 9.77875 4.68327 9.77875 4.52144V3.53644H12.3512C12.4475 3.53644 12.535 3.53644 12.6312 3.53644V4.49529C12.6491 4.64345 12.7209 4.77995 12.8329 4.87897C12.945 4.97799 13.0896 5.03267 13.2394 5.03267C13.3892 5.03267 13.5338 4.97799 13.6458 4.87897C13.7579 4.77995 13.8296 4.64345 13.8475 4.49529V3.81538C14.5351 4.08184 15.14 4.52442 15.6009 5.09839C16.0618 5.67236 16.3625 6.35738 16.4725 7.0842H1.51C1.6216 6.35545 1.92487 5.66913 2.38901 5.09499C2.85314 4.52084 3.46159 4.07935 4.1525 3.81538ZM16.5512 14.0054C16.5466 15.1113 16.1018 16.1701 15.3144 16.9497C14.527 17.7292 13.4613 18.1657 12.3512 18.1633H5.64875C4.53867 18.1657 3.47301 17.7292 2.68561 16.9497C1.89821 16.1701 1.45338 15.1113 1.44875 14.0054V8.26098H16.5512V14.0054Z" />
                    </mask>
                    <path
                        d="M6.13875 10.876C5.99203 10.8778 5.84911 10.9227 5.72796 11.0051C5.6068 11.0876 5.51284 11.2039 5.45788 11.3394C5.40293 11.475 5.38945 11.6236 5.41912 11.7668C5.4488 11.9099 5.52032 12.0411 5.62467 12.1439C5.72903 12.2467 5.86156 12.3164 6.00559 12.3442C6.14962 12.3721 6.29871 12.357 6.4341 12.3006C6.5695 12.2443 6.68514 12.1493 6.76649 12.0277C6.84783 11.906 6.89124 11.7631 6.89125 11.617C6.89126 11.5189 6.87173 11.4219 6.83381 11.3314C6.79589 11.2409 6.74032 11.1589 6.67033 11.09C6.60033 11.021 6.51731 10.9666 6.42606 10.9299C6.33481 10.8932 6.23715 10.8749 6.13875 10.876ZM8.9475 10.876C8.80079 10.8778 8.65786 10.9227 8.53671 11.0051C8.41555 11.0876 8.32159 11.2039 8.26663 11.3394C8.21168 11.475 8.1982 11.6236 8.22787 11.7668C8.25755 11.9099 8.32907 12.0411 8.43342 12.1439C8.53778 12.2467 8.67031 12.3164 8.81434 12.3442C8.95837 12.3721 9.10746 12.357 9.24286 12.3006C9.37825 12.2443 9.49389 12.1493 9.57524 12.0277C9.65658 11.906 9.69999 11.7631 9.7 11.617C9.70001 11.5189 9.68048 11.4219 9.64256 11.3314C9.60464 11.2409 9.54907 11.1589 9.47908 11.09C9.40908 11.021 9.32606 10.9666 9.23481 10.9299C9.14356 10.8932 9.0459 10.8749 8.9475 10.876ZM6.13 13.6654C5.98329 13.6672 5.84036 13.7121 5.71921 13.7945C5.59805 13.877 5.50409 13.9933 5.44913 14.1288C5.39418 14.2644 5.3807 14.413 5.41037 14.5562C5.44005 14.6993 5.51157 14.8305 5.61592 14.9333C5.72028 15.036 5.85281 15.1058 5.99684 15.1336C6.14087 15.1615 6.28996 15.1464 6.42535 15.09C6.56075 15.0337 6.67639 14.9387 6.75774 14.8171C6.83908 14.6954 6.88249 14.5525 6.8825 14.4064C6.88728 14.3054 6.87129 14.2046 6.83551 14.1101C6.79972 14.0155 6.74491 13.9292 6.67442 13.8566C6.60394 13.7839 6.51929 13.7264 6.42566 13.6875C6.33204 13.6487 6.23142 13.6293 6.13 13.6306V13.6654ZM13.8475 2.534V1.23518C13.8296 1.08702 13.7579 0.950527 13.6458 0.851504C13.5338 0.752482 13.3892 0.6978 13.2394 0.6978C13.0896 0.6978 12.945 0.752482 12.8329 0.851504C12.7209 0.950527 12.6491 1.08702 12.6312 1.23518V2.34222H12.3512H9.77875V1.23518C9.77875 1.07335 9.71422 0.918149 9.59935 0.803718C9.48449 0.689287 9.32869 0.625 9.16625 0.625C9.0038 0.625 8.84801 0.689287 8.73315 0.803718C8.61828 0.918149 8.55375 1.07335 8.55375 1.23518V2.32479H5.64875H5.36875V1.23518C5.35088 1.08702 5.27913 0.950527 5.16707 0.851504C5.05501 0.752482 4.91042 0.6978 4.76063 0.6978C4.61084 0.6978 4.46624 0.752482 4.35418 0.851504C4.24212 0.950527 4.17037 1.08702 4.1525 1.23518V2.534C3.02869 2.85693 2.04054 3.53471 1.33675 4.46536C0.632952 5.39601 0.251575 6.52918 0.25 7.69438V14.0054C0.254635 15.4326 0.827598 16.7997 1.84309 17.8064C2.85858 18.8132 4.2336 19.3773 5.66625 19.375H12.3688C13.7953 19.3681 15.1614 18.7999 16.1693 17.7941C17.1772 16.7884 17.7454 15.4266 17.75 14.0054V7.69438C17.7484 6.52918 17.367 5.39601 16.6633 4.46536C15.9595 3.53471 14.9713 2.85693 13.8475 2.534ZM4.1525 3.81538V4.52144C4.17037 4.6696 4.24212 4.8061 4.35418 4.90512C4.46624 5.00414 4.61084 5.05882 4.76063 5.05882C4.91042 5.05882 5.05501 5.00414 5.16707 4.90512C5.27913 4.8061 5.35088 4.6696 5.36875 4.52144V3.56259C5.465 3.56259 5.5525 3.56259 5.64875 3.56259H8.55375V4.52144C8.55375 4.68327 8.61828 4.83847 8.73315 4.95291C8.84801 5.06734 9.0038 5.13162 9.16625 5.13162C9.32869 5.13162 9.48449 5.06734 9.59935 4.95291C9.71422 4.83847 9.77875 4.68327 9.77875 4.52144V3.53644H12.3512C12.4475 3.53644 12.535 3.53644 12.6312 3.53644V4.49529C12.6491 4.64345 12.7209 4.77995 12.8329 4.87897C12.945 4.97799 13.0896 5.03267 13.2394 5.03267C13.3892 5.03267 13.5338 4.97799 13.6458 4.87897C13.7579 4.77995 13.8296 4.64345 13.8475 4.49529V3.81538C14.5351 4.08184 15.14 4.52442 15.6009 5.09839C16.0618 5.67236 16.3625 6.35738 16.4725 7.0842H1.51C1.6216 6.35545 1.92487 5.66913 2.38901 5.09499C2.85314 4.52084 3.46159 4.07935 4.1525 3.81538ZM16.5512 14.0054C16.5466 15.1113 16.1018 16.1701 15.3144 16.9497C14.527 17.7292 13.4613 18.1657 12.3512 18.1633H5.64875C4.53867 18.1657 3.47301 17.7292 2.68561 16.9497C1.89821 16.1701 1.45338 15.1113 1.44875 14.0054V8.26098H16.5512V14.0054Z"
                        fill="#808080" stroke="#808080" stroke-width="3" mask="url(#path-1-inside-1_14895_5830)" />
                </svg>


                <template v-if="value.start">
                    <template v-if="value.end">
                        <div class="font-medium">

                            {{
                                formatter.custom(toDate(value.start), {
                                    dateStyle: "medium",
                                })
                            }}
                            -
                            {{
                                formatter.custom(toDate(value.end), {
                                    dateStyle: "medium",
                                })
                            }}
                        </div>
                    </template>

                    <template v-else>
                        {{
                            formatter.custom(toDate(value.start), {
                                dateStyle: "medium",
                            })
                        }}
                    </template>
                </template>
                <template v-else>
                    Filtrez par date
                </template>
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <RangeCalendarRoot v-slot="{ weekDays }" v-model="value" v-model:placeholder="placeholder" class="p-3">
                <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center justify-between">
                            <button :class="cn(
                                buttonVariants({ variant: 'outline' }),
                                'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                            )
                                " @click="updateMonth('first', -1)">
                                <ChevronLeft class="h-4 w-4" />
                            </button>
                            <div :class="cn('text-sm font-medium')">
                                {{
                                    formatter.fullMonthAndYear(
                                        toDate(firstMonth.value),
                                    )
                                }}
                            </div>
                            <button :class="cn(
                                buttonVariants({ variant: 'outline' }),
                                'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                            )
                                " @click="updateMonth('first', 1)">
                                <ChevronRight class="h-4 w-4" />
                            </button>
                        </div>
                        <RangeCalendarGrid>
                            <RangeCalendarGridHead>
                                <RangeCalendarGridRow>
                                    <RangeCalendarHeadCell v-for="day in weekDays" :key="day" class="w-full">
                                        {{ day }}
                                    </RangeCalendarHeadCell>
                                </RangeCalendarGridRow>
                            </RangeCalendarGridHead>
                            <RangeCalendarGridBody>
                                <RangeCalendarGridRow v-for="(
weekDates, index
                  ) in firstMonth.rows" :key="`weekDate-${index}`" class="mt-2 w-full">
                                    <RangeCalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()"
                                        :date="weekDate">
                                        <RangeCalendarCellTrigger :day="weekDate" :month="firstMonth.value" />
                                    </RangeCalendarCell>
                                </RangeCalendarGridRow>
                            </RangeCalendarGridBody>
                        </RangeCalendarGrid>
                    </div>
                    <div class="flex flex-col gap-4">
                        <div class="flex items-center justify-between">
                            <button :class="cn(
                                buttonVariants({ variant: 'outline' }),
                                'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                            )
                                " @click="updateMonth('second', -1)">
                                <ChevronLeft class="h-4 w-4" />
                            </button>
                            <div :class="cn('text-sm font-medium')">
                                {{
                                    formatter.fullMonthAndYear(
                                        toDate(secondMonth.value),
                                    )
                                }}
                            </div>

                            <button :class="cn(
                                buttonVariants({ variant: 'outline' }),
                                'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                            )
                                " @click="updateMonth('second', 1)">
                                <ChevronRight class="h-4 w-4" />
                            </button>
                        </div>
                        <RangeCalendarGrid>
                            <RangeCalendarGridHead>
                                <RangeCalendarGridRow>
                                    <RangeCalendarHeadCell v-for="day in weekDays" :key="day" class="w-full">
                                        {{ day }}
                                    </RangeCalendarHeadCell>
                                </RangeCalendarGridRow>
                            </RangeCalendarGridHead>
                            <RangeCalendarGridBody>
                                <RangeCalendarGridRow v-for="(
weekDates, index
                  ) in secondMonth.rows" :key="`weekDate-${index}`" class="mt-2 w-full">
                                    <RangeCalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()"
                                        :date="weekDate">
                                        <RangeCalendarCellTrigger :day="weekDate" :month="secondMonth.value" />
                                    </RangeCalendarCell>
                                </RangeCalendarGridRow>
                            </RangeCalendarGridBody>
                        </RangeCalendarGrid>
                    </div>
                </div>
            </RangeCalendarRoot>
        </PopoverContent>
    </Popover>
</template>
<script setup lang="ts">
import { Button, buttonVariants } from '@/components/ui/button'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import {
    RangeCalendarCell,
    RangeCalendarCellTrigger,
    RangeCalendarGrid,
    RangeCalendarGridBody,
    RangeCalendarGridHead,
    RangeCalendarGridRow,
    RangeCalendarHeadCell,
} from '@/components/ui/range-calendar'

import { cn } from '@/lib/utils'
import {
    CalendarDate,
    type DateValue,
    isEqualMonth,
} from '@internationalized/date'
import {
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
} from 'lucide-vue-next'
import { type DateRange, RangeCalendarRoot, useDateFormatter } from 'radix-vue'
import { createMonth, type Grid, toDate } from 'radix-vue/date'
import { type Ref, ref, watch } from 'vue'

const value = ref({
    start: new CalendarDate(2022, 1, 20),
    end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
}) as Ref<DateRange>

const locale = ref('en-US')
const formatter = useDateFormatter(locale.value)

const placeholder = ref(value.value.start) as Ref<DateValue>
const secondMonthPlaceholder = ref(value.value.end) as Ref<DateValue>

const firstMonth = ref(
    createMonth({
        dateObj: placeholder.value,
        locale: locale.value,
        fixedWeeks: true,
        weekStartsOn: 0,
    }),
) as Ref<Grid<DateValue>>
const secondMonth = ref(
    createMonth({
        dateObj: secondMonthPlaceholder.value,
        locale: locale.value,
        fixedWeeks: true,
        weekStartsOn: 0,
    }),
) as Ref<Grid<DateValue>>

function updateMonth(reference: 'first' | 'second', months: number) {
    if (reference === 'first') {
        placeholder.value = placeholder.value.add({ months })
    }
    else {
        secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
            months,
        })
    }
}

watch(placeholder, (_placeholder) => {
    firstMonth.value = createMonth({
        dateObj: _placeholder,
        weekStartsOn: 0,
        fixedWeeks: false,
        locale: locale.value,
    })
    if (isEqualMonth(secondMonthPlaceholder.value, _placeholder)) {
        secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
            months: 1,
        })
    }
})

watch(secondMonthPlaceholder, (_secondMonthPlaceholder) => {
    secondMonth.value = createMonth({
        dateObj: _secondMonthPlaceholder,
        weekStartsOn: 0,
        fixedWeeks: false,
        locale: locale.value,
    })
    if (isEqualMonth(_secondMonthPlaceholder, placeholder.value))
        placeholder.value = placeholder.value.subtract({ months: 1 })
})
</script>