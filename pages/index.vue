<template>
    <div>
        <main>
            <!-- start to main slider  -->
            <HomeMainSlider :slider="sliderHome" :loading="loading" class="mb-5"/>

            <div class="container">

                <!-- start to who are we -->
                <HomeWhoAreWe :WeAreWe="WeAreWe" />

                <!-- start to Branches shape  -->
                <div class="footer-shape position-relative mb-5">
                    <div class="with-shape lg black"></div>
                    <h1 class="main-title shape-title">
                        <img src="@/assets/images/branches-img.png" loading="lazy" alt="branches-img" class="branches-img">
                        {{ $t("Global.branches") }}
                    </h1>
                    <div class="with-shape lg black"></div>
                </div>

                <!-- start to Branches -->
                <HomeBranch :branches="branches" :loading="loading" :nodataText="$t('Global.no_branches')"/>

                <nuxt-link v-if="!loading" to="/branches" class="custom-btn md m-auto mb-4 gap-2 align-items-center">
                    {{ $t('Global.show_more') }}
                </nuxt-link>

            </div>

            <!-- start to appStore -->
            <HomeAppStore />
    
        </main>
    </div>
</template>

<script setup>

definePageMeta({
    name: "Titles.home",
});

// response
const { response } = responseApi();

// axios
const axios = useApi();

const loading = ref(true);

import { useI18n } from 'vue-i18n';

// store

const store = useAuthStore();

const { lat, lng } = storeToRefs(store);
const { sendLatLng } = store;

const { t } = useI18n({ useScope: 'global' }); 

const sliderHome = ref([]);

const WeAreWe = ref({
    description: 'ssssssiubddnfmv djbhds',
    desc1: '.أحدث السيارات متوفرة على مدار الساعة',
    desc2: '.أحدث السيارات متوفرة على مدار الساعة',
    desc3: '.أحدث السيارات متوفرة على مدار الساعة',
});

const branches = ref([]);

// start to get Home Data

// const getHome = async () => {
//     loading.value = true;
//   await axios.get(`home?lat=${lat.value}&lng=${lng.value}`).then(res => {
//     if (response(res) == "success") {
//        sliderHome.value = res.data.data.sliders;
//        branches.value = res.data.data.branches;
//     }
//     loading.value = false;
//   }).catch(err => console.log(err));
// };









const getHome = async () => {
  loading.value = true;

  if (lat.value === null || lng.value === null) {
    // Get current location if lat or lng is null
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(`Current Location: Latitude: ${latitude}, Longitude: ${longitude}`);
        sendLatLng(latitude, longitude, store.address, store.selectedAddress)
          .then(async () => {
            // Proceed with API call after setting lat and lng
            await fetchHomeData(latitude, longitude);
          })
          .catch(err => console.error("Error in sendLatLng:", err));
      }, (error) => {
        console.error("Error getting current location", error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  } else {
    // Proceed with API call if lat and lng are already set
    await fetchHomeData(lat.value, lng.value);
  }
};

const fetchHomeData = async (latitude, longitude) => {
  await axios.get(`home?lat=${latitude}&lng=${longitude}`).then(res => {
    if (response(res) == "success") {
      sliderHome.value = res.data.data.sliders;
      branches.value = res.data.data.branches;
    }
    loading.value = false;
  }).catch(err => console.log(err));
}

onMounted( async () => {
    // get Home
    await getHome();
});

</script>
