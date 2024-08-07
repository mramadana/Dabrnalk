<template>
    <div>
        <div class="container">

            <img :src="branch_Details.image" v-if="!loading" loading="lazy" alt="car-img" class="car-img w-100">

            <div v-if="loading">
                <skeleton width="100%" height="250px" class="mb-4" />
            </div>

            <div class="branch-info mb-5">

                <h4 class="main-title bold mb-0" v-if="!loading">{{ branch_Details.name }}</h4>

                <div v-if="loading">
                    <skeleton width="120px" height="15px" class="mb-4" />
                </div>

                <div class="branch-details">

                    <div class="work-time pointer" @click="TimeWork = true">
                        <i class="far fa-clock"></i>
                        {{ $t("Global.times_work") }}
                    </div>

                    <div class="location pointer" v-if="!loading" @click="openMapModal">
                        <i class="fas fa-map-marker-alt"></i>
                        {{ branch_Details.map_desc }}
                    </div>

                    <div v-if="loading">
                        <skeleton width="120px" height="15px" class="mb-4" />
                    </div>
                </div>
            </div>

            <h1 class="main-title bold mb-4"> {{ $t("Global.categories_branch") }}</h1>

            <div class="row">
                <div class="col-12 col-xl-3 col-md-6 mb-5" v-for="branch in branchs" :key="branch.id">
                    <nuxt-link to="/cars" class="branch-box" @click="saveFormData(branch.id)">
                        <img :src="branch.image" loading="lazy" alt="branch-image" class="branch-image">
                        <h3 class="branch-name">{{ branch.name }}</h3>
                    </nuxt-link>
                </div>
            </div>

            <!-- if no data -->
            <div class="nodata d-flex justify-content-center mb-5" v-if="branchs?.length == 0 && !loading">
                <div class="radio-content">
                    <img  loading="lazy" src="@/assets/images/no_data.avif" alt="image" class="no-data-img car-img">
                    <div class="no-data-text">{{ $t('Global.no_branches') }}</div>
                </div>
            </div>
            
            

            <nuxt-link v-if="!loading && branchs?.length" to="/Categories" class="custom-btn md m-auto mb-4 gap-2 align-items-center">
                {{ $t('Global.show_more') }}
            </nuxt-link>
        </div>

        <!-- start to make dialog time work -->

        <Dialog v-model:visible="TimeWork" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <h1 class="main-title bold mb-4">
                        {{ $t("Global.times_work") }}
                    </h1>
                </div>

                
                <div class="time-header" v-if="timings?.length">
                    <h6>{{ $t("Global.today") }}</h6>
                    <h6>{{ $t("Global.from") }}</h6>
                    <h6>{{ $t("Global.to") }}</h6>
                </div>

                <h4 class="main-title text-center mb-4 mt-4" v-else>{{ $t("Order.no_appointments") }}</h4>

                <div class="parent-box" v-if="!loading">
                    <div class="time-body" v-for="time in timings" :key="time.id">
                        <h6>{{ time.day }}</h6>
                        <h6> {{ time.from }} </h6>
                        <h6> {{ time.to }}</h6>
                        <h6 class="cl-red" v-if="time.is_closed == 1">{{ $t("Global.closed") }}</h6>
                    </div>

                </div>

                <div class="d-flex align-items-center justify-content-center gap-3" v-if="loading">
                    <div v-for="i in 3" :key="i" class="time-body">
                        <Skeleton height="20px" width="80px" class="slider-img rounded-2"></Skeleton>
                    </div>
                </div>
    

        </Dialog>

        <!-- if no lat and lng -->
        <Dialog v-model:visible="emptyLocation" modal class="custum_dialog_width" :draggable="false">
            <div class="text-center">
                <h1 class="main-title bold">
                    {{ $t("Order.location_determined") }}
                </h1>
            </div>
        </Dialog>

        <!-- google map component -->

        <GlobalGoogleMap
            v-model:visible="visible"
            :lat="lat"
            :lng="lng"
            @handleClose="handleClose"
            :closeModal_btn="closeModal_btn"
            :AutoComplete="AutoComplete"
            :submit_location="submit_location"
            :isDraggable="false"
            :title= "$t('Global.current_location')"
            
        />

    </div>
</template>

<script setup>

    definePageMeta({
        name : "Titles.categories_branch",
    });

    const closeModal_btn = ref(true);
    const AutoComplete = ref(true);
    const submit_location = ref(true);
    const emptyLocation = ref(false);
    // response
    const { response } = responseApi();

    // axios
    const axios = useApi();

    const loading = ref(true);

    const { id } = useRoute().params;

    const branch_Details = ref({});

    const saveFormData = (id) => {
        localStorage.setItem('category_id', id)
    };

    const TimeWork = ref(false);

    const branchs = ref([]);

    const timings = ref([]);

    // google map customize

    const visible = ref(false);

    const lat = ref(null);
    const lng = ref(null);
    
    const openMapModal = () => {
        if(lat.value == 0 || lng.value == 0) {
            emptyLocation.value = true;
        } else {

            visible.value = true;
        }
    };
    const handleClose = () => {
        visible.value = false;
    };

    const branch_details = async () => {
        loading.value = true;
        await axios.get(`branch-details?branch_id=${id}`).then(res => {
            if (response(res) == "success") {
                branch_Details.value = res.data.data;
                lat.value = Number(res.data.data.lat);
                lng.value = Number(res.data.data.lng);
                branchs.value = res.data.data.categories;
                timings.value = res.data.data.timings;
            } 
            loading.value = false;
        }).catch(err => console.log(err));
    }

    onMounted(() => {
        branch_details()
    })


</script>

<style lang="scss" scoped>

    .branch-info {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: wrap;
        .branch-details {
            display: flex;
            gap: 40px;
            flex-wrap: wrap;
            .work-time, .location {
                display: flex;
                align-items: center;
                gap: 5px;
                i {
                    color: var(--main);
                }
            }
        }
    }

    .car-img {
        height: auto;
        max-height: 300px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 30px;
    }

    .branch-box {
        display: block;
        overflow: hidden;
        border-radius: 4px;
        border: 1px solid #dddddd;
        .branch-image {
            width: 100%;
            height: 180px;
            object-fit: cover;
            margin-bottom: 15px;
            @media (max-width: 550px) {
                height: 150px;
            }
        }

        .branch-name {
            font-size: 17px;
            color: var(--main);
            padding: 0 10px 5px;
        }
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

</style>