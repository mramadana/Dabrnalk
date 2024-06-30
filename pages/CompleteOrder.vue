<template>
    <div>
        <div class="container">

            <div class="row justify-content-center">

                <div class="col-12 col-md-8 mb-5">

                    <h1 class="main-title bold normal mb-4">{{ $t("Cars.reservation_details") }}</h1>

                    <div class="info mb-4">

                        <div class="item-details" v-if="user.type == 2 || user.type == 1">
                            <h6 class="text">{{ $t("Global.car_count") }}</h6>
                            <h6 class="text">{{ order_enquiry_data.cars_count }}</h6>
                        </div>

                        <div class="item-details">
                            <h6 class="text">{{ $t("Global.rental_type") }}</h6>
                            <h6 class="text">{{ order_enquiry_data.rental_type }}</h6>
                        </div>

                        <div class="item-details">
                            <h6 class="text">{{ $t("Global.rental_period") }}</h6>
                            <h6 class="text">{{ order_enquiry_data.duration }}</h6>
                        </div>

                        <div class="item-details">
                            <h6 class="text">{{ $t("Cars.cost_day") }}</h6>
                            <h6 class="text">{{ order_enquiry_data.daily_cost }}</h6>
                        </div>

                        <div class="item-details">
                            <h6 class="text">{{ $t("Cars.booking_cost") }}</h6>
                            <h6 class="text">{{ order_enquiry_data.booking_cost }}</h6>
                        </div>

                        <div class="item-details">
                            <h6 class="text">{{ $t("Cars.rental_car") }}</h6>
                            <h6 class="text">{{ order_enquiry_data.car_rental }}</h6>
                        </div>

                        <div class="item-details">
                            <h6 class="text">{{ $t("Cars.rental_after_discount") }}</h6>
                            <h6 class="text">{{ order_enquiry_data.price_after_discount }}</h6>
                        </div>
                    
                        <div class="item-details">
                            <h6 class="text">{{ $t("Cars.Value_Added") }}</h6>
                            <h6 class="text">{{ order_enquiry_data.vat_amount }}</h6>
                        </div>
                    </div>

                    <h2 class="main-title bold normal mb-4">{{ $t("Cars.choose_payment") }}</h2>

                    <div class="info mb-5">

                        <div class="item-details">
                            <label class="custom-radio custom-check">
                                <input type="radio" name="opinion" value="2" v-model="pay_type" class="d-none">
                                <span class="mark">
                                    <i class="fas fa-check icon"></i>
                                </span>
                                <p class="hint">{{ $t('Cars.wallet') }}</p>
                            </label>

                            <i class="fas fa-wallet payment_icon"></i>
                        </div>

                        <div class="item-details">
                            <label class="custom-radio custom-check">
                                <input type="radio" name="opinion" value="4" v-model="pay_type" class="d-none">
                                <span class="mark">
                                    <i class="fas fa-check icon"></i>
                                </span>
                                <p class="hint">{{ $t('Cars.electronic_payment') }}</p>
                            </label>

                            <i class="far fa-credit-card payment_icon"></i>
                        </div>
                    </div>

                    <button type="button" class="custom-btn md mr-auto" @click="create_order">
                        {{ $t('Cars.complete_order') }}
                        <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
                    </button>

                </div>
            </div>
            
        </div>

        <Dialog v-model:visible="completed_successfully" modal class="custum_dialog_width without-close" :draggable="false">
                <div class="text-center">
                    <img src="@/assets/images/check.png" loading="lazy" alt="check-img" class="check-img">

                    <h3 class="main-title bold mb-3">
                        {{ $t('Global.order_completed_successfully') }}
                    </h3>

                    <p class="main-disc mb-3">{{ $t('Global.provider_reservation_details') }}</p>

                    <div>
                        <div class="social-icon mb-2" v-if="provider_phone?.length">
                            <i class="fas fa-phone-alt"></i>
                            <p class="decoration">{{ provider_phone }}</p>
                        </div>
    
                        <div class="social-icon mb-2" v-if="provider_address?.length">
                            <i class="fas fa-map-marker-alt"></i>
                            <p class="decoration">{{ provider_address }}</p>
                        </div>

                    </div>

                    <nuxt-link to="/" class="custom-btn mt-4 mr-auto md">{{ $t('Home.home') }}</nuxt-link>
                </div>
        </Dialog>

    </div>
</template>

<script setup>

    definePageMeta({
        name : "Titles.complete_order",
        middleware: 'auth'
    });


    // pinia store
    const store = useAuthStore();

    // get carDetails from Store
    const { order_enquiry_data, user, token } = storeToRefs(store);

    // variables

    const provider_phone = ref('');

    const provider_address = ref('');

    const completed_successfully = ref(false);

    const pay_type = ref('');

    const errors = ref([]);

    const loading = ref(false);

    // axios
    const axios = useApi();

    // response
    const { response } = responseApi();

    
    // Toast
    const { successToast, errorToast } = toastMsg();
    import { useI18n } from 'vue-i18n';
    const { t } = useI18n({ useScope: 'global' }); 

    // config
    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

    // validation
    const validate = () => {

        if (!pay_type.value) {
            errors.value.push(t('validation.pay_type'));
        }

    }

    const create_order = async () => {
        loading.value = true;
        const fd = new FormData();
        fd.append('car_id', localStorage.getItem('car_id'));
        fd.append('pay_type', pay_type.value);
        fd.append('duration', order_enquiry_data.value.duration);
        fd.append('quantity', order_enquiry_data.value.cars_count);

        const orderEnquirystorage = localStorage.getItem('formData_enquiry');
        if(orderEnquirystorage) {
            const storedData = JSON.parse(orderEnquirystorage);
            fd.append('receive_date', storedData.order_receive_date);
            fd.append('rental_type', storedData.order_rental_type);
            fd.append('copon', storedData.order_copon);
        }
        validate();

        if (errors.value.length) {
            errorToast(errors.value[0]);
            loading.value = false;
            errors.value = [];

        } else {
            await axios.post("create-order", fd, config).then(res => {
                if (response(res) == "success") {
                    successToast(res.data.msg);
                    completed_successfully.value = true;
                    pay_type.value = '';
                    provider_phone.value = res.data.data.provider_phone;
                    provider_address.value = res.data.data.provider_address;
                    // navigateTo('/Orders/orderDetails/' + res.data.data.id);
                } else {
                    errorToast(res.data.msg)
                }
            })

        }

        loading.value = false;
    }

</script>

<style lang="scss" scoped>
    .payment_icon {
        font-size: 20px;
    }

    .social-icon {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #02BC7D;
        font-size: 15px;
        justify-content: center;
    }
</style>