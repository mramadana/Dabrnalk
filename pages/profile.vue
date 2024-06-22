<template>
    <div class="container">

        <div class="layout-form">
            <h1 class="main-title bold lg text-center mb-5">{{ $t("Home.profile_personly") }}</h1>
            <form @submit.prevent="editProfile" ref="editProfileform">
                <div class="row justify-content-between flex-wrap-reverse">
                    <div class="col-12 col-xl-5 col-md-12 mb-5">

                        <!-- if member -->

                        <div class="form-group text-center" v-if="user.type === 0">
                                <div class="input_auth without_label">
                                    <div class="edit-label">
                                        <i class="fas fa-edit"></i>
                                    </div>
                                    <img src="@/assets/images/upload_layout.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage_1.length > 0, 'default-class': true}">
                                    <GlobalImgUploader acceptedFiles="image/*" :newImages="image" name="image" @uploaded-images-updated="updateUploadedImages_1" />
                                </div>
                        </div>

                        <!-- if government and private -->

                        <img src="@/assets/images/black-logo.png" v-if="user.type === 1 || user.type === 2" alt="black-logo" class="black-logo" loading="lazy">

                        <!-- if private -->
                        <div class="form-group" v-if="user.type === 2">
                            <label class="label">
                                {{ $t('Auth.sector_name') }}
                            </label>
                            <div class="main_input">
                                <i class="fas fa-user sm-icon"></i>
                                <input type="text" class="custum-input-icon validInputs" readonly valid="organization_name" name="organization_name" v-model="organization_name" :placeholder="$t('Auth.special_sector')">
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
                        <div class="form-group" v-if="user.type === 0">
                                <label class="label">
                                    {{$t('Home.genders')}}
                                </label>
                                <div class="flex justify-content-center dropdown_card main_input special-custom">
                                    <i class="fas fa-venus-mars sm-icon"></i>
                                    <Dropdown v-model="gender" disabled :options="genders" optionLabel="name" :placeholder="$t('Home.genders')" class="w-full md:w-14rem custum-dropdown" />
                                </div>
                        </div>

                        <!-- if member (birth date)  -->
                        <div class="position-relative  form-group" v-if="user.type === 0">
                            <label class="label">{{ $t('Auth.birth_date') }}</label>
                            <div class=" main_input with_icon">
                                <i class="fas fa-calendar sm-icon"></i>
                                <flat-pickr v-model="birthdate" :config="config_a" class="select_date main_input custom-date"
                                :placeholder="$t('Auth.birth_date')"
                                name="date"
                                disabled="disabled"
                                @on-change="change"
                                />
                                
                                <i class="fas fa-calendar static-btn"></i>
                            </div>
                        </div>

                        <!-- if member (nationality) -->
                        <div class="form-group" v-if="user.type === 0">
                            <label class="label">
                                {{$t('Auth.nationality')}}
                            </label>
                            <div class="flex justify-content-center dropdown_card main_input special-custom">
                                <i class="fas fa-venus-double sm-icon"></i>
                                <Dropdown v-model="nationality" :options="nationalities" disabled optionLabel="name" :placeholder="$t('Auth.nationality')" class="w-full md:w-14rem custum-dropdown" />
                            </div>
                        </div>

                        <!-- permission if private or government -->

                        <div class="form-group" v-if="user.type === 1 || user.type === 2">
                            <label class="label">
                                {{ $t('Auth.permission') }}
                            </label>
                            <div class="main_input">
                                <i class="far fa-hand-rock sm-icon"></i>
                                <input type="text" class="custum-input-icon validInputs" readonly valid="bio" name="bio" v-model="bio" :placeholder="$t('Auth.enter_permissions')">
                            </div>
                        </div>

                        <!-- if government and private -->

                        <div class="form-group" v-if="user.type === 1 || user.type === 2">
                            <label class="label">
                                {{ $t('Auth.email') }}
                            </label>
                            <div class="main_input">
                                <i class="fas fa-envelope sm-icon"></i>
                                <input type="email" class="custum-input-icon validInputs" readonly valid="email" name="email" v-model="email" :placeholder="$t('Auth.please_enter_email')">
                            </div>
                        </div>

                        <!-- if government and private -->
                        <div class="form-group gap-4 d-flex" v-if="user.type === 1 || user.type === 2">
                            <!-- if government and private -->
                            <div class="input_auth without-edit" v-if="user.type === 1 || user.type === 2">
                                <img src="@/assets/images/download-img.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage_2.length > 0, 'default-class': true}">
                                <span>{{ $t('Auth.organization_logo') }}</span>
                                <GlobalImgUploader acceptedFiles="image/*" :newImages="logo" @uploaded-images-updated="updateUploadedImages_2" />
                            </div>

                            <!-- if private -->
                            <div class="input_auth without-edit" v-if="user.type === 2">
                                <img src="@/assets/images/download-img.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage_3.length > 0, 'default-class': true}">
                                <span>{{ $t('Auth.commercial_register') }}</span>
                                <GlobalImgUploader acceptedFiles="image/*" :newImages="commercial_image" @uploaded-images-updated="updateUploadedImages_3" />
                            </div>
                        </div>

                        <nuxt-link to="/editProfile" class="custom-btn md m-auto">{{ $t('Home.edit_profile') }}</nuxt-link>
                        
                    </div>

                    <div class="col-12 col-xl-5 col-md-12 mb-5 text-center">
                        <img src="@/assets/images/Account-pana.png" loading="lazy" alt="profile-image" class="profile-image w-auto">
                    </div>
                </div>
            </form>
        </div>
    </div>
    
