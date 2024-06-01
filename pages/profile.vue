<template>
    <div class="container">
        <div class="layout-form custom-width">
            <h1 class="main-title bold lg mb-5">{{ $t("Home.profile_personly") }}</h1>
            <form @submit.prevent="editProfile" ref="editProfileform">
                <div class="row">
                    <div class="col-12 col-md-8 mr-auto">

                        <div class="form-group text-center">
                            <div class="input_auth without_label">
                                <div class="edit-label">
                                    <i class="fas fa-edit"></i>
                                </div>
                                <img src="@/assets/images/upload_layout.png" loading="lazy" alt="default-img" :class="{'hidden-default' : uploadedImage.length > 0, 'default-class': true}">
                                <GlobalImgUploader acceptedFiles="image/*" :newImages="image" name="image" @uploaded-images-updated="updateUploadedImages_1" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="label">
                                {{ $t('Auth.username') }}
                                <span class="hint-red">*</span>
                            </label>
                            <div class="main_input">
                                <i class="fas fa-user sm-icon"></i>
                                <input type="text" class="custum-input-icon" name="name" readonly v-model="name" :placeholder="$t('Auth.enter_username')">
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
                                    <input type="number" class="custum-input-icon" name="phone" readonly v-model="phone" :placeholder="$t('Auth.please_mobile_number')">
                                </div>
                                <div class="card d-flex justify-content-center dropdown_card">
                                <Dropdown
                                v-model="selectedCountry"
                                :options="countries"
                                optionLabel="name"
                                disabled
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
                                <input type="email" class="custum-input-icon" name="email" readonly v-model="email" :placeholder="$t('Auth.please_enter_email')">
                            </div>
                        </div>
                        
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
// pinia store

// success response
const { response } = responseApi();


// // Axios
const axios = useApi();


/******************* Data *******************/

// Store
const store = useAuthStore();


const loading = ref(false);

const { token } = storeToRefs(store);

const uploadedImage = ref([]);

const selectedCountry = ref({})
const countries = ref([]);
const image = ref('');
const name = ref('');
const phone = ref('');
const email = ref('');

const editProfileform = ref(null);

    // method to update images
    const updateUploadedImages_1 = (images) => {
        uploadedImage.value = images;
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
            selectedCountry.value = res.data.data.country_code;
            image.value = res.data.data.image;
        }).catch(err => console.log(err));
    }
    
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
        await profile();
        await getCountries();
    });
</script>


