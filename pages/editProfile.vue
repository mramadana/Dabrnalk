<template>
    <div class="container">
        <div class="layout-form">
            <h1 class="main-title bold text-center lg mb-5">{{ $t("Home.edit_profile") }}</h1>
            <form @submit.prevent="editProfile" ref="editProfileform">
                <div class="row justify-content-between flex-wrap-reverse">
                    <div class="col-12 col-xl-5 col-md-12 mb-5">

                        <!-- if member -->

                        <div class="form-group text-center" v-if="activeIndex === 0">
                                <div class="input_auth">
                                    <div class="edit-label">
                                        <i class="fas fa-edit"></i>
                                    </div>
                                    <img src="@/assets/images/upload_layout.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                    <GlobalImgUploader acceptedFiles="image/*" :newImages="image" name="image" @uploaded-images-updated="updateUploadedImages_1" />
                                </div>
                        </div>

                        <!-- if government -->

                        <img src="@/assets/images/black-logo.png" v-if="activeIndex === 1 || activeIndex === 2" alt="black-logo" class="black-logo" loading="lazy">

                        <!-- if private -->
                        <div class="form-group" v-if="activeIndex === 2">
                            <label class="label">
                                {{ $t('Auth.sector_name') }}
                            </label>
                            <div class="main_input">
                                <i class="fas fa-user sm-icon"></i>
                                <input type="text" class="custum-input-icon validInputs" valid="name" name="name" v-model="name" :placeholder="$t('Auth.special_sector')">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.the_name') }}
                            </label>
                            <div class="main_input">
                                <i class="fas fa-user sm-icon"></i>
                                <input type="text" class="custum-input-icon validInputs" readonly valid="name" name="name" v-model="name" :placeholder="$t('Auth.enter_username')">
                            </div>
                        </div>

                        <!-- if member (gender) -->
                        <div class="form-group" v-if="activeIndex === 0">
                                <label class="label">
                                    {{$t('Home.genders')}}
                                </label>
                                <div class="flex justify-content-center dropdown_card main_input special-custom">
                                    <i class="fas fa-venus-mars sm-icon"></i>
                                    <Dropdown v-model="gender" :options="genders" optionLabel="name" :placeholder="$t('Home.genders')" class="w-full md:w-14rem custum-dropdown" />
                                </div>
                        </div>

                        <!-- if member (birth date)  -->
                        <div class="position-relative  form-group" v-if="activeIndex === 0">
                            <label class="label">{{ $t('Auth.birth_date') }}</label>
                            <div class=" main_input with_icon">
                                <i class="fas fa-calendar sm-icon"></i>
                                <flat-pickr v-model="calender_date" :config="config_a" class="select_date main_input custom-date"
                                :placeholder="$t('Auth.birth_date')"
                                name="date"
                                @on-change="change"
                                />
                                
                                <i class="fas fa-calendar static-btn"></i>
                            </div>
                        </div>

                        <!-- if member (nationality) -->
                        <div class="form-group" v-if="activeIndex === 0">
                            <label class="label">
                                {{$t('Auth.nationality')}}
                            </label>
                            <div class="flex justify-content-center dropdown_card main_input special-custom">
                                <i class="fas fa-venus-double sm-icon"></i>
                                <Dropdown v-model="gender" :options="genders" optionLabel="name" :placeholder="$t('Auth.nationality')" class="w-full md:w-14rem custum-dropdown" />
                            </div>
                        </div>

                        <!-- permission if private or government -->

                        <div class="form-group" v-if="activeIndex === 1 || activeIndex === 2">
                            <label class="label">
                                {{ $t('Auth.permission') }}
                            </label>
                            <div class="main_input">
                                <i class="far fa-hand-rock sm-icon"></i>
                                <input type="text" class="custum-input-icon validInputs" valid="name" name="name" v-model="name" :placeholder="$t('Auth.enter_permissions')">
                            </div>
                        </div>

                        <!-- if government and private -->
                        <div class="form-group gap-4 d-flex" v-if="activeIndex === 1 || activeIndex === 2">
                            <!-- if government and private -->
                            <div class="input_auth without-edit" v-if="activeIndex === 1 || activeIndex === 2">
                                <img src="@/assets/images/download-img.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                <span>{{ $t('Auth.organization_logo') }}</span>
                                <GlobalImgUploader acceptedFiles="image/*" name="image" @uploaded-images-updated="updateUploadedImages_1" />
                            </div>

                            <!-- if private -->
                            <div class="input_auth without-edit" v-if="activeIndex === 2">
                                <img src="@/assets/images/download-img.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                <span>{{ $t('Auth.commercial_register') }}</span>
                                <GlobalImgUploader acceptedFiles="image/*" name="logo" @uploaded-images-updated="updateUploadedImages_1" />
                            </div>
                        </div>

                        <div class="section-btns flex-nowrap mb-4">

                            <nuxt-link to="/changePassword" class="custom-btn transparent w-100">{{ $t('Global.change_password') }}</nuxt-link>
                            <button type="submit" class="custom-btn w-100">
                                {{ $t('Global.save_changes') }}
                                <span class="spinner-border spinner-border-sm" v-if="loading" role="status"
                                    aria-hidden="true"></span>
                            </button>
                        </div>

                        <button type="button" class="custom-btn red-bg w-100" @click="deleteAcount = true">{{ $t('Global.delete_account') }}</button>

                        
                    </div>

                    <div class="col-12 col-xl-5 col-md-12 mb-5 text-center">
                        <img src="@/assets/images/edit-profile.png" loading="lazy" alt="profile-image" class="profile-image w-100">
                    </div>
                </div>
            </form>
        </div>

        <Dialog v-model:visible="successfullyChange" modal class="custum_dialog_width without-close" :draggable="false" >
            <div class="text-center">
                <img src="@/assets/images/check.png" alt="check-img" class="check-img">
                <h3 class="main-title bold mb-4">{{ $t('Global.Saving_changes_success') }}</h3>
            </div>
        </Dialog>

        <!-- Delete Account Dialog -->
        <Dialog v-model:visible="deleteAcount" modal class="custum_dialog_width" :draggable="false">
            <div class="text-center">
                <img src="@/assets/images/noun_warning.png" loading="lazy" alt="check-img" class="check-img">
                <h1 class="main-title bold mb-4">{{ $t('Global.sure_delete_account') }}</h1>
                <h1 class="main-title normal mb-4">{{ $t('Global.delete_account_info') }}</h1>
                <div class="section-btns mt-5">
                    <button type="button" class="custom-btn sm d-inline-flex" @click="deleteAcount = false">{{ $t('Home.retreat') }}</button>
                    <button type="button" class="custom-btn red-bg sm d-inline-flex" @click="deletedAcount">{{ $t('Global.delete') }}</button>
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup>

    definePageMeta({
        name: "Home.edit_profile",
        middleware: 'auth',
    });

import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

// pinia store
import { useAuthStore } from '~/stores/auth';
import { useGlobalStore } from '~/stores/global';

// import flatpicker

import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

// Store
const store = useAuthStore();
const globalStore = useGlobalStore();

// success response
const { response } = responseApi();

const { profileHandler } = store;

// // Toast
const { successToast, errorToast } = toastMsg();

// // Axios
const axios = useApi();

const deleteAcount = ref(false);

// Delete Account
const { deleteAccountHandler } = store;

/******************* Data *******************/

