<template>
    <div class="container">
        <div class="layout-form custom-width">
            <h1 class="main-title bold lg mb-5">{{ $t("Auth.restore_password") }}</h1>
            <form @submit.prevent="forgetPassword" ref="forgetForm">
                <div class="row">
                    <div class="col-12 col-md-8 mr-auto">
                        <div class="text-center mb-5">
                            <img src="@/assets/images/restore-image.svg" loading="lazy" alt="restore-image" class="restore-image mb-4">
                            <p class="main-title">{{ $t("Auth.Please_enter_mobile_number") }}</p>
                        </div>

                        <div class="form-group mb-5">
                            <label class="label">
                                {{ $t('Auth.mobile_number') }}
                                <span class="hint-red">*</span>
                            </label>
                            <div class="with_cun_select">
                                <input type="number" class="main_input" name="phone" v-model="phone" :placeholder="$t('Auth.mobile_number')">
                                <div class="card d-flex justify-content-center dropdown_card">
                                <Dropdown
                                v-model="selectedCountry"
                                :options="countries"
                                optionLabel="name"
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
                                    <div>{{ slotProps.option.key }}</div>
                                    </div>
                                </template>
                                </Dropdown>
                                </div>
                            </div>
                        </div>
                        <button type="submit" class="custom-btn w-100 mr-auto"> 
                            {{ $t('Auth.confirmation') }} 
                            <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
    name: "Auth.restore_password",
});

/******************* Plugins *******************/
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n({ useScope: 'global' });

// success response
const { response } = responseApi();

// Toast
const { successToast, errorToast } = toastMsg();

// Axios
const axios = useApi();

// pinia store
import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';

/******************* Data *******************/

// Store
const store = useAuthStore();
const { user } = storeToRefs(store);

// success response

const forgetForm = ref(null);
const phone = ref('');
const loading = ref(false);
const router = useRouter();
const errors = ref([]);

// countries
const selectedCountry = ref({});
const countries = ref([]);

/******************* Provide && Inject *******************/

/******************* Props *******************/

/******************* Methods *******************/

// Get All countries
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
}

// validate Func
function validate() {
    let allInputs = document.querySelectorAll('.validInputs');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].value === '') {
            errors.value.push(t(`validation.${allInputs[i].name}`));
        }
    }
}

// forgetPassword Function
const forgetPassword = async () => {
    loading.value = true;
    const fd = new FormData(forgetForm.value);
    fd.append('country_code', selectedCountry.value.key);

    validate();

    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {

        await axios.post('forget-password-send-code', fd).then(res => {
            if (response(res) == "success") {
                user.value.phone = phone.value;
                user.value.country_code = selectedCountry.value.key;

                successToast(res.data.msg);
                navigateTo('/Auth/restorepassword-check-code');

            } else {
                errorToast(res.data.msg);
            }
            loading.value = false;
        }).catch(err => console.log(err));

    }
}

/******************* Computed *******************/

/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () =>{
    await getCountries();
})
</script>

