<template>
    <div>
        <main>

            <!-- start to main slider  -->
            <HomeMainSlider :slider="sliderHome" :loading="loading" class="mb-5"/>

            <div class="container">

                <!-- start to who are we -->
                <HomeWhoAreWe :WeAreWe="WeAreWe" />

                <!-- start to Branches shape  -->
                <div class="footer-shape position-relative">
                    <div class="with-shape lg black"></div>
                    <h1 class="main-title shape-title">
                        <img src="@/assets/images/branches-img.png" loading="lazy" alt="branches-img" class="branches-img">
                        {{ $t("Global.branches") }}
                    </h1>
                    <div class="with-shape lg black"></div>
                </div>

                <!-- start to Branches -->
                <HomeBranch :branches="branches" :loading="loading"/>

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

// Toast
const { successToast, errorToast } = toastMsg();
const { t } = useI18n({ useScope: 'global' }); 

const sliderHome = ref([]);

const WeAreWe = ref({
    description: 'ssssssiubddnfmv djbhds',
    desc1: '.أحدث السيارات متوفرة على مدار الساعة',
    desc2: '.أحدث السيارات متوفرة على مدار الساعة',
    desc3: '.أحدث السيارات متوفرة على مدار الساعة',
});

const branches = ref([
    {
        name: 'الفرع الرئيسي',
        address: 'الرياض',
        id: 1,
    },

    {
        name: 'الفرع الفرعى',
        address: 'الرياض',
        id: 2,
    },
    {
        name: 'الفرع الثاني',
        address: 'الرياض',
        id: 3,
    },
    {
        name: 'الفرع الثالث',
        address: 'بسم الله الرحمن الرحيم',
        id: 4,
    },
]);

// start to get Home Data

const getHome = async () => {
    loading.value = true;
  await axios.get('home').then(res => {
    if (response(res) == "success") {
       sliderHome.value = res.data.data.slider;
    }
    loading.value = false;
  }).catch(err => console.log(err));
};

onMounted(() => {
    getHome();
});

</script>
