<template>

    <!-- <form @submit.prevent="$router.push({ name: 'dashboard' })"> -->
    <form @submit.prevent="onSubmit">
        <div class="mb-4">
            <label class="block text-neutral-20 text-sm font-medium mb-2" for="email">
                Email
            </label>
            <!-- <Input type="email" id="email" v-model="email" placeholder="Enter votre email"
                class="shadow appearance-none border  rounded-lg w-full py-2 px-3 text-neutral-20 placeholder:text-neutral-40 leading-tight focus:outline-none focus:ring focus:ring-primary-40 h-[44px] border-neutral-60"
                required /> -->
            <InputField v-model="email" placeholder="Entrer votre email" name="email" />
        </div>
        <div class="mb-4">
            <label class="block text-neutral-20 text-sm font-medium mb-2" for="password">
                Mot de passe
            </label>
            <!-- <div class="relative">
                <Input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
                    placeholder="Mot de passe"
                    class="rounded-lg shadow appearance-none border   w-full py-2 px-3 text-neutral-20 placeholder:text-neutral-40 leading-tight focus:outline-none focus:ring focus:ring-primary-40  h-[44px] border-neutral-60"
                    required />
                <button type="button" class="absolute inset-y-0 right-2 text-neutral-20"
                    @click="togglePasswordVisibility">
                    <span v-if="showPassword">👁️</span>
                    <span v-else>👁️‍🗨️</span>
                </button>
            </div> -->
            <PasswordField v-model="password" placeholder="Mot de passe" name="password" />
        </div>
        <div class="mb-6 mt-6 flex items-center">
            <input type="checkbox" id="rememberMe" v-model="rememberMe"
                class="mr-2 rounded text-primary-40 focus:ring-primary-40" />
            <label for="rememberMe" class="text-[#1A1A1A] text-sm">
                Se souvenir pendant 30 jours
            </label>
        </div>
        <CustomButton :is-loading="loading"
            class=" font-worksans rounded-lg text-white font-normal   text-[15px] py-[22px] px-4  w-full  hover:bg-primary-50 focus:outline-none focus:ring focus:ring-primary-60">
            Se connecter
        </CustomButton>
    </form>
</template>

<script setup lang="ts">

import { AppRoute } from '@/constants/app-route';
import { loginSchema } from '@/services/auth/auth-schema';
import { loginWithCredential } from '@/services/auth/auth-service';
import type { LoginForm } from '@/services/auth/auth-type';
import { useAuthStore } from '@/stores/useAuthStore';
import { useMutation } from '@tanstack/vue-query';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CustomButton from '../buttons/customButton.vue';
import InputField from '../vee-validate/InputField.vue';
import PasswordField from '../vee-validate/PasswordField.vue';

import { useToast } from 'vue-toastification';

const rememberMe = ref(false)

const password = ref(import.meta.env.PROD ? '' : 'Qwertyuiop0');
const email = ref(import.meta.env.PROD ? '' : 'kacou10@gmail.com');

const route = useRoute();
const router = useRouter();
const { setUser } = useAuthStore();
const toast = useToast();

const { handleSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(loginSchema)
});

const {
    isPending: loading,
    isError,
    error,
    mutate,
    mutateAsync
} = useMutation({
    mutationFn: (credential: LoginForm) => loginWithCredential(credential),
    onSuccess: (response) => {
        if (response) {
            console.log("sucess login", response);
            setUser(response.data!.user);
            router.push({ name: AppRoute.DASHBOARD.name, replace: true });
            toast.success(`Welcome ${response.data!.user.first_name}!`);
            //   resetForm();
            //   if (route.query?.redirect) {
            //     router.push({ path: route.query.redirect as string, replace: true });
            //   } else {
            //     router.push({ name: AppRoute.DASHBOARD, replace: true });
            //   }
        }
    },

});

const onSubmit = handleSubmit(({ email, password }) => {
    // alert("submit")
    console.log("submit", email, password);
    mutate({ email, password });
});



</script>

<style scoped></style>