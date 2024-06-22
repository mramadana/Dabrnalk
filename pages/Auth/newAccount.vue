<template>
    <div>
        <!-- Banner component  -->
        <GlobalAuthBanner>
            <div class="container">
                <div class="layout-form custom-width">
                    <h1 class="main-title bold lg mb-4">{{ $t("Auth.create_account") }}</h1>
                    <form @submit.prevent="singUp" ref="singUpForm">
                        <div class="row">
                            <div class="col-12 col-md-10 mr-auto">
                                <div class="text-center mb-5">
                                    <img src="@/assets/images/f-password.png" loading="lazy" alt="restore-image" class="restore-image">
                                </div>
                                <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.mobile_number') }}
                                        </label>
                                        <div class="with_cun_select">
                                            <div class="main_input">
                                                <i class="fas fa-mobile-alt sm-icon"></i>
                                                <input type="number" class="custum-input-icon validInputs" valid="phone" name="phone" :placeholder="$t('Auth.please_mobile_number')">
                                            </div>
                                            <div class="card d-flex justify-content-center dropdown_card">
                                            <Dropdown
                                            v-model="selectedCountry"
                                            :options="countries"
                                            filter
                                            optionLabel="name"
                                            :emptyMessage="$t('Home.no_available_options')"
                                            :emptyFilterMessage="$t('Home.emptyFilterMessage')"
                                            >
                                            <template #value="slotProps">
                                                <div v-if="slotProps.value" class="flex-group-me">
                                                <img
                                                    loading="lazy"
                                                    :alt="slotProps.value.label"
                                                    :src="slotProps.value.image"
                                                    :class="`mr-2 flag flag-${slotProps.value.key}`"
                                                    style="width: 24px"
                                                />
                                                <div>{{ slotProps.value.key }}</div>
                                                </div>
                                                <span v-else>
                                                {{ slotProps.placeholder }}
                                                </span>
                                            </template>
                                            <template #option="slotProps">
                                                <div class="flex-group-me">
                                                <img
                                                    loading="lazy"
                                                    :alt="slotProps.option.label"
                                                    :src="slotProps.option.image"
                                                    :class="`mr-2 flag flag-${slotProps.option.key}`"
                                                    style="width: 24px"
                                                />
                                                <div>{{ slotProps.option.name }}</div>
                                                <div>{{ slotProps.option.key }}</div>
                                                </div>
                                            </template>
                                            </Dropdown>
                                            </div>
                                        </div>
                                </div>
        
                                <button type="submit" class="custom-btn w-100 mr-auto" :disabled="loading">
                                    {{ $t('Auth.confirmation') }}
                                    <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                                            aria-hidden="true"></span>
                                </button>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </GlobalAuthBanner>
    </div>
</template>

<script setup>

import { useI18n } from 'vue-i18n';

definePageMeta({
    name: "Titles.create_account",
})

const { t } = useI18n({ useScope: 'global' });

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Axios
const axios = useApi();


// Store
const store = useAuthStore();

const { signUpHandler } = store;


const loading = ref(false);
const errors = ref([]);

const selectedCountry = ref({})
const countries = ref([]);
const singUpForm = ref(null);

// validation Function
const validate = () => {
    let allInputs = document.querySelectorAll('.validInputs');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            errors.value.push(t(`validation.${allInputs[i].getAttribute('valid')}`));
        }
    }
}

//  Get All countries
const getCountries = async () => {
    await axios.get('countries').then(res => {
        if (response(res) == "success") {
            countries.value = res.data.data;
            for (let i = 0; i < countries.value.length; i++) {
                if (countries.value[i].id == 1) {
                    selectedCountry.value = countries.value[i];
                }
            }
        }
    }).catch(err => console.log(err));
};

onMounted(async () => {
    await getCountries();
});

    // login Function
const singUp = async () => {
    loading.value = true;
    const fd = new FormData(singUpForm.value);
    fd.append('country_code', selectedCountry.value.key);
    fd.append('device_id', 111);
    fd.append('device_type', 'web');
    fd.append('type', 0);
    if (localStorage.getItem('lang') == null) {
        fd.append('lang', 'ar');
    } else {
        fd.append('lang', localStorage.getItem('lang'));
    }


    // fd.append('device_id', notificationToken.value);

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {

        loading.value = true;

        // Get Returned Data From Store
        const res = await signUpHandler(fd);
        res.status == "success" ? successToast(res.msg) : errorToast(res.msg);

        loading.value = false;
    }
}

</script>