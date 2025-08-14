<template>
    <aside id="logo-sidebar" :class="`fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full 
      bg-white shadow-md border-r border-gray-200 xl:translate-x-0 flex flex-col`" aria-label="Sidebar">
        <!-- Logo et sélection du pays -->
        <div class="p-5">
            <div class="flex items-center mb-4">
                <!-- <img src="" alt="Logo" class="w-10 h-10 mr-2" /> -->
                <img :src="mini_app_icons" alt="Logo" class="w-10 h-10 mr-2" />
                <div>
                    <h2 class=" text-xl font-bold text-[#566a7f]">Paytic</h2>
                    <p class="text-xs text-neutral-30">Espace administration</p>

                </div>
            </div>


            <hr class="mt-3">
        </div>

        <AsideNavigation></AsideNavigation>

        <!-- Footer utilisateur -->
        <div @click.prevent="handleLogout"
            class="p-4 border-t hover:text-red-500 hover:bg-red-100 group transition duration-300 hover:rounded-lg cursor-pointer">
            <div class="flex items-center justify-between">
                <section class="flex gap-1">
                    <img src="@/assets/images/avatars/26.png" alt="User" class="w-10 h-10 rounded-full mr-2" />
                    <div>
                        <p class="text-sm text-black font-medium">{{ fullName() }}</p>
                        <p class="text-xs text-neutral-30  group-hover:text-red-500">{{ user?.email }}</p>
                    </div>
                </section>
                <svg class="flex-shrink-0 w-[17px] h-[17px] text-neutral-20 transition duration-300 group-hover:text-red-500"
                    viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.3416 17.9582H4.6416C3.5826 17.9897 2.5542 17.6006 1.78123 16.8761C1.00825 16.1515 0.553579 15.1504 0.516602 14.0916V3.90823C0.553579 2.84941 1.00825 1.84828 1.78123 1.12372C2.5542 0.399152 3.5826 0.0100845 4.6416 0.041567H8.3416C9.39979 0.0101166 10.4273 0.399444 11.1989 1.12423C11.9706 1.84902 12.4234 2.85015 12.4583 3.90823C12.4583 4.0762 12.3915 4.23729 12.2728 4.35607C12.154 4.47484 11.9929 4.54157 11.8249 4.54157C11.657 4.54157 11.4959 4.47484 11.3771 4.35607C11.2583 4.23729 11.1916 4.0762 11.1916 3.90823C11.1549 3.1868 10.8349 2.50901 10.3013 2.02217C9.7676 1.53532 9.06336 1.27876 8.3416 1.30823H4.6416C3.91926 1.27655 3.2138 1.53235 2.67964 2.01965C2.14549 2.50694 1.82618 3.18603 1.7916 3.90823V14.0916C1.82618 14.8138 2.14549 15.4929 2.67964 15.9802C3.2138 16.4674 3.91926 16.7233 4.6416 16.6916H8.3416C9.06336 16.721 9.7676 16.4645 10.3013 15.9776C10.8349 15.4908 11.1549 14.813 11.1916 14.0916C11.1916 13.9236 11.2583 13.7625 11.3771 13.6437C11.4959 13.525 11.657 13.4582 11.8249 13.4582C11.9929 13.4582 12.154 13.525 12.2728 13.6437C12.3915 13.7625 12.4583 13.9236 12.4583 14.0916C12.4234 15.1497 11.9706 16.1508 11.1989 16.8756C10.4273 17.6004 9.39979 17.9897 8.3416 17.9582ZM6.29993 8.9999C6.29993 9.08307 6.31632 9.16543 6.34814 9.24227C6.37997 9.31911 6.42662 9.38892 6.48543 9.44773C6.54424 9.50654 6.61406 9.5532 6.6909 9.58502C6.76774 9.61685 6.8501 9.63323 6.93327 9.63323H15.3249L13.8999 11.0249C13.8405 11.0838 13.7933 11.1539 13.7611 11.2311C13.7288 11.3084 13.7123 11.3912 13.7123 11.4749C13.7123 11.5586 13.7288 11.6414 13.7611 11.7187C13.7933 11.7959 13.8405 11.866 13.8999 11.9249C13.9589 11.984 14.0291 12.0306 14.1064 12.0621C14.1837 12.0936 14.2665 12.1093 14.3499 12.1082C14.4321 12.1091 14.5136 12.0933 14.5895 12.0618C14.6654 12.0303 14.7342 11.9837 14.7916 11.9249L17.2916 9.4249C17.3511 9.36601 17.3983 9.29592 17.4305 9.21868C17.4627 9.14144 17.4793 9.05859 17.4793 8.9749C17.4793 8.89121 17.4627 8.80836 17.4305 8.73112C17.3983 8.65388 17.3511 8.58379 17.2916 8.5249L14.7916 6.0249C14.7334 5.96569 14.664 5.91866 14.5875 5.88655C14.5109 5.85445 14.4288 5.83792 14.3458 5.83792C14.2628 5.83792 14.1806 5.85445 14.104 5.88655C14.0275 5.91866 13.9581 5.96569 13.8999 6.0249C13.8405 6.08379 13.7933 6.15388 13.7611 6.23112C13.7288 6.30836 13.7123 6.39121 13.7123 6.4749C13.7123 6.55859 13.7288 6.64144 13.7611 6.71868C13.7933 6.79592 13.8405 6.86601 13.8999 6.9249L15.2916 8.31657H6.93327C6.84572 8.31629 6.75906 8.33418 6.67877 8.36908C6.59848 8.40399 6.5263 8.45517 6.46678 8.51938C6.40727 8.58359 6.36172 8.65945 6.333 8.74215C6.30428 8.82486 6.29302 8.91262 6.29993 8.9999Z" />
                </svg>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { AppRoute } from '@/constants/app-route';
import { logout } from '@/services/auth/auth-service';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AsideNavigation from '../asideNavigation.vue';
import { useAuthStore } from '@/stores/useAuthStore';
import { storeToRefs } from 'pinia';
import { useLoaderStore } from '@/stores/useLoaderStore';
const mini_app_icons = new URL("/src/assets/images/logos-paytic/paytic.png", import.meta.url).href;

const { fullName, logout: storeLogout } = useAuthStore();
const { startLoading, stopLoading } = useLoaderStore();


const { user } = storeToRefs(useAuthStore());
defineProps({
    widthAsideBar: {
        type: Number,
        required: true,
    },
});

const router = useRouter();




async function handleLogout() {
    try {

        // startLoading()
        storeLogout();
        await logout();
        router.push({ name: AppRoute.LOGIN.name });
    } catch (err) {

    } finally {
        // stopLoading()
    }

}



const selectedCountry = ref({
    name: "Côte d`Ivoire",
    flag: "https://flagcdn.com/w320/ci.png", // Drapeau par défaut
});

const isOpen = ref(false);

</script>

<style scoped></style>