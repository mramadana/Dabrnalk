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

    const chargeWallet = async () => {
        loading.value = true;
        const fd = new FormData();
        fd.append('amount', amount.value);
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