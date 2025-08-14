<template>
    <div class="px-4 ">
        <header class="flex justify-between items-center mb-14">
            <CommonBreadcrumb
                :links="[{ title: 'Adminstration', route: 'administration' }, { title: 'Détail administrateur', route: 'administration-user', params: { 'id': '1' } }]">
            </CommonBreadcrumb>
        </header>

        <section class="my-7 ">
            <div
                class="flex flex-col md:flex-row md:justify-between md:items-center gap-2 font-publicsans cursor-pointer">

                <section class="space-y-2">


                    <h1 class="text-md xl:text-xl font-bold font-merriweathersans leading-6 text-black">Informations
                        personnelles</h1>
                    <p class="text-neutral-30 text-sm font-normal">Mettez à jour les accès et les données
                        personnelles ici.</p>


                </section>

                <section class="flex gap-2 items-center my-5 md:my-0">
                    <CommonButton type="outline" title="Annuler"></CommonButton>
                    <CommonButton @click="updateUser" type="default" title="Enregistrer"></CommonButton>
                </section>


            </div>
        </section>

        <div class="h-[1px] bg-neutral-70 my-5"></div>


        <main v-if="isSuccess" class="space-y-5 xl:w-[75%] font-medium text-sm my-8 ">

            <section class="flex flex-col md:flex-row">
                <div class="md:w-[30%]">
                    <p class="flex-1 text-neutral-20">Photo de profil</p>
                </div>
                <!-- <p class="flex-1 text-neutral-40">Photo de profil</p> -->

                <div class="w-full max-w-[512px]">

                    <div class="w-[72px] h-[72px] bg-[url('/src/assets/images/avatars/26.png')] rounded-full bg-cover">
                    </div>
                </div>
            </section>
            <section class="flex flex-col md:flex-row">
                <div class="md:w-[30%]">
                    <p class="flex-1 text-neutral-20 ">Nom</p>
                </div>
                <div class="flex gap-3 w-full max-w-[512px]  ">
                    <Input v-model="userState.firstName" type="firstNmae" id="firstName" class="" required />
                    <Input v-model="userState.lastName" type="lastName" id="lastName" placeholder="Last name" class=""
                        required />
                </div>
            </section>

            <section class="flex flex-col md:flex-row">
                <div class="md:w-[30%]">
                    <p class="flex-1 text-neutral-20">Adresse électronique</p>
                </div>
                <div class="flex gap-3 w-full max-w-[512px] relative">
                    <Input v-model="userState.email" type="email" id="email" value="philippe@gmail.com"
                        placeholder="email" class="w-full pl-9" required />
                    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                        <!-- sms icons -->
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.7881 18.131H5.21254C4.10644 18.131 3.04565 17.6916 2.26352 16.9095C1.48139 16.1274 1.04199 15.0666 1.04199 13.9605V6.04554C1.04199 4.93945 1.48139 3.87865 2.26352 3.09652C3.04565 2.3144 4.10644 1.875 5.21254 1.875H14.7881C15.8942 1.875 16.955 2.3144 17.7371 3.09652C18.5193 3.87865 18.9587 4.93945 18.9587 6.04554V13.9521C18.9597 14.5005 18.8527 15.0437 18.6436 15.5507C18.4345 16.0576 18.1275 16.5184 17.7401 16.9065C17.3527 17.2947 16.8926 17.6026 16.386 17.8127C15.8795 18.0229 15.3365 18.131 14.7881 18.131ZM5.21254 3.11782C4.43606 3.11782 3.69138 3.42628 3.14232 3.97533C2.59327 4.52439 2.28481 5.26906 2.28481 6.04554V13.9521C2.28481 14.7286 2.59327 15.4733 3.14232 16.0223C3.69138 16.5714 4.43606 16.8798 5.21254 16.8798H14.7881C15.5646 16.8798 16.3093 16.5714 16.8583 16.0223C17.4074 15.4733 17.7158 14.7286 17.7158 13.9521V6.04554C17.7158 5.26906 17.4074 4.52439 16.8583 3.97533C16.3093 3.42628 15.5646 3.11782 14.7881 3.11782H5.21254ZM11.827 9.74065L14.5712 7.41348C14.6951 7.30407 14.772 7.15113 14.786 6.98645C14.8 6.82178 14.75 6.65805 14.6463 6.52933C14.5369 6.40484 14.3831 6.32814 14.2178 6.31567C14.0526 6.30319 13.889 6.35594 13.7622 6.4626L11.0179 8.78976C10.7307 9.03152 10.3674 9.16408 9.99198 9.16408C9.61658 9.16408 9.25323 9.03152 8.96603 8.78976L6.14674 6.45426C6.01954 6.34365 5.85361 6.2881 5.68545 6.29983C5.51729 6.31156 5.36068 6.38961 5.25007 6.51682C5.13946 6.64402 5.08391 6.80995 5.09564 6.97811C5.10738 7.14626 5.18543 7.30287 5.31263 7.41348L8.16528 9.75733C8.67571 10.1932 9.32492 10.4327 9.99615 10.4327C10.6674 10.4327 11.3166 10.1932 11.827 9.75733V9.74065Z"
                                fill="#999999" />
                        </svg>

                    </span>
                </div>
            </section>


            <section class="flex flex-col md:flex-row">
                <div class="md:w-[30%]">
                    <p class="flex-1 text-neutral-20">Role</p>
                </div>

                <div class=" w-full  max-w-[512px]">

                    <CommonMultiselect v-model="selectedOptions" :options="options" placeholder="Choix des roles"
                        :animation="0.5" :max-count="2" variant="default" class="bg-white">
                    </CommonMultiselect>
                </div>
            </section>

            <section class="flex flex-col md:flex-row">
                <div class="md:w-[30%]">
                    <p class="flex-1 text-neutral-20">Authentification</p>
                </div>
                <div class="flex gap-3 w-full max-w-[512px] relative">
                    <Input v-model="userState.phoneNumber" class="pl-14" id="email" value="0787995058"
                        placeholder="numéro de téléphone" required />
                    <span
                        class="absolute start-0 inset-y-0 flex items-center justify-center px-2 border-r text-neutral-30">
                        +225
                    </span>
                </div>
            </section>
        </main>


        <div class="h-[1px] bg-neutral-70 my-5"></div>
    </div>
