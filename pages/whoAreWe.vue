<template>
    <div>
        
        <div class="container">

            <!-- <div class="layout-form custom-width lg">
                <h1 class="main-title bold mb-4">{{ $t("Home.whoarewe") }}</h1>

                <div v-if="!loading" class="main-title normal mt-3 about_disc" v-html="aboutDisc">
                </div>

                <div v-if="loading">
                    <div v-for="i in 8" :key="i">
                        <Skeleton height=".5rem" width="80%" class="rounded-0 mb-2 mx-auto"></Skeleton>
                    </div>
                </div>
            </div> -->

        </div>

        <h1 class="main-title normal lg text-center bold ">{{ $t("Home.whoarewe") }}</h1>

        <!-- start to main slider  -->
        <HomeMainSlider :slider="aboutSlider" :slider_title="true" :loading="loading" class="mb-5"/>


    </div>
</template>

<script setup>

definePageMeta({
    name: "Home.whoarewe",
});

const loading = ref(true);

const { response } = responseApi();

const axios = useApi();

const aboutSlider = ref([]);

const aboutDisc = ref('');

// methods 


const getAbout = async () => {
    loading.value = true;
    await axios.get(`intros`).then(res => {
    if (response(res) == "success") {
        aboutSlider.value = res.data.data;
        console.log(aboutSlider.value)
    }   
    loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}
















// getAbout
// const getAbout = async () => {
//     loading.value = true;
//     await axios.get(`about`).then(res => {
//     if (response(res) == "success") {
//         aboutDisc.value = res.data.data;
//     }
//     loading.value = false;
//     }).catch(err => {
//         console.error(err);
//     });
// };

onMounted(() => {
    getAbout();
})
</script>

<style lang="scss" scoped>
    .main-title {
        margin-bottom: 40px;

        @media (max-width: 550px) {
            margin-bottom: 30px;
        }
    }
</style>

