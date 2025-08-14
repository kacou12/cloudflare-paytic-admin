<template>
    <!-- Modifier Mot de passe -->
    <div class="flex items-center justify-center h-screen p-8">
        <div class="bg-white p-8 rounded-xl shadow-lg w-full border max-w-[422px]">
            <!-- Icône ou alerte -->
            <div class="flex justify-center mb-6">
                <div class="w-12 h-12 bg-neutral-80 text-neutral-10 rounded-full flex items-center justify-center">
                    <!-- <span class="text-2xl font-bold">!</span> -->
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M16.8805 1.50521C14.3225 1.50831 11.8702 2.52585 10.0614 4.33464C8.2526 6.14342 7.23506 8.59578 7.23196 11.1538C7.23366 11.9635 7.33593 12.7698 7.53641 13.5542L2.12665 18.964C1.84696 19.2379 1.6404 19.5775 1.52584 19.9519C1.41129 20.3262 1.39241 20.7233 1.47092 21.1068L2.04468 24.0576C2.1353 24.5251 2.36294 24.9551 2.69864 25.2929C3.03435 25.6307 3.46294 25.861 3.9299 25.9545L6.95093 26.5283C7.10655 26.5462 7.2637 26.5462 7.41931 26.5283C7.7331 26.5301 8.04406 26.4689 8.33372 26.3482C8.62337 26.2275 8.88582 26.0498 9.10547 25.8257L14.5035 20.4394C15.2983 20.6495 16.117 20.7558 16.9391 20.7555C19.498 20.7555 21.9522 19.739 23.7617 17.9295C25.5711 16.1201 26.5877 13.6659 26.5877 11.107C26.5877 8.54799 25.5711 6.09384 23.7617 4.28438C21.9522 2.47492 19.498 1.45837 16.9391 1.45837L16.8805 1.50521ZM16.8805 19.0694C16.0566 19.0659 15.2384 18.9315 14.4567 18.6712C14.3035 18.6199 14.1389 18.6124 13.9817 18.6497C13.8244 18.6869 13.6807 18.7674 13.5668 18.882L10.7799 21.6572L8.88299 19.8422C8.70881 19.7291 8.50019 19.6815 8.29419 19.7076C8.08818 19.7338 7.89811 19.8321 7.75773 19.9851C7.61734 20.1382 7.53572 20.336 7.52736 20.5435C7.519 20.751 7.58443 20.9547 7.71205 21.1185L9.57385 22.9101L7.80572 24.6314C7.73153 24.705 7.64051 24.7595 7.54055 24.7901C7.44058 24.8207 7.33467 24.8265 7.23196 24.807L4.26947 24.2215C4.14402 24.1994 4.0284 24.1392 3.93832 24.0492C3.84825 23.9591 3.78807 23.8435 3.76597 23.718L3.19221 20.7789C3.17558 20.6762 3.18277 20.5711 3.21322 20.4716C3.24368 20.3721 3.29658 20.281 3.36785 20.2052L9.1406 14.4324C9.25499 14.3183 9.33614 14.1751 9.37534 14.0183C9.41453 13.8616 9.41029 13.6971 9.36308 13.5425C8.85925 11.956 8.86997 10.2508 9.3937 8.6707C9.91743 7.09063 10.9274 5.71662 12.2791 4.74513C13.6308 3.77363 15.255 3.25441 16.9196 3.2617C18.5842 3.269 20.2039 3.80243 21.547 4.78573C22.8902 5.76903 23.888 7.15184 24.3979 8.73644C24.9078 10.321 24.9035 12.0263 24.3858 13.6083C23.8681 15.1904 22.8634 16.5682 21.5154 17.5449C20.1674 18.5215 18.5451 19.0469 16.8805 19.0459V19.0694ZM16.8805 7.41848C16.1366 7.41616 15.4088 7.63464 14.7891 8.04624C14.1695 8.45784 13.6859 9.04406 13.3996 9.73067C13.1133 10.4173 13.0372 11.1734 13.1809 11.9033C13.3246 12.6332 13.6817 13.304 14.2069 13.8309C14.7321 14.3577 15.4018 14.7169 16.1312 14.8628C16.8607 15.0088 17.617 14.9351 18.3045 14.6509C18.992 14.3668 19.5797 13.885 19.9933 13.2667C20.4068 12.6483 20.6276 11.9211 20.6276 11.1772C20.6306 10.6826 20.5361 10.1923 20.3493 9.73432C20.1625 9.27634 19.8872 8.85974 19.5391 8.50838C19.191 8.15702 18.777 7.87781 18.3208 7.68677C17.8646 7.49572 17.3751 7.39659 16.8805 7.39506V7.41848ZM16.8805 13.1678C16.4835 13.1701 16.0948 13.0544 15.7637 12.8352C15.4327 12.6161 15.1742 12.3035 15.0212 11.9372C14.8682 11.5708 14.8276 11.1673 14.9045 10.7778C14.9813 10.3883 15.1723 10.0304 15.453 9.74968C15.7337 9.46895 16.0916 9.27801 16.4811 9.20113C16.8706 9.12424 17.2742 9.16488 17.6405 9.31788C18.0069 9.47088 18.3195 9.72933 18.5386 10.0604C18.7577 10.3915 18.8735 10.7802 18.8711 11.1772C18.862 11.7001 18.6486 12.1987 18.2766 12.5663C17.9046 12.9339 17.4035 13.1414 16.8805 13.1444V13.1678Z"
                            fill="#1A1A1A" />
                    </svg>

                </div>
            </div>
            <!-- Titre et sous-titre -->
            <h1 class="text-[28px] font-bold text-center mb-2 font-merriweathersans">Définir un nouveau mot de passe
            </h1>
            <p class="text-[#666666] text-center mb-6 text-[16px] font-normal">
                Votre nouveau mot de passe doit être différent des mots de passe utilisés précédemment.
            </p>
            <!-- Formulaire -->
            <form @submit.prevent="handleSubmit">

                <section class="mb-4">
                    <label class="block text-neutral-20 font-medium mb-1 text-sm" for="password">
                        Mot de passe
                    </label>

                    <div class="flex gap-3 w-full relative ">
                        <Input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Mot de passe"
                            class="w-full pr-9" required />
                        <div class=" px-1 absolute right-2 inset-y-0 cursor-pointer flex items-center justify-center"
                            @click="showPassword = !showPassword">
                            <span v-if="showPassword" class="">
                                <EyeClosed :size="18" class="text-neutral-40" />
                            </span>
                            <span v-else class="">
                                <Eye :size="18" class="text-neutral-40" />
                            </span>
                        </div>
                    </div>
                </section>

                <section class="mb-4">
                    <label class="block text-neutral-20 font-medium mb-1  text-sm" for="password">
                        Confirmation de mot de passe
                    </label>

                    <div class="flex gap-3 w-full relative ">
                        <Input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword"
                            placeholder="Confirmation de mot de passe" class="w-full pr-9" required />
                        <div class=" px-1 absolute right-2 inset-y-0 cursor-pointer flex items-center justify-center"
                            @click="showConfirmPassword = !showConfirmPassword">
                            <span v-if="showConfirmPassword" class="">
                                <EyeClosed :size="18" class="text-neutral-40" />
                            </span>
                            <span v-else class="">
                                <Eye :size="18" class="text-neutral-40" />
                            </span>
                        </div>
                    </div>
                </section>



                <CommonButton class="w-full mt-3" :padding-y="5" type="default" title="Réinitialiser le mot de passe">
                </CommonButton>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import CommonButton from "@/components/buttons/commonButton.vue";
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed } from 'lucide-vue-next';
import { ref } from 'vue';


const email = ref("");
const password = ref("");

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const handleSubmit = () => {
    // Ajoutez ici la logique pour envoyer l'email de réinitialisation
    console.log("Demande envoyée pour l'email :", email.value);
};


</script>

<style scoped></style>