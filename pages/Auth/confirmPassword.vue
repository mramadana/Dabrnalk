<template>
    <div>
        <GlobalAuthBanner>
        <div class="container">
            <div class="layout-form custom-width">
                <h1 class="main-title bold lg mb-5">{{ $t("Auth.restore_password") }}</h1>
                <form @submit.prevent="submitData" ref="confirmPasswordForm">
                    <div class="row">
                        <div class="col-12 col-md-8 mr-auto">
                            <div class="text-center mb-5">
                                <img src="@/assets/images/Reset-password-pana.png" loading="lazy" alt="restore-image" class="restore-image">
                            </div>
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Auth.new_password') }}
                                </label>
                                <div class="main_input with_icon">
                                    <input :type="inputType('definitelyNewPassword')" name="password" v-model="password" class="custum-input-icon validInputs" :placeholder=" $t('Auth.please_enter_password') ">
                                    <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility('definitelyNewPassword')" :class="{ 'active_class': passwordVisible.definitelyNewPassword }">
                                    <i class="far fa-eye icon"></i>
                                    </button>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Auth.definitely_new_password') }}
                                </label>
                                <div class="main_input with_icon">
                                    <input :type="inputType('definitelyNewPassword_2')" name="password_confirmation" v-model="confirmPassword" class="custum-input-icon validInputs" :placeholder=" $t('Auth.please_confirm_password') ">
                                    <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility('definitelyNewPassword_2')" :class="{ 'active_class': passwordVisible.definitelyNewPassword_2 }">
                                    <i class="far fa-eye icon"></i>
                                    </button>
                                </div>
                            </div>

                            <button class="custom-btn w-100 mr-auto">
                                {{ $t('Auth.confirmation') }}
                                <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
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
    definePageMeta({
        name: "Auth.new_password",
    });

    const { t } = useI18n({ useScope: 'global' });
    import { useI18n } from 'vue-i18n';
    const errors = ref([]);
    const password = ref('');
    const confirmPassword = ref('');
    const { response } = responseApi();
    const { successToast, errorToast } = toastMsg();
    const axios = useApi();
    const store = useAuthStore();
    const { user } = storeToRefs(store);
    const loading = ref(false);
    const confirmPasswordForm = ref(null);
    const passwordVisible = ref({
        definitelyNewPassword: false,
        definitelyNewPassword_2: false
    });

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
            console.log(password.value, "password");
            console.log(confirmPassword.value, "confirmPassword");
        }
    }

    const inputType = (input) => {
        return passwordVisible.value[input] ? 'text' : 'password';
    };

    const togglePasswordVisibility = (input) => {
        passwordVisible.value[input] = !passwordVisible.value[input];
    };

    const submitData = async () => {
    const fd = new FormData(confirmPasswordForm.value);
    fd.append('phone', user.value.phone);
    fd.append('country_code', user.value.country_code);
    fd.append('code', localStorage.getItem('newCode'));
    validate();
    if (errors.value.length) {
        errorToast(errors.value[0]);
        loading.value = false;
        errors.value = [];
    } else {
        loading.value = true;
        await axios.post("reset-password", fd).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            navigateTo('/Auth/login');
        } else {
            errorToast(res.data.msg)
        }
        loading.value = false;
    }).catch(err => console.log(err));
    }
    };
</script>

