<template>
    <div>
        <div class="container">

            <h1 class="main-title normal lg text-center mb-5">{{ $t("Global.research_results") }}</h1>
            
            <!-- start to Branches -->
             
            <HomeBranch :branches="branches" :loading="loading" :nodataText="$t('Global.no_results')"/>

            <!--***** Paginator *****-->
            <div class="paginate-parent" v-if="showPaginate">
                <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-4 mb-4" dir="ltr" />
            </div>

        </div>
    </div>
</template>

<script setup>

    definePageMeta({
        name: "Global.research_results",
    })

    // response
    const { response } = responseApi();

    // axios
    const axios = useApi();

    const loading = ref(true);

    // Route
    const route = useRoute();

    const branches = ref([
    ]);

    // Paginator
    const currentPage = ref(1);
    const pageLimit = ref();
    const totalPage = ref();
    
    
    // start to make search work
    
    const getBranches = async () => {
        loading.value = true;
        await axios.get(`branches?search=${search.value}&page=${currentPage.value}`).then(res => {
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
    
    // pageination
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

    
    const search = computed(() => {
        return route.query.text;
    });

    watch(() => route.query.text, async (newSearchText, oldSearchText) => {
        if (newSearchText !== oldSearchText) {
            currentPage.value = 1; // Reset to the first page for a new search
            await getBranches();
        }
    });
    
    onMounted(() => {
        getBranches();
    });

</script>