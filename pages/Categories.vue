<template>
    <div>

        <div class="container">
            <h1 class="main-title lg text-center mb-5">{{ $t("Global.categories") }}</h1>
    
            <!-- start to categories -->
    
            <div class="row">
                <div class="col-12 col-xl-3 col-md-6 mb-5" v-for="category in categories" :key="category.id">
                    <nuxt-link to="/cars" class="branch-box" @click="saveFormData(category.id)">
                        <img :src="category.image" loading="lazy" alt="branch-image" class="branch-image">
                        <h3 class="branch-name">{{ category.name }}</h3>
                    </nuxt-link>
                </div>
            </div>
            
            <!-- if no data -->
            <div class="nodata d-flex justify-content-center mb-5" v-if="categories?.length == 0 && !loading">
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
                <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-4 mb-4" dir="ltr" />
            </div>

        </div>


    </div>
</template>

<script setup>

    definePageMeta({
        name: "Global.categories",
    });


    // response
    const { response } = responseApi();

    // axios
    const axios = useApi();

    const loading = ref(true);

    const categories = ref([]);

    // Paginator
    const currentPage = ref(1);
    const pageLimit = ref();
    const totalPage = ref();

    const saveFormData = (id) => {
        localStorage.setItem('category_id', id)
    }

    const get_category = async () => {
        loading.value = true
        const branch_id = JSON.parse(localStorage.getItem('branch_id'));
        await axios.get(`branch-categories?branch_id=${branch_id}&page=${currentPage.value}`).then((res) => {
            if(response(res) == 'success') {
                categories.value = res.data.data.categories
                totalPage.value = res.data.data.pagination.total_items
                pageLimit.value = res.data.data.pagination.per_page
                console.log(res.data.data)
            }

            loading.value = false
        }).catch(err => console.log(err));
    }


    // Paginate Function
    const onPaginate = (e) => {
        loading.value = true;
        currentPage.value = e.page + 1;
        window.scrollTo(0, 0);
        get_category();
    };

    /******************* Computed *******************/
    let showPaginate = computed(() => {
        return totalPage.value > pageLimit.value;
    });

    onMounted( async () => {
       await get_category();
    });
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
        h6 {
            font-size: 14px;
        }
    }

</style>