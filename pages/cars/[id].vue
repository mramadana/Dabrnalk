<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-xl-7 mb-5">
                    <img src="@/assets/images/2.png" loading="lazy" alt="car-img" class="car-details mb-4 w-100">

                    <Skeleton width="100%" height="300px" class="slider-img rounded-1 mb-5" v-if="loading"></Skeleton>

                    <h1 class="main-title bold mb-4">فورد موستنج</h1>

                    <Skeleton width="100px" height="15px" class="rounded-2 mb-4" v-if="loading"></Skeleton>

                    <h4 class="main-title normal">{{ $t('Global.desc_car') }}</h4>

                    <p class="main-disc">bdghucijokfgyfgyfsygdsygsgygys</p>

                    <Skeleton width="400px" height="35px" class="rounded-2 mb-4" v-if="loading"></Skeleton>
                </div>
    
                <div class="col-12 col-xl-5 mb-5">
                    <div class="info mb-4">
                        <div class="item-details">
                            <h6 class="text">نوع السيارة</h6>
                            <h6 class="text">FORD</h6>
                        </div>
    
                        <div class="item-details">
                            <h6 class="text">نوع السيارة</h6>
                            <h6 class="text">FORD</h6>
                        </div>
    
                        <div class="item-details">
                            <h6 class="text">نوع السيارة</h6>
                            <h6 class="text">FORD</h6>
                        </div>
    
                        <div class="item-details">
                            <h6 class="text">نوع السيارة</h6>
                            <h6 class="text">FORD</h6>
                        </div>
    
                        <div class="item-details">
                            <h6 class="text">نوع السيارة</h6>
                            <h6 class="text">FORD</h6>
                        </div>

                    </div>

                    <router-link class="custom-btn md mr-auto" to="/createOrder">{{ $t('Global.reservation_car') }}</router-link>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        name: "Global.car_details",
    });

    const loading = ref(false)

    const { id } = useRoute().params
</script>

<style lang="scss">
    .car-details {
        object-fit: cover;
        border-radius: 3px;
        height: 350px;
    }

    .item-details {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 10px;
        &:nth-child(odd) {
            background-color: rgb(157 157 156 / 10%);
        }
        &:nth-child(even) {
            background-color: rgb(157 157 156 / 40%);
        }
        .text {
            font-size: 13px;
            margin-bottom: 0;
        }
    }
</style>