<template>

  <div ref="el" class="h-screen container-with-stable-gutter">
    <transition name="fade">
      <LoadingBar v-if="loading"></LoadingBar>
    </transition>


    <RouterView class="font-publicsans" />
    <!-- <router-view class="font-publicsans" v-slot="{ Component }">
      <Transition name="fade" :appear="true">
        <component :is="Component" />
      </Transition>
    </router-view> -->
    <VueQueryDevtools />
  </div>

</template>
<script setup lang="ts">
import { useIsFetching } from '@tanstack/vue-query';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import LoadingBar from './components/loadingBar.vue';
import { useLoaderStore } from './stores/useLoaderStore';


const { isLoading: loading } = storeToRefs(useLoaderStore());

const route = useRoute();
const isVisited = ref(false);

const isFetching = useIsFetching(
  // { queryKey: [adminQueryKeys.adminFilters] }
);

// useIsLo

const { startLoading, stopLoading, stopLoadingSkeleton } = useLoaderStore();
const initialLoadingComplete = ref(false);




watch(isFetching, (newValue) => {


  if (newValue > 0 && isVisited.value == false) {
    startLoading();

    isVisited.value = true;
  }
  if (newValue == 0) {
    stopLoading();
    stopLoadingSkeleton();

  }
}, { immediate: true });

// Vérifier immédiatement après le montage si des requêtes sont en cours
// onMounted(() => {
//   console.log("isFetching.value", isFetching.value);
//   // Si aucune requête n'est en cours (isFetching.value === 0)
//   if (isFetching.value === 0 && !initialLoadingComplete.value) {
//     setTimeout(() => {
//       stopLoading();
//       initialLoadingComplete.value = true;
//     }, 3000);
//   }
// });

// Ce watcher ne s'activera que si des requêtes sont lancées





</script>

<style scoped>
:root {
  --ms-spinner-color: #fab529;

  --ms-tag-bg: #fab529;

  --ms-group-label-bg-selected: #fab529;

  --ms-group-label-bg-selected-pointed: #fab529;

  --ms-option-bg-selected: #fab529;

  --ms-option-bg-selected-pointed: #166FB8;

}

.dp__theme_light {
  --dp-primary-color: #fab529;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
