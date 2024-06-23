<template>
    <div>
        <div class="container">
            
            <div class="filter-input mb-5">
                <div class="search-box">
                    <div class="main_input with_icon m-0">
                        <input type="search" class="input" v-model="search" :placeholder="$t('Home.search')" @input="searchCars"/>
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
                        <img :src="car.image" loading="lazy" alt="branch-image" class="branch-image">
                        <div>
                            <h4 class="main-title normal bold">{{ car.name }}</h4>
                            <h6 class="cl-red main-disc">متوفر</h6>
                            <h6 class="cl-red main-disc">{{ car.disc }}</h6>
                            
                            <div class="normal bold d-flex">
                                <h6 class="gray">{{ $t('Global.manufacturing_year') }} : </h6> <h6>{{ car.manufacturing_year }}</h6>
                            </div>

                        </div>
                        <div class="normal bold d-flex gap-2 flex-wrap info">
                            <div class="d-flex gap-1">
                                <h6 class="gray mb-0">{{ $t('Global.model') }} : </h6> <h6 class="mb-0">{{ car.car_model }}</h6>
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

            <!--***** Paginator *****-->
            <div class="paginate-parent" v-if="showPaginate">
                <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-4" dir="ltr" />
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
                                <Dropdown v-model="car_type" :options="car_types" optionLabel="name" valid="kokooo" :placeholder="$t('Global.type')" class="w-full md:w-14rem custum-dropdown" />
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="flex justify-content-center dropdown_card main_input special-custom">
                                <i class="far fa-calendar-alt sm-icon"></i>
                                <Dropdown v-model="rental_type" :options="rental_types" optionLabel="name" valid="password" :placeholder="$t('Global.rental_type')" class="w-full md:w-14rem custum-dropdown" />
                            </div>
                        </div>

                        <div class="d-flex gap-3 form-group justify-content-center ">

                            <label class="custom-radio custom-check">
                                <input type="radio" name="opinion" value="height" v-model="checkedIds" class="d-none">
                                <span class="mark">
                                    <i class="fas fa-check icon"></i>
                                </span>
                                <p class="hint">{{ $t('Global.high_price') }}</p>
                            </label>

                            <label class="custom-radio custom-check">
                                <input type="radio" name="opinion" value="low" v-model="checkedIds" class="d-none">
                                <span class="mark">
                                    <i class="fas fa-check icon"></i>
                                </span>
                                <p class="hint">{{ $t('Global.low_price') }}</p>
                            </label>

                        </div>

                        <button type="button" class="custom-btn mb mr-auto" @click="filterCars">
                            {{ $t('Home.search') }}
                            <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
                        </button>

                    </form>
                </div>
        </Dialog>
    </div>
</template>

<script setup>

    definePageMeta({
        name : "Titles.cars",
    });

    // response
    const { response } = responseApi();

    // Toast
    const { errorToast } = toastMsg();

    const errors = ref([]);

    // axios
    const axios = useApi();

    const loading = ref(true);

    // import i18n
    import { useI18n } from 'vue-i18n';

    // import useI18n
    const { t } = useI18n({ useScope: 'global' });

    const searchDialog = ref(false);

    const checkedIds = ref('');

    const search = ref('');

    const cars = ref([]);
    
    const car_type = ref(null);

    const car_types = ref([])
    
    const rental_type = ref(null);

    const rental_types = ref([
        {
            id: 1,
            name: t(`Global.daily`),
            type: 'daily'
        },

        {
            id: 2,
            name: t(`Global.monthly`),
            type: 'monthly'
        },

        {
            id: 3,
            name: t(`Global.yearly`),
            type: 'yearly'
        },
    ]);

    // Paginator
    const currentPage = ref(1);
    const pageLimit = ref();
    const totalPage = ref();

    // validationFun

        // validation Function
    const validate = () => {
        
        if (!car_type.value) {
            errors.value.push(t('validation.car_type'));
        }
        if (!rental_type.value) {
            errors.value.push(t('validation.rental_type'));
        }

        if (!checkedIds.value) {
            errors.value.push(t('validation.price'));
        }
    }
    
    const saveFormData = (id) => {
        localStorage.setItem('car_id', id)
    }

    // getcars function
    const getcars = async () => {
        const categoryId = JSON.parse(localStorage.getItem('category_id'));
        loading.value = true
        await axios.get(`category-cars?category_id=${categoryId}?page=${currentPage.value}`).then((res) => {
            if(response(res) == 'success') {
                cars.value = res.data.data.cars
                totalPage.value = res.data.data.pagination.total_items
                pageLimit.value = res.data.data.pagination.per_page
            } else {
                cars.value = []
            }
        })
        loading.value = false
    }

    // get car-types
    const getCarTypes = async () => {
        await axios.get(`car-types`).then((res) => {
            if(response(res) == 'success') {
                car_types.value = res.data.data
            } else {
                car_types.value = []
            }
        }).catch(err => console.log(err));
    }

    // filtering cars  
    const filterCars = () => {
        const category_id = JSON.parse(localStorage.getItem('category_id'));
        loading.value = true;
        validate();
        if (errors.value.length) {
            errorToast(errors.value[0]);
            loading.value = false;
            errors.value = [];
        } else {

            cars.value = [];
            axios.get(`category-cars?category_id=${category_id}&car_type_id=${car_type.value.id}&rental_type=${rental_type.value.type}&price=${checkedIds.value}`).then(res => {
                if (response(res) == "success") {
                    cars.value = res.data.data.cars;
                    totalPage.value = res.data.data.pagination.total_items;
                    pageLimit.value = res.data.data.pagination.per_page;
                    searchDialog.value = false;
                    car_type.value = null;
                    rental_type.value = null;
                    checkedIds.value = {};
                }
                loading.value = false;
            })
        }
    };

    // searchCars
    const searchCars = () => {
        const category_id = JSON.parse(localStorage.getItem('category_id'));
        loading.value = true;
        cars.value = [];
        axios.get(`category-cars?category_id=${category_id}&search=${search.value}`).then(res => {
            if (response(res) == "success") {
                cars.value = res.data.data.cars;
                totalPage.value = res.data.data.pagination.total_items;
                pageLimit.value = res.data.data.pagination.per_page;
            }
            loading.value = false;
        })
    };

    // Paginate Function
    const onPaginate = (e) => {
        loading.value = true;
        currentPage.value = e.page + 1;
        window.scrollTo(0, 0);
        getcars();
    };

    /******************* Computed *******************/
    let showPaginate = computed(() => {
        return totalPage.value > pageLimit.value;
    });

    onMounted( async () => {

        // get car-types
        await getcars()

        // get car-types
        await getCarTypes()
    })

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