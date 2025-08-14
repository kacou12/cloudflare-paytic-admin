<template>

    <Field v-slot="{ componentField, errorMessage, }" :name>
        <!-- <FormItem :name :label :required :error-message="errorMessage" :extra> -->
        <!-- <InputText v-bind="componentField" :aria-labelledby="name" :invalid="!!errorMessage" :disabled :placeholder
            :size="size ?? 'small'" /> -->
        <!-- placeholder="Enter votre email" -->
        <!-- <div class="w-full"> -->

        <!-- <Input v-bind="componentField" :placeholder
          :class="errorMessage ? ' border-error-light-2 focus:ring-transparent' : 'border'"
          class="shadow appearance-none   rounded-lg py-2 px-3 text-neutral-20 placeholder:text-neutral-40 leading-tight focus:outline-none focus:ring  h-[44px] " /> -->


        <div class="flex gap-3 w-full  relative">
            <Input v-bind="componentField" :placeholder
                :class="errorMessage ? ' border-error-light-2 focus:ring-transparent' : 'border'"
                class=" shadow appearance-none   rounded-lg py-2  pl-10 text-neutral-20 placeholder:text-neutral-40 leading-tight focus:outline-none focus:ring  h-[44px] " />
                <!-- <span class="absolute bottom-1 left-0 p-2">
                    FCFA
                </span> -->
                <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">%</span>
        </div>

        <div class="min-h-[20px] mt-2">
            <FadeInAnimation mode="out-in">

                <small v-if="errorMessage"
                    class="app-form-item-error text-error-500 text-sm font-worksans font-normal ">
                    {{ errorMessage }}
                </small>
                <div v-else></div>
            </FadeInAnimation>
        </div>
        <!-- </div> -->

        <!-- </FormItem> -->
    </Field>

</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input';
import { Field } from 'vee-validate';
import FadeSlideAnimation from '../animations/fadeSlideAnimation.vue';
import FadeInAnimation from '../animations/fadeInAnimation.vue';



type InputProps = {
    name: string;
    type?: string;
    placeholder?: string;
    // disabled?: boolean;
    // size?: 'large' | 'small';
    // extra?: string;
};

withDefaults(defineProps<InputProps>(), {
    type: 'text',

    // disabled: false,
    // placeholder: '',
    // size: 'small',
    // extra: '',
});


</script>

<style scoped></style>