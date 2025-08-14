<template>

  <Field v-slot="{ componentField, errorMessage, }" :name="name">

    <div class="flex flex-col w-full">

      <Select v-model="Modelvalue" v-bind="componentField">
        <!-- <SelectTrigger class="min-w-[120px] max-w-[350px]  "> -->
        <SelectTrigger class="space-x-1"
          :class="[`${borderColor}`, open ? 'ring-4 ring-primary-70 transition-all duration-300' : '', `${defaultWidth}`]">
          <slot name="icon"></slot>
          <SelectValue :placeholder="title" class="text-[#525866]">
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem v-for="element in elements" :key="element.name" :value="element.value.toString()">
              <div class='py-1'> <span class="text-sm font-medium"> {{ element.name }} </span>
              </div>
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div class="min-h-[20px] mt-2">
        <FadeInAnimation mode="out-in">

          <small v-if="errorMessage" class="app-form-item-error text-error-500 text-sm font-worksans font-normal ">
            {{ errorMessage }}
          </small>
          <div v-else></div>
        </FadeInAnimation>
      </div>
    </div>

  </Field>
  <!-- </div> -->
</template>

<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Field } from 'vee-validate';
import { ref, type PropType } from 'vue';
import FadeInAnimation from '@/components/animations/fadeInAnimation.vue';
const Modelvalue = defineModel({ type: String, required: true });


defineProps({

  elements: {
    type: Array as PropType<{ name: string, value: string }[]>,
    required: true
  },
  defaultWidth: {
    type: String as PropType<"w-fit" | "w-full">,
    required: false,
    default: "w-fit"
  },
  borderColor: {
    type: String as PropType<"border-neutral-60" | "border-input">,
    required: false,
    default: "border-input"
  },
  type: {
    type: String,
    required: false,
    default: "text"
  },
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }

})


const open = ref(false);

</script>

<style scoped></style>