</template>

<script setup lang="ts">
import CommonButton from '@/components/buttons/commonButton.vue';
import CommonBreadcrumb from '@/components/common/commonBreadcrumb.vue';
import CommonMultiselect from '@/components/common/commonMultiselect.vue';
import { Input } from '@/components/ui/input';
import { useAdminQuery, useUpdateAdminMutation } from '@/composables/queries/useAdminQueries';
import type { AdminUpdatePayload } from '@/services/admin/admin-type';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const { mutateAsync: updateAdminMutate } = useUpdateAdminMutation(route.params.id as string);

const updateUser = async () => {
    await updateAdminMutate(userState);
}


const userState = reactive<AdminUpdatePayload>({
    firstName: "",  // email de l'utilisateur
    lastName: "",  // mot de passe de l'utilisateur
    email: "",
    phoneNumber: "",

});

const { data: adminUser, isSuccess, isLoading, refetch } = useAdminQuery(route.params.id as string);

onBeforeMount(async () => {
    await refetch()
    userState.email = adminUser.value?.data.email;
    userState.firstName = adminUser.value?.data.firstName;
    userState.lastName = adminUser.value?.data.lastName;
    userState.phoneNumber = adminUser.value?.data.phoneNumber;

});



const selectedOptions = ref<string[]>([]);

const options = [
    { label: 'GitHub', value: 'github' },
    { label: 'Email', value: 'email' },
    { label: 'Phone', value: 'phone' },
];



</script>

<style scoped></style>