// status of input to show
const activeIndex = ref(2);

// flatpicker date
const calender_date = ref(null);
const config_a = ref({
wrap: true, // set wrap to true only when using 'input-group'
altFormat: "Y-m-d",
altInput: true,
dateFormat: "Y-m-d",
minDate: 'today',
});

const genders = ref([
        {
            id: 1,
            name: t(`Auth.male`),

        },

        {
            id: 2,
            name: t(`Auth.female`),
        }
    ])
    
const gender = ref(null);

const image = ref('');
const name = ref('');
const successfullyChange = ref(false);
const errors = ref([]);

const loading = ref(false);

const { token } = storeToRefs(store);


const uploadedImage = ref([]);
const editProfileform = ref(null);

const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

    // method to update images
    const updateUploadedImages_1 = (images) => {
        uploadedImage.value = images;
    };

    // Validation Function
    function validate() {
        let allInputs = document.querySelectorAll('.validInputs');
        for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i].value === '') {
                errors.value.push(t(`validation.${allInputs[i].name}`));
            }
        }
    };

    //  get profile data
    const profile = async () => {
        await axios.get('profile', config).then(res => {
            name.value = res.data.data.name;
            image.value = res.data.data.image;
        }).catch(err => console.log(err));
    }

    const editProfile = async () => {
        loading.value = true;
        const fd = new FormData(editProfileform.value);
        loading.value = true;

        validate();

        // Get Returned Data From Store
        const res = await profileHandler(fd);

        if (res.status == "success") {
            successToast(res.msg);
            successfullyChange.value = true;
            setTimeout(() => {
                successfullyChange.value = false
                navigateTo("/settings");
            }, 1000);
        } else {
            errorToast(res.msg);
        }

        loading.value = false;

    }

    // Delete Account

    const deletedAcount = async () => {
        deleteAcount.value = false;
        // localStorage.clear();

        // Get Returned method From Store
        // const res = await deleteAccountHandler();
        // res.status == "success" ? successToast(res.msg) : errorToast(res.msg);
        // navigateTo("/Auth/register");
    }

    onMounted(() => {
        profile();
    })
    

</script>


<style lang="scss" scoped>
    .black-logo {   
        height: 150px;
        width: 150px;
        display: block;
        margin: 0 auto 20px;
    }
</style>