<template>
    <Dialog v-model:open="open">
        <DialogTrigger as-child>
            <div class="flex justify-between p-2 border font-worksans rounded-xl cursor-pointer gap-3 items-center"
                @click="openFile">
                <section class="flex items-center gap-3">

                    <div class="h-full w-[32px]">
                        <img src="@/assets/images/jpgIcon.png" alt="Likambo Logo" />
                    </div>
                    <div class="flex flex-col max-w-[200px]">
                        <!-- <p class="text-xs font-medium truncate">{{ document.public_id }}</p> -->
                        <p class="text-xs font-medium overflow-hidden truncate">
                            {{ documentUrl.split('/').pop()?.split('.')[0] }}</p>
                        <!-- <p class="text-[10px] text-neutral-40">{{  }}</p> -->
                    </div>
                </section>




                <section class="w-[20px]">
                    <img src="@/assets/images/file-down.png" alt="Likambo Logo" />
                </section>
            </div>
        </DialogTrigger>
        <DialogContent class=" font-worksans h-fit w-fit rounded-xl bg-purple-200 flex">
            <!-- 2xl:w-[500px] 2xl:h-[800px] -->

            <img v-if="isImageUrl(documentUrl)" v-show="isLoaded" :src="documentUrl" alt="" class="bg-cover"
                @load="loaded">


            <iframe v-else class="w-[100vw] h-[calc(100vh-100px)]  " loading="eager" :src="documentUrl"
                onload="this.removeAttribute('srcdoc')" srcdoc="
                <!DOCTYPE html>
                      <html>
                      <head>
                          <style>
                              /* Style pour centrer le loader */
                              body {
                                  display: flex;
                                  justify-content: center;
                                  align-items: center;
                                  height: 100vh;
                                  margin: 0;
                                  background-color: #f3f4f6; /* Couleur de fond optionnelle */
                              }
                              /* Le loader CSS (spinner) */
                              .loader {
                                  border: 8px solid #e5e7eb; /* Gris clair */
                                  border-top: 8px solid #3b82f6; /* Bleu */
                                  border-radius: 50%;
                                  width: 60px;
                                  height: 60px;
                                  animation: spin 1s linear infinite;
                              }
                              /* L'animation de rotation */
                              @keyframes spin {
                                  0% { transform: rotate(0deg); }
                                  100% { transform: rotate(360deg); }
                              }
                          </style>
                      </head>
                      <body>
                          <div class='loader'></div>
                      </body>
                      </html>
            ">
            </iframe>
            <!-- <VuePdfEmbed v-if="documentUrl.includes('.pdf')" annotation-layer text-layer source="https://paytic-preprod.s3.amazonaws.com/trans_1749741798.pdf" /> -->




        </DialogContent>

    </Dialog>










    <!-- <div>
        <img :src="document.filepath" class="w-full h-full" alt="">
    </div> -->
</template>

<script setup lang="ts">
import type { DocumentFile } from '@/services/global.type';
import { ref, type PropType } from 'vue';
import VuePdfEmbed from 'vue-pdf-embed'
import { Dialog } from '@/components/ui/dialog';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';
import DialogContent from '@/components/ui/dialog/DialogContent.vue';

const open = ref(false);

const isLoaded = ref(false);
const isLoading = ref(false);

const loaded = () => {
    isLoaded.value = true;
    isLoading.value = false;
};

const { documentUrl } = defineProps({
    documentUrl: {
        type: String,
        required: true
    }
})
const visibleRef = ref(false)
const indexRef = ref(0) // default 0
const imgsRef = ref([documentUrl])

const onHide = () => {
    open.value = false;
    visibleRef.value = false
}

const openFile = async () => {
    visibleRef.value = true
}

/**
 * Vérifie si une URL pointe vers une image en se basant sur son extension.
 * @param {string} url Le lien à vérifier.
 * @returns {boolean} Retourne true si l'URL a une extension d'image, sinon false.
 */
const isImageUrl = (url: string) => {
    // Vérifie si l'url est une chaîne de caractères valide
    if (typeof url !== 'string' || url.length === 0) {
        return false;
    }

    // Regex pour tester les extensions d'images les plus communes (insensible à la casse)
    // .jpg, .jpeg, .png, .gif, .webp, .svg, .avif, .ico
    return /\.(jpg|jpeg|png|gif|webp|svg|avif|ico)$/i.test(url);
};


</script>

<style scoped></style>