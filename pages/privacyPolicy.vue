<template>
    <div>
        
        <div class="container">
            <div class="layout-form custom-width lg">
                <h1 class="main-title bold mb-4">{{ $t("Global.privacy_policy") }}</h1>

                <img src="@/assets/images/black_logo.png" alt="logo" class="login_logo mb-4" loading="lazy">

                <div v-if="!loading" class="main-title normal mt-3 about_disc" v-html="aboutDisc">
                </div>

                <div v-if="loading">
                    <div v-for="i in 8" :key="i">
                        <Skeleton height=".5rem" width="80%" class="rounded-0 mb-2 mx-auto"></Skeleton>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>

definePageMeta({
    name: "Global.privacy_policy",
});

const loading = ref(true);

const { response } = responseApi();

const axios = useApi();


const aboutDisc = ref('');

// methods 

// getAbout
const getAbout = async () => {
    loading.value = true;
    await axios.get(`about`).then(res => {
    if (response(res) == "success") {
        aboutDisc.value = res.data.data;
    }
    loading.value = false;
    }).catch(err => {
        console.error(err);
    });
};

onMounted(() => {
    getAbout();
})
</script>

<style lang="scss" scoped>
    .login_logo {
        @media (max-width: 768px) {
            max-width: 150px;
        }
    }
</style>

