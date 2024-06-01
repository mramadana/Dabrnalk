<template>
    <div>
      <!-- loader -->

      <!-- <div v-if="loading" class="fixed_class">
        
      </div> -->


        <LayoutHeader />

        <div>
            <slot />
        </div>

        <LayoutFooter />

    </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { useRoute } from "#vue-router";

const { t, locale } = useI18n();
const route = useRoute();
    watchEffect(() => {
      useHead({
        title: `${t(route.name)}`,
      });
    });

  const nuxtApp = useNuxtApp();
  const loading = ref(true);
  nuxtApp.hook("page:start", () => {
    loading.value = true;
  });
  nuxtApp.hook("page:finish", () => {
    loading.value = false;
  });
</script>


<!-- <script>
import { useI18n } from "vue-i18n";
import { useRoute } from "#vue-router";
export default {
  setup() {
    const { t, locale } = useI18n();
    const route = useRoute();
    watchEffect(() => {
      useHead({
        title: `${t(route.name)}`,
      });
    });
    
  },
};
</script> -->


<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.fixed_class {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 5000;
  transition: all 0.5s;
  transform: translate3d(0, 0, 0);
  height: 100vh;
  background-color: #000;
}
</style>