</template>

<script setup>

    import { useI18n } from 'vue-i18n';
    const { t } = useI18n({ useScope: 'global' });
    import { useAuthStore } from '~/stores/auth';

    definePageMeta({
        name: "Home.profile_personly",
        middleware: 'auth'
    });

    // import flatpicker

    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    // success response
    const { response } = responseApi();


    // Axios
    const axios = useApi();


/******************* Data *******************/

    // Store
    const store = useAuthStore();

    const { token, user } = storeToRefs(store);

    // status of input to show
    const activeIndex = ref(null);

    // flatpicker date
    const birthdate = ref(null);

    const config_a = ref({
    wrap: true, // set wrap to true only when using 'input-group'
    altFormat: "Y-m-d",
    altInput: true,
    dateFormat: "Y-m-d",
    });

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
    ]);

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

    const loading = ref(false);

    const image = ref('');
    const commercial_image = ref('');
    const logo = ref('');
    const name = ref('');
    const phone = ref('');
    const email = ref('');
    const bio = ref('');
    const organization_name = ref('');

    const uploadedImage_1 = ref([]);
    const uploadedImage_2 = ref([]);
    const uploadedImage_3 = ref([]);

    const editProfileform = ref(null);

    // method to update images
    const updateUploadedImages_1 = (images) => {
        uploadedImage_1.value = images;
    };
    const updateUploadedImages_2 = (images) => {
        uploadedImage_2.value = images;
    };

    const updateUploadedImages_3 = (images) => {
        uploadedImage_3.value = images;
    };

    // config
    const config = {
        headers: { Authorization: `Bearer ${token.value}` }
    };

    //  get profile data
    const profile = async () => {
        await axios.get('profile', config).then(res => {
            name.value = res.data.data.name;
            phone.value = res.data.data.phone;
            email.value = res.data.data.email;
            image.value = res.data.data.image;
            organization_name.value = res.data.data.organization_name;
            bio.value = res.data.data.bio;
            commercial_image.value = res.data.data.commercial_image;
            logo.value = res.data.data.logo;
            gender.value = genders.value.find(gender => gender.type == res.data.data.gender);
            birthdate.value = res.data.data.birthdate;
            nationality.value = nationalities.value.find(nationality => nationality.type == res.data.data.nationality);
            
        }).catch(err => console.log(err));
    }

    onMounted(async () => {
        await profile();
    });
</script>

<style lang="scss">
    .form-control {
        &:disabled {
            background-color: transparent !important;
        }
    }
</style>

<style lang="scss" scoped>
    .without-edit {
        input {
            pointer-events: none;
        }

        .edit-label, .remove-btn {
            display: none !important;
        }
    }

    .black-logo {   
        height: 150px;
        width: 150px;
        display: block;
        margin: 0 auto 20px;
    }
</style>


