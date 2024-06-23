<template>
    <div>

        <GlobalAuthBanner>
            <div class="container">
                <div class="layout-form custom-width pt-0 lg">
                    <div class="auth-btns">
                        <button type="button" class="custom-btn" :class="{ active: activeIndex === 0 }" 
                        @click="setActive(0)">{{ $t("Auth.An_individual") }}</button>
                        <button type="button" class="custom-btn" :class="{ active: activeIndex === 1 }" 
                        @click="setActive(1)">{{ $t("Auth.governmental_organization") }}</button>
                        <button type="button" class="custom-btn" :class="{ active: activeIndex === 2 }" 
                        @click="setActive(2)">{{ $t("Auth.private_company") }}</button>
                    </div>
                    
                    <h1 class="main-title bold lg mb-3">{{ $t("Auth.create_account") }}</h1>
                    <h4 class="main-disc mb-4">{{ $t("Auth.fill_data") }}</h4>
                    <form @submit.prevent="signUp" ref="signUpForm">
                        <div class="custum-padding">
                            <div class="row">

                                <!-- if member -->

                                <div class="form-group text-center" v-if="activeIndex === 0">
                                    <div class="input_auth">
                                        <div class="edit-label">
                                            <i class="fas fa-edit"></i>
                                        </div>
                                        <img src="@/assets/images/upload_layout.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                        <GlobalImgUploader acceptedFiles="image/*" name="image" @uploaded-images-updated="updateUploadedImages_1" />
                                    </div>
                                </div>

                                <!-- if private -->
                                <div class="col-12 col-md-6" v-if="activeIndex === 2">
                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.sector_name') }}
                                        </label>
                                        <div class="main_input">
                                            <i class="fas fa-user sm-icon"></i>
                                            <input type="text" class="custum-input-icon validInputs" valid="organization_name" name="organization_name" v-model="name" :placeholder="$t('Auth.special_sector')">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.the_name') }}
                                        </label>
                                        <div class="main_input">
                                            <i class="fas fa-user sm-icon"></i>
                                            <input type="text" class="custum-input-icon validInputs" valid="name" name="name" v-model="name" :placeholder="$t('Auth.enter_username')">
                                        </div>
                                    </div>
                                </div>

                                <!-- if member (gender) -->
                                <div class="col-12 col-md-6 mb-4" v-if="activeIndex === 0">
                                        <label class="label">
                                            {{$t('Home.genders')}}
                                        </label>
                                        <div class="flex justify-content-center dropdown_card main_input special-custom">
                                            <i class="fas fa-venus-mars sm-icon"></i>
                                            <Dropdown v-model="gender" :options="genders" optionLabel="name" :placeholder="$t('Home.genders')" class="w-full md:w-14rem custum-dropdown" />
                                        </div>
                                </div>

                                <!-- if member (birth date)  -->
                                <div class="col-12 col-md-6" v-if="activeIndex === 0">
                                    <div class="position-relative">
                                        <label class="label">{{ $t('Auth.birth_date') }}</label>
                                        <div class=" main_input with_icon">
                                            <i class="fas fa-calendar sm-icon"></i>
                                            <flat-pickr v-model="birthdate" :config="config_a" class="select_date main_input custom-date validInputs" valid="birthdate"
                                            :placeholder="$t('Auth.birth_date')"
                                            name="birthdate"
                                            @on-change="change"
                                            />
                                            
                                            <i class="fas fa-calendar static-btn"></i>
                                        </div>
                                    </div>

                                </div>

                                <!-- if member (nationality) -->
                                <div class="col-12 col-md-6 mb-4" v-if="activeIndex === 0">
                                    <label class="label">
                                        {{$t('Auth.nationality')}}
                                    </label>
                                    <div class="flex justify-content-center dropdown_card main_input special-custom">
                                        <i class="fas fa-venus-double sm-icon"></i>
                                        <Dropdown v-model="nationality" :options="nationalities" optionLabel="name" :placeholder="$t('Auth.nationality')" class="w-full md:w-14rem custum-dropdown" />
                                    </div>
                                </div>

                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                            <label class="label">
                                                {{ $t('Auth.password') }}

                                            </label>
                                            <div class="main_input with_icon">
                                                <i class="fas fa-lock sm-icon"></i>
                                                <input :type="inputType('definitelyNewPassword')" name="password" v-model="password" class="custum-input-icon validInputs" valid="password" :placeholder=" $t('Auth.please_enter_password') ">
                                                <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility('definitelyNewPassword')" :class="{ 'active_class': passwordVisible.definitelyNewPassword }">
                                                <i class="far fa-eye icon"></i>
                                                </button>
                                            </div>
                                    </div>
                                </div>
        
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.confirm_password_sm') }}
                                        </label>
                                        <div class="main_input with_icon">
                                            <i class="fas fa-lock sm-icon"></i>
                                            <input :type="inputType('definitelyNewPassword_2')" name="password_confirmation" v-model="confirmPassword" class="custum-input-icon validInputs"  :placeholder=" $t('Auth.please_confirm_password') ">
                                            <button class="static-btn with_eye" type="button" @click="togglePasswordVisibility('definitelyNewPassword_2')" :class="{ 'active_class': passwordVisible.definitelyNewPassword_2 }">
                                            <i class="far fa-eye icon"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <!-- permission if private or government -->

                                <div class="col-12 col-md-6" v-if="activeIndex === 1 || activeIndex === 2">
                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.permission') }}
                                        </label>
                                        <div class="main_input">
                                            <i class="far fa-hand-rock sm-icon"></i>
                                            <input type="text" class="custum-input-icon validInputs" valid="bio" name="bio" :placeholder="$t('Auth.enter_permissions')">
                                        </div>
                                    </div>
                                </div>

                                <!-- if government and private -->

                                <div class="col-12 col-md-6" v-if="activeIndex === 1 || activeIndex === 2">
                                    <div class="form-group">
                                        <label class="label">
                                            {{ $t('Auth.email') }}
                                        </label>
                                        <div class="main_input">
                                            <i class="fas fa-envelope sm-icon"></i>
                                            <input type="email" class="custum-input-icon validInputs" valid="email" name="email" v-model="email" :placeholder="$t('Auth.please_enter_email')">
                                        </div>
                                    </div>
                                </div>

                                <!-- if government and private -->
                                <div class="form-group gap-4 d-flex" v-if="activeIndex === 1 || activeIndex === 2">
                                    <!-- if government and private -->
                                    <div class="input_auth without-edit" v-if="activeIndex === 1 || activeIndex === 2">
                                        <img src="@/assets/images/download-img.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                        <span>{{ $t('Auth.organization_logo') }}</span>
                                        <GlobalImgUploader acceptedFiles="image/*" name="logo" @uploaded-images-updated="updateUploadedImages_1" />
                                    </div>

                                    <!-- if private -->
                                    <div class="input_auth without-edit" v-if="activeIndex === 2">
                                        <img src="@/assets/images/download-img.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                        <span>{{ $t('Auth.commercial_register') }}</span>
                                        <GlobalImgUploader acceptedFiles="image/*" name="commercial_image" @uploaded-images-updated="updateUploadedImages_2" />
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
                                
                                <button type="submit" class="custom-btn md mr-auto" :disabled="loading">
                                    {{ $t('Auth.log_in') }}
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

        </GlobalAuthBanner>

        <!-- global google map component -->
        <GlobalGoogleMap
            v-model:visible="visible"
            @closeModal="closeModal"
            @updateAddress="handleUpdateAddress"
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

    definePageMeta({
        name: "Auth.create_account",
    });

   const closeModal_btn = ref(false);

   const address = ref("");

   const handleUpdateAddress = (newAddress) => {
        address.value = newAddress;
        console.log('Updated address:', newAddress);
    };

    const currentLocation = ref(false);

    const openmodal = () => {
        visible.value = true;
        setTimeout(() => {
            currentLocation.value = true;
        }, 100);
    }

    // import flatpicker

    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    // import i18n
    import { useI18n } from 'vue-i18n';

    // import useI18n
    const { t } = useI18n({ useScope: 'global' });

    // success response
    const { response } = responseApi();

    // Toast
    const { successToast, errorToast } = toastMsg();

    // Axios
    const axios = useApi();

    // Store
    const store = useAuthStore();

    const { lat, lng, token } = storeToRefs(store);

    // config
    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

    // sent lat lng 
    
    const closeModal = () => {
        loading.value = false;
        const fd = new FormData();
        fd.append('lat', lat.value);
        fd.append('lng', lng.value);
        fd.append('map_desc', address.value);
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
        // visible.value = false
        // currentLocation.value = false;
    }

    const location = ref({
        lat: lat.value,
        lng: lng.value
    });
    const show_inputs = ref(false);
    const visible = ref(false);

    const { completeAccountHandler } = store;

    // flatpicker date
    const birthdate = ref(null);
    const config_a = ref({
    wrap: true, // set wrap to true only when using 'input-group'
    altFormat: "Y-m-d",
    altInput: true,
    dateFormat: "Y-m-d",
    // minDate: 'today',
    });

    // variables
    const signUpForm = ref(null);
    const selectedCountry = ref({})
    const countries = ref([]);
    const uploadedImage = ref([]);
    const errors = ref([]);
    const loading = ref(false);
    const terms = ref(false);
    const password = ref('');
    const confirmPassword = ref('');
    const passwordVisible = ref({
        definitelyNewPassword: false,
        definitelyNewPassword_2: false
    });

    const genders = ref([
        {
            id: 1,
            name: t(`Auth.male`),
            type: 'male'
        },

        {
            id: 2,
            name: t(`Auth.female`),
            type: 'female'
        }
    ])
    
    const gender = ref(null);

    const nationality = ref(null);

    const nationalities = ref([
        {
            id: 1,
            name: t(`Global.egyptian`),
            type: 'egyptian'
        },

        {
            id: 2,
            name: t(`Global.saudi`),
            type: 'saudi'
        }
    ])

    // active index
    const activeIndex = ref(0)

    // chage active class by click 
    const setActive = (index) => {
        activeIndex.value = index;
    } 

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

        if(activeIndex.value == 0) {
            if(!gender.value) {
                errors.value.push(t(`validation.gender`));
            }
    
            if(!nationality.value) {
                errors.value.push(t(`validation.nationality`));
            }
            
        }


        if (!terms.value) {
            errors.value.push(t(`validation.conditions`));
        }
    };

    // signUp Function
    const signUp = async () => {
        loading.value = true;
        const fd = new FormData(signUpForm.value);
        fd.append('country_code', selectedCountry.value.key);
        fd.append('type', activeIndex.value);
        
        if (localStorage.getItem('lang') == null) {
                fd.append('lang', 'ar');
            } else {
                fd.append('lang', localStorage.getItem('lang'));
            }

        if(activeIndex.value == 0) {
            if(gender.value) {
                fd.append('gender', gender.value.type);
            }

            if(nationality.value) {
                fd.append('nationality', nationality.value.type);
            }
            fd.append('birthdate', birthdate.value);
        }

        validate();

        if (errors.value.length) {
            errorToast(errors.value[0]);
            loading.value = false;
            errors.value = [];
        } else {
            loading.value = true;

            // Get Returned Data From Store
            const res = await completeAccountHandler(fd);
            // res.status == "success" ? successToast(res.msg) : errorToast(res.msg);
            if (res.status == "success") {
                successToast(res.msg);
                openmodal();
            } else {
                errorToast(res.msg);
            }

            loading.value = false;
        }
    };

    onMounted(async () => {
        await getCountries();
        // store.sendLatLng(lat, lng, address, selectedAddress);
    });

</script>

<style lang="scss" scoped>
    .p-dialog-header-icons {
        display: none;
    }
</style>

