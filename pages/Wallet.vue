<template>
    <div class="container">
        <div class="layout-form">
            <h1 class="main-title bold lg mb-5 text-center">{{ $t("Home.portfolio") }}</h1>
            <div class="row flex-wrap-reverse">

                <div class="col-12 col-md-5 mb-5">
                    <div class="text-center mb-5">

                        <div class="wallet-side mb-3">
                            <img src="@/assets/images/Wallet-bro.png" alt="wallet-img" class="wallet-img" loading="lazy">
                            <h4 class="main-disc mb-3 color-wh">{{ $t("Global.current_balance") }}</h4>
                            <h4 class="main-title color-wh normal" v-if="!loading"> {{ walletValue }} {{ $t("Global.rs") }}</h4>

                            <div class="d-flex align-items-center justify-content-center mt-3 mb-3" v-if="loading">
                                <Skeleton height=".9rem" width="4rem"></Skeleton>
                            </div>
                        </div>

                    </div>
                    <button type="button" @click="successfullySent = true"  class="custom-btn w-100 mr-auto">
                         {{ $t('Global.charge_balance') }} 
                    </button>
                </div>
                
                <div class="col-12 col-md-7 text-center mb-5">
                    <img src="@/assets/images/wallet-pana.png" alt="wallet-image" class="profile-image w-100" loading="lazy">
                </div>
                
            </div>
        </div>

        <Dialog v-model:visible="successfullySent" modal class="custum_dialog_width" :draggable="false" >

            <h4 class="main-title mb-4 text-center">{{ $t('Global.shipping_value') }}</h4>
            <div class="form-group">
                <label class="label">
                    {{ $t('Global.shipping_value') }}
                </label>
                <div class="main_input">
                    <input type="text" class="custum-input-icon" name="amount" v-model="amount" :placeholder="$t('Global.enter_shipping_value')">
                </div>
            </div>

            <div class="payment-items input-g">
    
                <div class="payment-item mb-3" v-for="(pay, i) in paymentItems" :key="pay.id">

                    <input type="radio" name="pay_type" :value="pay.id" v-model="payment"
                        :id="`payment${i}`" class="payment-input">
                    <label :for="`payment${i}`" class="payment-label">

                        <div class="right">
                            <img :src="pay.image" alt="img-payment" class="payment-img" loading="lazy">
                            <div class="content">
                                <div class="name">{{ pay.name }}</div>
                            </div>
                        </div>

                        <div class="circle"></div>

                    </label>

                </div>

            </div>

            <button type="button" @click="chargeWallet" class="custom-btn w-100 mr-auto">
                {{ $t('Global.send') }} 
                <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
            </button>
        </Dialog>
    </div>
</template>

<script setup>

    definePageMeta({
        name: "Home.portfolio",
        middleware: 'auth'
    })

    import { useI18n } from 'vue-i18n';
    const { t } = useI18n({ useScope: 'global' });

    const amount = ref('');

    const successfullySent = ref(false);

    const walletValue = ref('');

   const redirectUrl = ref(null);

    // Store
    const store = useAuthStore();
    const { token } = storeToRefs(store);

    // loading
    const loading = ref(true);

    // success response
    const { response } = responseApi();

    // Toast
    const { successToast, errorToast } = toastMsg();

    // Axios
    const axios = useApi();

    // config
    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

    const paymentItems = ref([]);

    const payment = ref('');

    // get wallet
    const getWallet = async () => {
        await axios.get(`show-wallet`, config).then(res => {
        if (response(res) == "success") {
            walletValue.value = res.data.data.available_balance;
            console.log(res.data.data.available_balance);
        }
        loading.value = false;
        }).catch(err => {
            console.error(err);
        });
    };

        // get wallet
    // const getBrand = async () => {
    //     await axios.get(`payment-brands`, config).then(res => {
    //     if (response(res) == "success") {
    //         paymentItems.value = res.data.data;
    //     }
    //     loading.value = false;
    //     }).catch(err => {
    //         console.error(err);
    //     });
    // };

    const chargeWallet = async () => {
        loading.value = true;
        const fd = new FormData();
        fd.append('amount', amount.value);
        // fd.append('brand_id', payment.value);
        if (amount.value == '') {
            errorToast(t(`Global.enter_shipping_value`));
            loading.value = false;
        } else if (amount.value <= 0) {
            errorToast(t(`Global.enter_shipping_value`));
            amount.value = null;
            loading.value = false;
        } else {

            await axios.post(`charge-wallet`, fd, config).then(res => {
                if (response(res) == "success") {
                    amount.value = null;
                    successfullySent.value = false;
                    redirectUrl.value = res.data.data.redirect_url;
                    window.open(redirectUrl.value, '_blank');
                    console.log(redirectUrl.value);
                    getWallet();
                    successToast(res.data.msg);
                } else {
                    errorToast(res.data.msg);
                }
                loading.value = false;
            }).catch(err => {
                console.error(err);
            });
        }
        
    };

    onMounted(() => {
        getWallet();
        // getBrand();
    })
</script>

<style lang="scss" scoped>
    .wallet-side {
        background: transparent linear-gradient(292deg, #000000 0%, #484848 100%) 0% 0% no-repeat padding-box;
        border-radius: 3px;
        padding: 20px;
        .wallet-img {
            height: 115px;
            width: 115px;
            margin-bottom: 20px;
        }
    }
</style>


<style lang="scss">

    .payment-items {
     margin-bottom: 20px;
    .payment-item {
        .payment-input {
        display: none;
        }

        .payment-label {
        padding: 10px 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #F8F8F8;
        cursor: pointer;
        border-radius: 12px;
        border: 1px solid transparent;
        transition: all 0.4s ease;
        font-size: 13px;
        .right {
            display: flex;
            align-items: center;
            gap: 14px;

            .payment-img {
            max-width: 30px;
            max-height: 30px;
            }

            .name {
            color: #000;
            display: block;
            }

            .text {
            color: #000;
            font-size: 12px;
            text-align: start;
            }
        }

        .circle {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border: 1px solid var(--main);
            opacity: 0;
            position: relative;
            transition: all 0.4s ease;

            &::after {
            content: "";
            height: 6px;
            width: 10px;
            border-left: 3px solid var(--main);
            border-bottom: 3px solid var(--main);
            border-radius: 1px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -60%) rotate(-45deg);
            transform-origin: center center;
            }
        }
        }
    }
    }

    .payment-item .payment-input:checked + .payment-label {
    background-color: #fff;
    border-color: var(--main);
    }

    .payment-item .payment-input:checked + .payment-label .circle {
    opacity: 1;
    }

    .payment-item .payment-input:checked + .payment-label {
        background-color: rgba(224, 148, 65, .2);
    border-color: transparent;
    }

    @media screen and (max-width: 425px) {
    .payment-item {
        width: 100%;
    }

    .payment-item .payment-label {
        padding: 18px 14px;
        width: 100%;
    }

    .payment-item .payment-label .right .name {
        font-size: 15px;
    }
    }
</style>