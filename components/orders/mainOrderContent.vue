<template>
    <div>
        <div v-if="!loading">
            
            <div v-if="orders.length">
                <OrdersCardOrder :orders="orders" />
            </div>
    
            <div class="d-flex align-items-center justify-content-center" v-if="!orders.length">
                <div class="radio-content">
                    <img  loading="lazy" src="@/assets/images/no_data.avif" alt="image" class="no-data-img car-img">
                    <div class="no-data-text">{{ $t('Global.no_products') }}</div>
                </div>
            </div>
        </div>

        <div v-if="loading">
            <OrdersOrderSkeleton />
        </div>

        <!--***** Paginator *****-->
        <div class="paginate-parent" v-if="showPaginate">
            <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-4" dir="ltr" />
        </div>
    </div>
</template>

<script setup>

const props = defineProps({
    ordersName: {
        type: String,
        required: true
    },
    noData: {
        type: String,
        required: true
    }
});

// success response
const { response } = responseApi();

// Toast
const { errorToast } = toastMsg();

// Axios
const axios = useApi();

// pinia store
import { useAuthStore } from '~/stores/auth';

/******************* Data *******************/

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

// loading
const loading = ref(true);

// orders
const orders = ref([]);

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();

/******************* Methods *******************/

// getOrders
const getOrders = async () => {
    loading.value = true;
    await axios.get(`${props.ordersName}?page=${currentPage.value}`, config).then(res => {
        if (response(res) == "success") {
            orders.value = res.data.data.data;
            totalPage.value = res.data.data.pagination.total_items;
            pageLimit.value = res.data.data.pagination.per_page;
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// Paginate Function
const onPaginate = (e) => {
    loading.value = true;
    currentPage.value = e.page + 1;
    window.scrollTo(0, 0);
    getOrders();
};

/******************* Computed *******************/
let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value;
});

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getOrders();
});
</script>

<!-- <script>
import image_1 from '@/assets/images/2.png';
    export default {
        props: {
            pending: String,
            required: true
        },
        data() {

            return {
                noOrders: false,
                pageLimit: 5,
                totalPage: 10,
                currentPage: 1,
                orders: [
                    {
                        image: image_1,
                        order_number: '12342#',
                        time: 'منذ 1 ساعه',
                        name: "سيارة هوندا فاخرة",
                        oder_status: 'حالى',
                        id: "1",
                    },
                    {
                        image: image_1,
                        order_number: '12342#',
                        time: 'منذ 2 ساعه',
                        name: "سيارة هوندا فاخرة",
                        oder_status: 'انتظار الموافقة',
                        id: "2",
                    },
                    {
                        image: image_1,
                        order_number: '12342#',
                        time: 'منذ 3 ساعه',
                        name: "سيارة هوندا فاخرة",
                        oder_status: 'حالى',
                        id: "3",
                    },
                    {
                        image: image_1,
                        order_number: '12342#',
                        time: 'منذ 6 ساعه',
                        name: "سيارة هوندا فاخرة",
                        oder_status: 'حالى',
                        id: "4",
                    },
                ],
            };
        },

        methods: {

            // axios method get data each page

            onPaginate(event) {
                this.currentPage = event.page + 1;
                this.pageLimit = event.rows;
                window.scrollTo(0, 0);

            },
        }
    }
</script> -->
