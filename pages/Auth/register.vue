<template>
    <div class="container">
        <div class="layout-form custom-width">
            <h1 class="main-title bold lg mb-5">{{ $t("Auth.create_account") }}</h1>
            <form @submit.prevent="signUp" ref="signUpForm">
                <div class="row">
                    <div class="col-12 col-md-8 mr-auto">

                        <div class="form-group text-center">
                            <div class="input_auth">
                                <div class="edit-label">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <img src="@/assets/images/upload_layout.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                <GlobalImgUploader acceptedFiles="image/*" :newImages="logo" name="image" @uploaded-images-updated="updateUploadedImages_1" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.username') }}
                                <span class="hint-red">*</span>
                            </label>
                            <div class="main_input">
                                <i class="fas fa-user sm-icon"></i>
                                <input type="text" class="custum-input-icon validInputs" valid="name" name="name" v-model="name" :placeholder="$t('Auth.enter_username')">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.mobile_number') }}
                                <span class="hint-red">*</span>
                            </label>
                            <div class="with_cun_select">
                                <div class="main_input">
                                    <i class="fas fa-mobile-alt sm-icon"></i>
                                    <input type="number" class="custum-input-icon validInputs" valid="phone" name="phone" v-model="phone" :placeholder="$t('Auth.please_mobile_number')">
                                </div>
                                <div class="card d-flex justify-content-center dropdown_card">
                                <Dropdown
                                v-model="selectedCountry"
                                :options="countries"
                                optionLabel="name"
                                >
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex-group-me">
                                    <img
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

                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.email') }}
                                <span class="hint-red">*</span>
                            </label>
                            <div class="main_input">
                                <i class="fas fa-envelope sm-icon"></i>
                                <input type="email" class="custum-input-icon validInputs" valid="email" name="email" v-model="email" :placeholder="$t('Auth.please_enter_email')">
                            </div>
                        </div>

                        <div class="form-group">
                                <label class="label">
                                    {{ $t('Auth.password') }}
                                    <span class="hint-red">*</span>
                                </label>
                                <div class="main_input with_icon">
                                    <i class="fas fa-lock sm-icon"></i>
                                    <input :type="inputType('definitelyNewPassword')" name="password" v-model="password" class="custum-input-icon validInputs" valid="password" :placeholder=" $t('Auth.please_enter_password') ">
                                    <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility('definitelyNewPassword')" :class="{ 'active_class': passwordVisible.definitelyNewPassword }">
                                    <i class="far fa-eye icon"></i>
                                    </button>
                                </div>
                        </div>

                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.confirm_password_sm') }}
                                <span class="hint-red">*</span>
                            </label>
                            <div class="main_input with_icon">
                                <i class="fas fa-lock sm-icon"></i>
                                <input :type="inputType('definitelyNewPassword_2')" name="password_confirmation" v-model="confirmPassword" class="custum-input-icon validInputs"  :placeholder=" $t('Auth.please_confirm_password') ">
                                <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility('definitelyNewPassword_2')" :class="{ 'active_class': passwordVisible.definitelyNewPassword_2 }">
                                <i class="far fa-eye icon"></i>
                                </button>
                            </div>
                        </div>

                        <div class="radios form-group check-inner mb-4">
                            <div class="d-flex gap-3">
                                <label class="custom-radio custom-check">
                                    <input type="checkbox" name="terms" v-model="terms" class="d-none">
                                    <span class="mark">
                                        <i class="fas fa-check icon"></i>
                                    </span>
                                    <p class="check-text hint">
                                    {{ $t("Auth.agree_to") }}
                                    <NuxtLink to="/terms" target="_blank" class="anchor">
                                        {{ $t("Auth.terms_and_conditions") }}
                                    </NuxtLink >
                                    </p>
                                </label>
                            </div>
                        </div>
                        
                        <button type="submit" class="custom-btn w-100 mr-auto" :disabled="loading">
                            {{ $t('Auth.confirmation') }}
                            <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                                    aria-hidden="true"></span>
                        </button>

                        <div class="new-sign mt-4">
                            {{ $t('Auth.already_have_account') }}
                            <nuxt-link to="/Auth/login" >{{ $t('Auth.login') }}</nuxt-link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>

    definePageMeta({
        name: "Auth.create_account",
    });

    import { useI18n } from 'vue-i18n';

    const { t } = useI18n({ useScope: 'global' });

    // success response
    const { response } = responseApi();

    // Toast
    const { successToast, errorToast } = toastMsg();

    // Axios
    const axios = useApi();
    const phone = ref(null);

    // Store
    const store = useAuthStore();
    const { signUpHandler } = store;
    const signUpForm = ref(null);
    const selectedCountry = ref({})
    const countries = ref([]);
    const uploadedImage = ref([]);
    const errors = ref([]);
    const loading = ref(false);
    const terms = ref(false);
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const passwordVisible = ref({
        definitelyNewPassword: false,
        definitelyNewPassword_2: false
    });

    const updateUploadedImages_1 = (images) => {
        uploadedImage.value = images;
    };

    const togglePasswordVisibility = (input) => {
        passwordVisible.value[input] = !passwordVisible.value[input];
    };

    const inputType = (input) => {
        return passwordVisible.value[input] ? 'text' : 'password';
    }

    // // Get All countries
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

    // Validation Function
    function validate() {
        let allInputs = document.querySelectorAll('.validInputs');
        for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i].value === '') {
                errors.value.push(t(`validation.${allInputs[i].name}`));
            }
        }

        if (password.value !== confirmPassword.value) {
            errors.value.push(t(`validation.confirmPassword`));
        }

        if (!terms.value) {
            errors.value.push(t(`validation.conditions`));
        }

        if(phone.value == 0) {
            phone.value = null
        }
    };

    // signUp Function
    const signUp = async () => {
        const fd = new FormData(signUpForm.value);
        fd.append('country_code', selectedCountry.value.key);

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
    };

    onMounted(async () => {
        await getCountries();
    });

</script>