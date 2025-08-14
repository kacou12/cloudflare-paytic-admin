<template>
  <Field v-slot="{ componentField, errorMessage }" :name>
    <div class="relative w-full">
      <!-- <Input v-bind="componentField" :type="showPassword ? 'text' : 'password'" id="password" :placeholder
      :class="errorMessage ? ' border-error-light-2 focus:ring-transparent' : 'border'"
        class="rounded-lg shadow appearance-none border   w-full py-2 pl-3 pr-10 text-neutral-20 placeholder:text-neutral-40 leading-tight focus:outline-none focus:ring focus:ring-primary-40  h-[44px] border-neutral-60" /> -->

      <Input v-bind="componentField" :placeholder :type="showPassword ? 'text' : 'password'" id="password"
        :class="errorMessage ? ' border-error-light-2 focus:ring-transparent' : 'border'"
        class="shadow appearance-none   rounded-lg w-full py-2 px-3 text-neutral-20 placeholder:text-neutral-40 leading-tight focus:outline-none focus:ring  h-[44px] " />
      <button type="button" class="absolute inset-y-0 right-4 text-neutral-20" @click="togglePasswordVisibility">

        <FadeInAnimation>
          <Eye :size="20" v-if="showPassword"></Eye>
          <EyeClosed :size="20" v-else></EyeClosed>
        </FadeInAnimation>
      </button>
    </div>

    <div class="h-[20px] mt-2">
      <FadeInAnimation mode="out-in">
        <small v-if="errorMessage" class="app-form-item-error text-error-500 text-sm font-worksans font-normal ">
          {{ errorMessage }}
        </small>
        <div v-else></div>
      </FadeInAnimation>
    </div>
  </Field>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-vue-next';

import { ref } from 'vue';
import FadeSlideAnimation from '../animations/fadeSlideAnimation.vue';
import FadeInAnimation from '../animations/fadeInAnimation.vue';


const showPassword = ref(false)



const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}


type InputProps = {
  name: string;
  type?: string;
  placeholder: string;
  // disabled?: boolean;
  // placeholder?: string;
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
