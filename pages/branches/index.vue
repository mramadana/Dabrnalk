<template>
    <div>
        <div class="container">

            <h1 class="main-title normal lg text-center mb-5">{{ $t("Global.the_branche") }}</h1>
            
            <!-- start to Branches -->
            <HomeBranch :branches="branches" :loading="loading"/>

            <!--***** Paginator *****-->
            <div class="paginate-parent" v-if="showPaginate">
                <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-4 mb-4" dir="ltr" />
            </div>

        </div>
    </div>
</template>

<script setup>

    definePageMeta({
        name: "Global.the_branche",
    })

    // response
    const { response } = responseApi();

    // axios
    const axios = useApi();

    const loading = ref(true);

    const branches = ref([
    ]);

    // Paginator
    const currentPage = ref(1);
    const pageLimit = ref();
    const totalPage = ref();

    const getBranches = async () => {
        loading.value = true;
        await axios.get(`branches?page=${currentPage.value}`).then(res => {
            if (response(res) == "success") {
                branches.value = res.data.data.branches;
                totalPage.value = res.data.data.pagination.total_items;
                pageLimit.value = res.data.data.pagination.per_page;
            } else {
                errorToast(res.data.msg);
            }
            loading.value = false;
        }).catch(err => console.log(err));
    };

    // Paginate Function
    const onPaginate = (e) => {
        loading.value = true;
        currentPage.value = e.page + 1;
        window.scrollTo(0, 0);
        getBranches();
    };

    /******************* Computed *******************/
    let showPaginate = computed(() => {
        return totalPage.value > pageLimit.value;
    });

    onMounted(() => {
        getBranches();
    });

</script>