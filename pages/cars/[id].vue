<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-xl-7 mb-5">

                    <img :src="carDetails.image" loading="lazy" v-if="!loading" alt="car-img" class="car-details mb-4 w-100">

                    <Skeleton width="100%" height="350px" class="slider-img rounded-1 mb-4" v-if="loading"></Skeleton>

                    <div class="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-4">
                        <h1 class="main-title bold mb-0">{{ carDetails?.name }}</h1>
                        
                        <h5 class="normal pointer cl-red mb-0 decoration" v-if="carDetails?.off_dates.length"  @click="dateAvilable = true">{{ $t("Cars.not_available") }}</h5>
                    </div>

                    <Skeleton width="60px" height="15px" class="rounded-2 mb-4" v-if="loading"></Skeleton>

                    <h4 class="main-title normal mb-3">{{ $t('Global.desc_car') }}</h4>

                    <div class="main-disc custom-desc">
                        <p v-if="carDetails?.description && !loading">{{ carDetails.description }}</p>
                        <p v-else>{{ $t('Cars.no_description') }}</p>
                    </div>

                </div>
    
                <div class="col-12 col-xl-5 mb-5">
                    <div class="info mb-5">
                        <div class="item-details">
                            <h6 class="text">{{ $t('Cars.car_type') }}</h6>
                            <h6 class="text" v-if="!loading">{{ carDetails.car_type }}</h6>
                            <skeleton v-if="loading" width="100px" height="10px"/>
                        </div>
    
                        <div class="item-details">
                            <h6 class="text">{{ $t('Cars.category') }}</h6>
                            <h6 class="text" v-if="!loading">{{ carDetails.category }}</h6>
                            <skeleton v-if="loading" width="100px" height="10px"/>
                        </div>
    
                        <div class="item-details">
                            <h6 class="text">{{ $t('Global.model') }}</h6>
                            <h6 class="text" v-if="!loading">{{ carDetails.car_model }}</h6>
                            <skeleton v-if="loading" width="100px" height="10px"/>
                        </div>
    
                        <div class="item-details">
                            <h6 class="text">{{ $t('Global.manufacturing_year') }}</h6>
                            <h6 class="text" v-if="!loading">{{ carDetails.manufacturing_year }}</h6>
                            <skeleton v-if="loading" width="100px" height="10px"/>
                        </div>
    
                        <div class="item-details">
                            <h6 class="text">{{ $t('Cars.owner_car') }}</h6>
                            <h6 class="text" v-if="!loading">{{ $t('Order.car_owner') }}</h6>
                            <skeleton v-if="loading" width="100px" height="10px"/>
                        </div>

                        <div class="item-details">
                            <h6 class="text">{{ $t('Cars.car_color') }}</h6>
                            <h6 class="text" v-if="!loading">{{ carDetails.color }}</h6>
                            <skeleton v-if="loading" width="100px" height="10px"/>
                        </div>

                    </div>

                    <div class="info mb-4">
                        <h5 class="text normal">{{ $t('Cars.rental_car') }}</h5>
                    </div>
                    

                    <div class="info mb-4">

                        <div class="item-details">
                            <h6 class="text">{{ $t('Global.daily') }}</h6>
                            <h6 class="text" v-if="!loading">{{ carDetails.rental_prices?.daily }}</h6>
                            <skeleton v-if="loading" width="100px" height="10px"/>
                        </div>

                        <div class="item-details">
                            <h6 class="text">{{ $t('Global.monthly') }}</h6>
                            <h6 class="text" v-if="!loading">{{ carDetails.rental_prices?.monthly }}</h6>
                            <skeleton v-if="loading" width="100px" height="10px"/>
                        </div>

                        <div class="item-details">
                            <h6 class="text">{{ $t('Global.yearly') }}</h6>
                            <h6 class="text" v-if="!loading">{{ carDetails.rental_prices?.yearly }}</h6>
                            <skeleton v-if="loading" width="100px" height="10px"/>
                        </div>
                    </div>

                    <router-link class="custom-btn md mr-auto" :class="{'disabled_btn' : carDetails?.off_dates.length}" :to="!carDetails?.off_dates.length ? '/createOrder' : ''">
                        <span v-if="!carDetails?.off_dates.length">
                            {{ $t('Global.reservation_car') }}
                        </span>
                        <span v-else>
                            {{ $t('Order.car_not_available') }}
                        </span>
                    </router-link>
                    <!-- <router-link class="custom-btn md mr-auto" to="/createOrder">{{ $t('Global.reservation_car') }}</router-link> -->
                </div>

            </div>
        </div>

        <!-- not available date dialog -->

        <Dialog v-model:visible="dateAvilable" v-if="carDetails?.off_dates.length" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <h1 class="main-title bold mb-4">
                        {{ $t("Cars.not_available_date") }}
                    </h1>
                </div>

                <div class="time-header">
                    <h6>{{ $t("Global.from") }}</h6>
                    <h6>{{ $t("Global.to") }}</h6>
                </div>

                <div class="parent-box" v-if="!loading">
                    <div class="time-body" v-for="date in carDetails.off_dates" :key="date.id">
                        <h6> {{ date.from }} </h6>
                        <h6> {{ date.to }}</h6>
                        <h6 class="cl-red" v-if="date.is_closed == 1">{{ $t("Global.closed") }}</h6>
                    </div>

                </div>

                <div class="d-flex align-items-center justify-content-center gap-3" v-if="loading">
                    <div v-for="i in 3" :key="i" class="time-body">
                        <Skeleton height="20px" width="80px" class="slider-img rounded-2"></Skeleton>
                    </div>
                </div>
    

        </Dialog>
    </div>
</template>

<script setup>

    definePageMeta({
        name: "Global.car_details",
    });

    const store = useAuthStore();
    
    const { carDetails } = storeToRefs(store);

    const { car_detailshandler } = store;

    const { id } = useRoute().params


    // loading
    const loading = ref(true);

    const dateAvilable = ref(false);

    const Getcar_details = async () => {
        loading.value = true;
        const res = await car_detailshandler(id);
        loading.value = false;
    }

    onMounted(() => {
        Getcar_details()
    })


</script>


<style lang="scss" scoped>
    .disabled_btn {
        cursor: not-allowed;
        opacity: .5;
    }
    .p-skeleton {
        background-color: #9c9393;
    }

    .time-header, .time-body {
        display: flex;
        justify-content: center;
        gap: 50px;
        margin-bottom: 10px;
        text-align: center;
        h6 {
            font-size: 14px;
            flex-grow: 1;
        }
    }

    .parent-box {
        max-height: 120px;
        overflow-y: auto;
    }

    .custom-desc {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 3px;
    }
</style>