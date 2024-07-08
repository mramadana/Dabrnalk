<template>
    <div>
        <div class="container">
            <div class="layout-form custom-width md text-start">
                <!-- steps for order -->

                <ul class="steps" v-if="orderStatus !== 2 && orderStatus !== 3 && !loading">
                    
                    <li :class="{ 'step-item': true, 'active': orderStatus == 1 || orderStatus == 4 }">
                        <div class="icon-done">
                        <i class="fas fa-check icon"></i>
                        </div>
                        <span class="progress-label"> {{ $t("Order.inspection_underway") }} </span>
                    </li>
                    
                    <li :class="{ 'step-item': true, 'active': orderStatus == 4 }">
                        <div class="icon-done">
                        <i class="fas fa-check icon"></i>
                        </div>
                        <span class="progress-label">{{ $t("Order.rented") }}</span>
                    </li>

                </ul>

                <div class="d-flex align-items-center justify-content-center mb-5" v-if="loading">
                    <skeleton shape="circle" size="2rem" class="customer-img" />
                    <skeleton width="300px" height="10px"/>
                    <skeleton shape="circle" size="2rem" class="customer-img" />
                </div>


                <!-- show this element , if order is canceled -->

                <h4 class="main-title normal mb-5 bg-red cancled" v-if="orderStatus == 3 || orderStatus == 2">
                    <span v-if="orderStatus == 3">{{ $t("Order.order_cancelled") }}</span>
                    <span v-if="orderStatus == 2">{{ $t("Order.time_limit") }}</span>
                </h4>



                <h1 class="main-title normal mb-4">{{ $t("Order.order_details") }}</h1>



                <div class="info mb-5">

                    <div class="item-details">
                        <h6 class="text">{{ $t("Global.order_number") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.order_num }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>
                    
                    <div class="item-details">
                        <h6 class="text">{{ $t("Global.received_date") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.receive_date }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("Global.return_date") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.return_date }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("Order.delivery_location") }}</h6>
                        <h6 class="text pointer decoration" v-if="!loading" @click="openMapModal">
                            <img src="@/assets/images/marker.png" loading="lazy" alt="marker-icon" class="marker-icon">
                            {{ orderData.map_desc.map_desc }}
                        </h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details" v-if="user.type == 1 || user.type == 2">
                        <h6 class="text">{{ $t("Global.car_count") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.quantity }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("Order.order_date") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.created_at }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>

                    <div class="item-details">
                        <h6 class="text">{{ $t("Order.name_vehicle") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.car_name }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>
                    
                </div>
                
                <h3 class="main-title normal mb-4">{{ $t("Cars.reservation_details") }}</h3>

                <div class="info mb-5">
                    <div class="item-details">
                        <h6 class="text">{{ $t("Global.rental_type") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.rental_type }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>
    
                    <div class="item-details">
                        <h6 class="text">{{ $t("Global.rental_period") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.duration }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>
    
                    <div class="item-details">
                        <h6 class="text">{{ $t("Order.cost_day") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.daily_cost }} {{ $t("Global.rs") }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>
    
                    <div class="item-details">
                        <h6 class="text">{{ $t("Order.booking_cost") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.booking_cost }} {{ $t("Global.rs") }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>
    
                    <div class="item-details">
                        <h6 class="text">{{ $t("Cars.rental_car") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.car_rental }} {{ $t("Global.rs") }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>
    
                    <div class="item-details">
                        <h6 class="text">{{ $t("Cars.rental_after_discount") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.price_after_discount }} {{ $t("Global.rs") }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>
    
                    <div class="item-details">
                        <h6 class="text">{{ $t("Cars.Value_Added") }}</h6>
                        <h6 class="text" v-if="!loading">{{ orderData.vat_amount }} {{ $t("Global.rs") }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                    </div>
                </div>

                <h3 class="main-title normal mb-4">{{ $t("Order.choose_payment") }}</h3>

                <div class="info mb-5">
                    <div class="item-details">

                        <h6 class="text" v-if="!loading">{{ orderData.pay_type }}</h6>
                        <skeleton v-if="loading" width="100px" height="10px"/>
                        <i class="fas fa-wallet payment_icon" style="margin-inline-start: auto"></i>
                    </div>
                </div>

                <h3 class="main-title normal mb-4">{{ $t("Order.branch") }}</h3>

                <div class="info mb-5 ">
                    <div class="branch">
                        <img :src="orderData.branch?.image" v-if="!loading" alt="branch_image" class="branch_image">
                        <skeleton v-if="loading" width="100px" height="100px"/>
                        <div class="flex-grow-1">
                            <div class="item-details">
                                <h6 class="text" v-if="!loading">{{ orderData.branch?.name }}</h6>
                                <skeleton v-if="loading" width="100px" height="10px"/>
                            </div>
                            <div class="item-details">
                                <div class="text d-flex align-items-center gap-2" v-if="!loading">
                                    <i class="fas fa-mobile-alt"></i> {{ orderData.branch?.phone }}
                                </div>
                                <skeleton v-if="loading" width="100px" height="10px"/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

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
            :title= "$t('Order.location')"
        />
    
    </div>

</template>


<script setup>

definePageMeta({
        middleware: 'auth',
        name: "Order.order_details",
    })

    import { useI18n } from 'vue-i18n';
    const { t } = useI18n({ useScope: 'global' });

    const { id } = useRoute().params;
    
    // response
    const { response } = responseApi();
    
    // axios
    const axios = useApi();
    
    const loading = ref(true);
    const orderData = ref({});
    
    const orderStatus = ref(0);
    
    const closeModal_btn = ref(true);
    const AutoComplete = ref(true);
    const submit_location = ref(true);
    const visible = ref(false);

    const lat = ref(null);
    const lng = ref(null);
    
    const openMapModal = () => {
        visible.value = true;
    };
    const handleClose = () => {
        visible.value = false;
    };
    
    // pinia store
    const store = useAuthStore();

    // token
    const { token, user, order_enquiry_data } = storeToRefs(store);
    
    const errors = ref([]);

    // config
    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

        // get order-details data
    const orderDetails = async () => {
        loading.value = true;
        await axios.get(`order-details?order_id=${id}`, config).then(res => {
            if (response(res) == "success") {
                orderData.value = res.data.data;
                lat.value = Number(res.data.data.map_desc.lat);
                lng.value = Number(res.data.data.map_desc.lng);
                orderStatus.value = res.data.data.status;
            }
            loading.value = false;
        }).catch(err => console.log(err));
    };

    onMounted(() => {
        orderDetails();
    });

</script>

<style lang="scss" scoped>
    .marker-icon {
        width: 13px;
        height: 20px;
        object-fit: contain;
        margin-inline-end: 5px
    }
    .branch {
        display: flex;
        align-items: start;
        .branch_image {
            width: 110px;
            height: 95px;
            object-fit: cover;
            border-radius: 5px;
        }
    }

    .cancled {
        text-align: center;
        padding: 15px;
        color: #fff;
        border-radius: 2px;
    }
</style>

