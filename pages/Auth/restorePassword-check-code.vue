<template>
    <div>
        <GlobalAuthBanner>
            <div class="container">
                <div class="layout-form custom-width">
                    <h1 class="main-title bold lg mb-4">{{ $t("Auth.activation_code") }}</h1>
                    <form @submit.prevent="verificationCode">
                        <div class="row">
                            <div class="col-12 col-md-8 mr-auto">
                                <div class="text-center mb-5">
                                    <p class="main-title">{{ $t("Auth.please_enter_activation_code") }}</p>
                                </div>
        
                                <div class="layout-activate d-flex" dir="ltr">
                                    <v-otp-input
                                    ref="otpInput"
                                    v-model:value="bindModal"
                                    input-classes="otp-input"
                                    separator=" "
                                    :num-inputs="4"
                                    :should-auto-focus="true"
                                    :is-input-num="true"
                                    />
                                </div>
        
                                <button type="submit" class="custom-btn w-100 mr-auto" :disabled="loading">
                                   {{ $t('Auth.verification') }}
                                   <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
                                   </button>
        
                                <div class="new-sign mt-4">
                                    {{ $t('Auth.havent_received_code') }}
                                    <button type="button" @click="resendCode" :disabled="countStatus" :class="{'disabledClass' : countStatus}">{{ $t('Auth.resend_code') }}</button>
                                </div>
        
                                <div class="text-center mt-3 main-cl" v-if="countStatus">
                                   <span>{{ countDown }} </span> : <span>00</span> 
                                </div>
        
        
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </GlobalAuthBanner>
    </div>
</template>

<script setup>


definePageMeta({
  name: "Auth.activation_code",
//   middleware: 'auth'
});


const countStatus = ref(false);
const countDown = ref(60);

const countDownTimer = () => {
    countStatus.value = true;
    if (countDown.value > 0) {
        setTimeout(() => {
            countDown.value -= 1;
            countDownTimer();
        }, 1000);
    } else {
        // Hide the countdown when countDown reaches 0
        countStatus.value = false; 
        countDown.value = 60;
    }
};


/******************* Import *******************/


import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

// OTP
import VOtpInput from "vue3-otp-input";

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Axios
const axios = useApi();

// pinia store
import { useAuthStore } from '~/stores/auth';

/******************* Data *******************/

// Store
const store = useAuthStore();

const {user} = storeToRefs(store);

const loading = ref(false);

const bindModal = ref("");

// verificationCode Function
const verificationCode = async () => {
    loading.value = true;
    const fd = new FormData();
    fd.append('code', bindModal.value);
    fd.append('phone', user.value.phone);
    fd.append('country_code', user.value.country_code);
    await axios.post("forget-password-check-code", fd).then(res => {
        if (response(res) == "success") {
              navigateTo('/Auth/confirmPassword');
              localStorage.setItem('newCode', bindModal.value);
        } else {
            errorToast(res.data.msg)
        }
        loading.value = false;
    }).catch(err => console.log(err));
}

//  resendCode Function
const resendCode = async () => {
    await axios.get(`forget-password-resend-code?country_code=${user.value.country_code}&phone=${user.value.phone}`).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            countStatus.value = true;
            countDownTimer();
        } else {
            errorToast(res.data.msg);
        }
    }).catch(err => console.log(err));
}

onMounted(() => {
    countDownTimer();
});

</script>


