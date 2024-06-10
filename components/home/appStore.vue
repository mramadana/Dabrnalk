<template>
    <section>
        <div class="inner-app mb-5">
            <div class="container">
                <div class="row d-flex align-items-center">
                    <div class="col-12 col-xl-5 mb-5">
                        <div class="app-info">

                            <img src="@/assets/images/logo.png" alt="app-logo" class="app-logo">

                            <h2 class="main-title lg mb-4 color-wh" v-if="!loading">
                                حمل تطبيق دبرناك الأن.
                            </h2>
                            <Skeleton class="rounded-2 mb-4" width="180px" height="15px"  v-if="loading"></Skeleton>

                            <div class="app-btns">
                                <NuxtLink to="" class="btn-app d-flex">
                                    <img src="@/assets/images/google-paly.png" alt="google-img" class="store-img" />
                                </NuxtLink>
                                <NuxtLink to="" class="btn-app d-flex">
                                    <img src="@/assets/images/app-store.png" alt="app-store" class="store-img"/>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                
                    <div class="col-12 col-xl-7">

                        <div class="main-app-imgs">

                            <div class="frame-parent right">
                                <img src="@/assets/images/frame-img.png" alt="frame-image" class="frame-shape">
                                <img src="@/assets/images/car-frame-2.png" alt="site-image" class="frame-child" v-if="!loading">
                                <Skeleton class="rounded-0 frame-child frame-skelton" v-if="loading"></Skeleton>
                            </div>
                            <div class="frame-parent center">
                                <img src="@/assets/images/frame-img.png" alt="frame-image" class="frame-shape">
                                <img src="@/assets/images/car-frame-1.png" alt="site-image" class="frame-child" v-if="!loading">
                                <Skeleton class="rounded-0 frame-child frame-skelton" v-if="loading"></Skeleton>
                            </div>
                            <div class="frame-parent left">
                                <img src="@/assets/images/frame-img.png" alt="frame-image" class="frame-shape">
                                <img src="@/assets/images/car-frame-1.png" alt="site-image" class="frame-child" v-if="!loading">
                                <Skeleton class="rounded-0 frame-child frame-skelton" v-if="loading"></Skeleton>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script setup>
    defineProps(['banner_home', 'loading'])
</script>

<style lang="scss">
    .app-info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>





