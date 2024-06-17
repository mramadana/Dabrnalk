<template>
    <div>
        <div class="container">

            <img  src="@/assets/images/change-email.png" loading="lazy" alt="car-img" class="car-img w-100">

            <!-- <div v-if="loading">
                <skeleton width="100%" height="250px" class="mb-4" />
            </div> -->

            <div class="branch-info mb-5">
                <h4 class="main-title bold mb-0">{{ $t("Global.branch_name") }}</h4>
                <div class="branch-details">

                    <div class="work-time pointer" @click="TimeWork = true">
                        <i class="far fa-clock"></i>
                        {{ $t("Global.times_work") }}
                    </div>

                    <div class="location pointer"  @click="openMapModal">
                        <i class="fas fa-map-marker-alt"></i>
                        موقع الفرع
                    </div>
                </div>
            </div>

            <h1 class="main-title bold mb-4"> {{ $t("Global.categories_branch") }}</h1>

            <div class="row">
                <div class="col-12 col-xl-3 col-md-6 mb-5" v-for="branch in branchs" :key="branch.id">
                    <nuxt-link to="/cars" class="branch-box" @click="saveFormData(branch.id)">
                        <img src="@/assets/images/branche-img.png" loading="lazy" alt="branch-image" class="branch-image">
                        <h3 class="branch-name">{{ branch.name }}</h3>
                    </nuxt-link>
                </div>
            </div>
        </div>

        <!-- start to make dialog time work -->

        <Dialog v-model:visible="TimeWork" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <h1 class="main-title bold mb-4">
                        {{ $t("Global.times_work") }}
                    </h1>
                </div>

                <div class="time-header">
                    <h6>اليوم</h6>
                    <h6>من </h6>
                    <h6>الى</h6>
                </div>

                <div v-if="!loading">
                    <div class="time-body" v-for="time in timings" :key="time.id">
                        <h6>{{ time.day }}</h6>
                        <h6> {{ time.from }} </h6>
                        <h6> {{ time.to }}</h6>
                        <!-- <h6 v-if="time.is_closed == 1"> {{ time.is_closed }}</h6> -->
                    </div>

                </div>

                <div class="d-flex align-items-center justify-content-center gap-3" v-if="loading">
                    <div v-for="i in 3" :key="i" class="time-body">
                        <Skeleton height="20px" width="80px" class="slider-img rounded-2"></Skeleton>
                    </div>
                </div>
    

        </Dialog>

        <!-- google map component -->

        <GlobalGoogleMap
            v-model:visible="visible"
            @closeModal="closeModal"
            :show_inputs="show_inputs"
            :lat="lat"
            :lng="lng"
            :title= "$t('Global.current_location')"
            
            />

    </div>
</template>

<script setup>

    import { useAuthStore } from '~/stores/auth';

    const store = useAuthStore();

    const { lat , lng } = storeToRefs(store);

    const { id } = useRoute().params;

    definePageMeta({
        name : "Titles.categories_branch",
    });

    const GoogleMap = ref(false);

    const saveFormData = (id) => {
        localStorage.setItem('category_id', id)
    };

    const TimeWork = ref(false);

    const branchs = ref([
        {
            id: 1,
            name: "الفرع الاول",
        },
        {
            id: 2,
            name: "الفرع الاول",
        },
        {
            id: 3,
            name: "الفرع الاول",
        },
        {
            id: 4,
            name: "الفرع الاول",
        },
        {
            id: 5,
            name: "الفرع الاول",
        }
    ]);

    const timings = ref([
        {
            "id": 2,
            "day": "sunday",
            "from": "10:00:00",
            "to": "06:00:00",
            "is_closed": 0
        },

        {
            "id": 3,
            "day": "monday",
            "from": "10:00:00",
            "to": "06:00:00",
            "is_closed": 1
        },

    ])

    // google map customize

    const visible = ref(false);
    // const lat = ref(30.0444);
    // const lng = ref(31.2357);
    const show_inputs = ref(true);
    const openMapModal = () => {
        visible.value = true;
        
        // setTimeout(() => {
        //     document.querySelector(".getCurent").click();
        // }, 200);
    };
    const closeModal = (titleName) => {
        visible.value = false;
        console.log(titleName, "get title name");
    };

    onMounted(() => {
        console.log(localStorage.getItem('lat'), "lat", localStorage.getItem('lng'), "lng");
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
        border: 1px solid #262626;
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
        h6 {
            font-size: 14px;
        }
    }

</style>