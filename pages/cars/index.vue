<template>
    <div>
        <div class="container">
            
            <div class="filter-input mb-5">
                <div class="search-box">
                    <div class="main_input with_icon m-0">
                        <input type="search" class="input" :placeholder="$t('Home.search')" />
                        <button type="button" class="static-btn search-btn" @click="searchDialog = true">
                            <i class="fas fa-list-ul search-icon"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- start to cars section -->
            <div class="row">
                <div class="col-12 col-xl-3 col-md-6" v-for="car in cars" :key="car.id">
                    <div class="Branche">
                        <img src="@/assets/images/branche-img.png" loading="lazy" alt="branch-image" class="branch-image">
                        <div>
                            <h4 class="main-title normal bold">اسم السيارة</h4>
                            <h6 class="cl-red main-disc">متوفر</h6>
                            <h6 class="cl-red main-disc">{{ car.disc }}</h6>
                            
                            <div class="normal bold d-flex">
                                <h6 class="gray">{{ $t('Global.manufacturing_year') }} : </h6> <h6>2022</h6>
                            </div>

                        </div>
                        <div class="normal bold d-flex gap-2 flex-wrap info">
                            <div class="d-flex gap-1">
                                <h6 class="gray mb-0">{{ $t('Global.model') }} : </h6> <h6 class="mb-0">2022</h6>
                            </div>
                            <nuxt-link :to="'/cars/' + car.id" class="custom-btn smm" @click="saveFormData(car.id)">{{ $t('Global.show_more') }}</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>

            <!-- if no data -->
            <div class="nodata d-flex justify-content-center mb-5" v-if="cars?.length == 0 && !loading">
                <div class="radio-content">
                    <img  loading="lazy" src="@/assets/images/no_data.avif" alt="image" class="no-data-img car-img">
                    <div class="no-data-text">{{ $t('Global.no_products') }}</div>
                </div>
            </div>
            
            <!-- loading -->
            <div class="d-flex align-items-center justify-content-between row" v-if="loading">
                <div v-for="i in 4" :key="i" class="col-md-4 col-xl-3 mb-4">
                    <Skeleton height="170px" class="slider-img rounded-2"></Skeleton>
                </div>
            </div>
        </div>

        <!-- start to pop up of search -->

        <Dialog v-model:visible="searchDialog" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <h1 class="main-title bold mb-4">
                        {{ $t('Global.search_filter') }}
                    </h1>
                    <form>
                        <div class="form-group">
                            <div class="flex justify-content-center dropdown_card main_input special-custom">
                                <i class="fas fa-car-side sm-icon"></i>
                                <Dropdown v-model="gender" :options="genders" optionLabel="name" :placeholder="$t('Global.type')" class="w-full md:w-14rem custum-dropdown" />
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="flex justify-content-center dropdown_card main_input special-custom">
                                <i class="far fa-calendar-alt sm-icon"></i>
                                <Dropdown v-model="rental_type" :options="rental_types" optionLabel="name" :placeholder="$t('Global.rental_type')" class="w-full md:w-14rem custum-dropdown" />
                            </div>
                        </div>

                        <div class="d-flex gap-3 form-group justify-content-center ">

                            <label class="custom-radio custom-check">
                                <input type="radio" name="opinion" value="height" v-model="checkedIds" class="d-none">
                                <span class="mark">
                                    <i class="fas fa-check icon"></i>
                                </span>
                                <p class="hint">الأعلى سعرا</p>
                            </label>

                            <label class="custom-radio custom-check">
                                <input type="radio" name="opinion" value="low" v-model="checkedIds" class="d-none">
                                <span class="mark">
                                    <i class="fas fa-check icon"></i>
                                </span>
                                <p class="hint">الأعلى سعرا</p>
                            </label>

                        </div>

                        <button type="button" class="custom-btn mb mr-auto" @click="searchDialog = false">{{ $t('Home.search') }}</button>

                    </form>
                </div>
        </Dialog>
    </div>
</template>

<script setup>

    definePageMeta({
        name : "Titles.cars",
    });

    // import i18n
    import { useI18n } from 'vue-i18n';

    // import useI18n
    const { t } = useI18n({ useScope: 'global' });

    const searchDialog = ref(false);

    const cars = ref([
        {
            id: 1,
            title : "item",
            disc : "itemmmm"
        },
        {
            id: 2,
            title : "item"
        },
        {
            id: 3,
            title : "item"
        },
        {
            id: 4,
            title : "item"
        },
        {
            id: 5,
            title : "item"
        }
    ]);
    
    const gender = ref(null);

    const genders = ref([
        {
            id: 1,
            name: t(`Auth.male`),

        },

        {
            id: 2,
            name: t(`Auth.female`),
        }
    ])
    
    const rental_type = ref(null);
    const rental_types = ref([
        {
            id: 1,
            name: t(`Auth.male`),

        },
    ])
    
    const saveFormData = (id) => {
        localStorage.setItem('car_id', id)
    }

</script>

<style lang="scss" scoped>
    .Branche {
            padding: 5px 5px 8px;
            border: 1px solid #000000;
            border-radius: 3px;
            height: calc(100% - 25px);
            margin-bottom: 25px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        .branch-image {
            width: 100%;
            height: 180px;
            display: block;
            object-fit: cover;
            margin: 0 auto 15px;
            @media (max-width: 550px) {
                height: 150px;
            }
        }

        .info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        }
    }
</style>