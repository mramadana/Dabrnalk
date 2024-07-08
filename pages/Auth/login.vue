<template>

    <div>
        <!-- Banner component  -->
        <GlobalAuthBanner>
            <div class="container">
                <div class="layout-form custom-width">
                    <h1 class="main-title bold lg mb-4">{{ $t("Auth.login") }}</h1>
                    <form @submit.prevent="login" ref="loginForm">
                        <div class="row">
                            <div class="col-12 col-md-10 mr-auto">

                                <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.mobile_number') }}
                                        </label>
                                        <div class="with_cun_select">
                                            <div class="main_input">
                                                <i class="fas fa-mobile-alt sm-icon"></i>
                                                <input type="number" class="custum-input-icon" v-model="phone" name="phone" @input="checkPhone" :placeholder="$t('Auth.please_mobile_number')">
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
                                <div class="form-group">
                                    <label class="label">
                                        {{ $t('Auth.password') }} 
                                    </label>
                                    <div class="main_input with_icon">
                                        <input :type="inputType" class="custum-input-icon validInputs" valid="password" name="password" v-model="password"
                                            :placeholder="$t('Auth.please_enter_password')">
                                        <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility"
                                            :class="{ 'active_class': passwordVisible }">
                                            <i class="far fa-eye icon"></i>
                                        </button>
                                    </div>
                                </div>
        
                                <nuxt-link to="restorePassword">
                                    <p class="f-password">{{ $t('Auth.forget_password') }}</p>
                                </nuxt-link>
        
                                <button type="submit" class="custom-btn w-100 mr-auto" :disabled="loading">
                                    {{ $t('Auth.login') }}
                                    <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                                            aria-hidden="true"></span>
                                </button>
        
                                <div class="new-sign mt-4">
                                    {{ $t('Auth.dont_have_account') }}
                                    <nuxt-link to="/Auth/newAccount" >{{ $t('Auth.create_account') }}</nuxt-link>
                                </div>

                                <div class="new-sign">
                                    {{ $t('Auth.problem_logging') }}
                                    <nuxt-link to="/connectUs" >{{ $t('Home.connect_us') }}</nuxt-link>
                                </div>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </GlobalAuthBanner>
        
        <!-- global google map component -->
        <GlobalGoogleMap
            v-model:visible="visible"
            @closeModal="closeModal"
            @updateAddress="handleUpdateAddress"
            @handleClose="handleClose"
            :show_inputs="show_inputs"
            :lat="location.lat"
            :lng="location.lng"
            :current_location="currentLocation"
            :isDraggable="true"
            :closeModal_btn="closeModal_btn"
            :title= "$t('Global.current_location')"
        />
    </div>

</template>

<script setup>

    import { useI18n } from 'vue-i18n';

    definePageMeta({
        name: "Auth.login",
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
    const { signInHandler } = store;

    const { lat, lng, address, token } = storeToRefs(store);

    // config
    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

    const loading = ref(false);
    const errors = ref([]);

    // google map
    const closeModal_btn = ref(false);

    const handleClose = () => {
        visible.value = false
    }

    // const address = ref("");

    // this function is used to get your current location and address
    const handleUpdateAddress = (newAddress) => {
        location.value = newAddress;
    };

    const currentLocation = ref(false);

    const openmodal = () => {
        visible.value = true;
        setTimeout(() => {
            currentLocation.value = true;
        }, 300);
    };

    const location = ref({
        lat: lat.value,
        lng: lng.value
    });
    
    const show_inputs = ref(false);
    const visible = ref(false);
    
    // countries
    const selectedCountry = ref({})
    const countries = ref([]);
    const loginForm = ref(null);
    const phone = ref('');
    const email = ref('');
    const password = ref('');
    const passwordVisible = ref(false);

    // validation Function
    const validate = () => {
        let allInputs = document.querySelectorAll('.validInputs');
        for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i].value === '') {
                errors.value.push(t(`validation.${allInputs[i].getAttribute('valid')}`));
            }
        }
    }

    const checkPhone = () => {
        if(phone.value !== '') {
           email.value = null
        }
    };


    // login Function
    const login = async () => {
        loading.value = true;
        const fd = new FormData(loginForm.value);
        if (localStorage.getItem('lang') == null) {
                fd.append('lang', 'ar');
            } else {
                fd.append('lang', localStorage.getItem('lang'));
            }
        fd.append('country_code', selectedCountry.value.key);
        fd.append('device_id', 111);
        fd.append('device_type', 'web');

        // fd.append('device_id', notificationToken.value);

        validate();

        if (errors.value.length) {
            errorToast(errors.value[0]);
            loading.value = false;
            errors.value = [];
        } else {

            loading.value = true;

            // Get Returned Data From Store
            const res = await signInHandler(fd);

            if (res.status == "success") {
                successToast(res.msg);
                openmodal();
            } else {
                errorToast(res.msg);
            }


            loading.value = false;
        }
    }

    const closeModal = () => {
        const config = {
            headers: { Authorization: `Bearer ${token.value}` }
        }
        loading.value = false;
        const fd = new FormData();
        // console.log(location.value.lat, "yaaaarb");
        // console.log(location.value.lng, "yaaaarb");
        // console.log(location.value.address, "yaaaarb");

        fd.append('lat', location.value.lat);
        fd.append('lng', location.value.lng);
        fd.append('map_desc', location.value.address);
        axios.post('update-location', fd, config).then((res) => {
            if (response(res) == "success") {
                visible.value = false
                setTimeout(() => {
                    navigateTo('/')
                }, 100);
            } else {
                errorToast(res.data.msg)
            }
        })

        .catch((error) => {
            console.error('Error updating location:', error);
        });
    
    }

    // toggle password
    const togglePasswordVisibility = () => {
        passwordVisible.value = !passwordVisible.value
    }

    // input type
    
    const inputType = computed(() => {
      return passwordVisible.value ? 'text' : 'password';
    });

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
</script>



<style lang="scss">
    .login-text {
        position: relative;
        z-index: 1;
    }
    .login-shape {
        width: 200px;
        padding: 6px 10px;
        text-align: center;
        border: 1px solid var(--main);
        color: var(--main);
        border-radius: 10px;
        transition: all 0.5s ease-in-out;
        overflow: hidden;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            transition: all 0.5s linear;
            background-color: var(--main) !important;
            color: #fff !important;
            top: 0px;
            left: 0;
            z-index: -1;
            transform: scaleX(0);
        }
        &:hover {
            color: #fff !important;
            &::before {
                transform: scaleX(1);
                z-index: 1;
            }
        }
        &.active {
            color: #fff;
            &::before {
                transform: scale(1);
                z-index: 1;
            }
        }
    }

    .tab-btns-login {
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
        .nav-link {
        line-height: 20px;
        padding: 10px;
        width: auto;
        min-width: 130px;
        font-size: 14px;
        &.active {
            background-color: unset;
            color: #fff;
            &::before {
            transform: scale(1);
            color: #fff;
            }
        }
        }
    }
</style>
