<template>
    <div>
        <div class="container">
            <div class="custom-width lg">
                <h1 class="main-title bold text-center mb-5">{{ $t("Global.saved_addresses") }}</h1>
    
                <transition-group name="fade" v-if="!loading">
                    <form>
                        <label v-for="(single, index) in address" :key="single.index" class="label-address">
                            <input type="radio" class="form-check-input" :value="single.id" name="address" @change="handleRadioChange(single.id)" :checked="single.id === selectedAddress">
                            <div class="layout-form sm" v-if="address.length">
                                <div class="notificatin-card">
                                    <div class="d-flex">
                                        <div class="text text-start">
                                            <h1 class="main-title normal wrap_text"> {{ single.title }}</h1>
                                            <div class="d-flex align-items-center gap-2">
                                                <div class="not-icon">
                                                    <i class="fas fa-map-marker-alt"></i>
                                                </div>
                                                <div>
                                                    <span class="main-disc sm"> {{ single.map_desc }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="btns">
        
                                        <button type="button" class="edit-btn" @click="editaddress(single.id)">
                                            <i class="far fa-edit edit-icon" v-if="!editLoading"></i>
                                            <span class="spinner-border spinner-border-sm m-0" v-if="editLoading" role="status" aria-hidden="true"></span>
                                        </button>
        
                                        <button class="delete-btn" @click="removeAdress(single.id, index)">
                                            <i class="far fa-trash-alt trash-icon" v-if="!deleteLoading"></i>
                                            <span class="spinner-border spinner-border-sm m-0" v-if="deleteLoading" role="status" aria-hidden="true"></span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </label>
            
                        <div class="layout-form sm justify-content-center" v-if="!address.length">
                            {{ $t("Global.no_address") }}
                        </div>

                        <button type="button" class="custom-btn md mr-auto mt-5" @click="addAddress">
                            {{ $t("Order.add_address") }}
                            <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
                        </button>

                    </form>
                    
                    
                </transition-group>
    
                <div v-if="loading">
                    <div class="notification-items">
                        <div class="not-item d-flex" v-for="i in 4" :key="i">
                            <div class="right">
                                <Skeleton shape="circle" size="4rem"></Skeleton>
                                <div class="not_body">
                                    <div class="time mb-3">
                                        <Skeleton height=".6rem" width="4rem"></Skeleton>
                                    </div>
                                    <Skeleton height=".6rem" width="14rem"></Skeleton>
                                </div>
                            </div>
                            <Skeleton height="1.2rem" width=".8rem"></Skeleton>
                        </div>
    
                    </div>
                </div>
    
                <div v-if="showPaginate">
                    <Paginator :rows="pageLimit" @page="onPaginate" :totalRecords="totalPage" class="mt-5" dir="ltr" />
                </div>
            </div>
        </div>

        <!-- google map component -->

        <GlobalGoogleMap
            v-model:visible="visible"
            :closeModal_btn="closeModal_btn"
            @closeModal="updateAddress"
            @updateAddress="handleUpdateAddress"
            @handleClose="handleClose"
            :show_inputs="show_inputs"
            :lat="location.lat"
            :lng="location.lng"
            :isDraggable="true"
            :shouldUpdateData="false"
            :reset-title="resetTitle"
            :current_location="currentLocation"
            :title= "$t('Global.current_location')"
            :CurrentTitle="titleName"
            :mapAddress="mapAddress"
            />

            <!-- :title= "$t('Global.current_location')"

            :title="titleName" -->
    </div>
</template>

<script setup>

/******************* Required Auth *******************/
definePageMeta({
        name: "Titles.my_addresses",
        middleware: "auth",
    })

// success response
const { response } = responseApi();

// Axios
const axios = useApi();

// toast
const { successToast, errorToast } = toastMsg();

// pinia store
import { useAuthStore } from '~/stores/auth';

/******************* Data *******************/

// Store
const store = useAuthStore();
const { token } = storeToRefs(store);

// loading
const loading = ref(true);

const selectedAddress = ref(null);

const closeModal_btn = ref(true);

// delete loading
const deleteLoading = ref(false);

// address
const address = ref([]);

const mapAddress = ref('')

// Paginator
const currentPage = ref(1);
const pageLimit = ref();
const totalPage = ref();
const currentLocation = ref(false);

// config
const config = {
    headers: { Authorization: `Bearer ${token.value}` }
};

const handleClose = () => {
        visible.value = false;
};

const visible = ref(false);
const titleName = ref('');
const location = ref({
    lat: null,
    lng: null
})
const show_inputs = ref(true);
const currentID = ref(null);
const resetTitle = ref(false); 

/**** Methods ****/

// Paginate Function
const onPaginate = (e) => {
    loading.value = true;
    currentPage.value = e.page + 1;
    window.scrollTo(0, 0);
    getaddress();
};

// الفانكشن دى عشان تسمع التحديثات اللى بتتم على الماب وتاخد الاحداثيات الجديده , by (Ramadan)

const handleUpdateAddress = (newData) => {
    const { lat, lng, address } = newData;
    location.value.lat = lat;
    location.value.lng = lng;
    mapAddress.value = address;
};

const addAddressStatus = ref(false)

// Add address

const addAddress = () => {
    visible.value = true;
    addAddressStatus.value = true;

    // delete title name when i add new title name
    
    titleName.value = '';
    
    // Set current location
    setTimeout(() => {
        currentLocation.value = true;
    }, 200);
}
        

// Get address
const getaddress = async () => {
    loading.value = true;
    await axios.get(`get-address?page=${currentPage.value}`, config).then(res => {
        if (response(res) == "success") {
            address.value = res.data.data;
            // totalPage.value = res.data.pagination.total_items;
            // pageLimit.value = res.data.pagination.per_page;
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// edit single address

const editaddress = async (id) => {
    addAddressStatus.value = false
    currentID.value = id;
    loading.value = true;
    visible.value = true;
    titleName.value = '';
    await axios.get(`single-address/${id}`, config).then(res => {
        if (response(res) == "success") {
            location.value.lat = Number(res.data.data.lat);
            location.value.lng = Number(res.data.data.lng);
            if(!addAddressStatus.value){
                titleName.value = res.data.data.title;
                mapAddress.value = res.data.data.map_desc;
            }
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// Update Address

const updateAddress = async (data) => {
    const url = addAddressStatus.value ? 'create-address' : `update-address/${currentID.value}?_method=put`;
    
    loading.value = true;
    titleName.value = data;
    const fd = new FormData();
    fd.append('lat', Number(location.value.lat));
    fd.append('lng', Number(location.value.lng));
    fd.append('map_desc', mapAddress.value);
    fd.append('title', titleName.value);
    console.log('Submitting lat, lng:', +location.value.lat, +location.value.lng); // Debugging
    await axios.post(url, fd, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            visible.value = false;
            resetTitle.value = true;
            getaddress();
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
    resetTitle.value = false;
}
       
// Remove Single Address
const removeAdress = async (id, index) => {
    loading.value = true;
    await axios.delete(`delete-address/${id}`, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
            // address.value.splice(index, 1);
            getaddress();
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// get it active

const handleRadioChange = async (id) => {
    selectedAddress.value = id;
    localStorage.setItem('selectedAddress', id);
    await axios.post(`active-address/${id}`, {}, config).then(res => {
        if (response(res) == "success") {
            successToast(res.data.msg);
             getAddressDetails(id);
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

const loadGoogleMaps = () => {
  return new Promise((resolve) => {
    if (window.google && window.google.maps) {
      resolve(window.google);
    } else {
      const language = localStorage.getItem('locale') || 'ar';
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDY4h8L8OYA4vrhpzUaLHzGzJWI8noOTZg&libraries=places&language=${language}&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.initMap = () => {
        resolve(window.google);
      };
      document.head.appendChild(script);
    }
  });
};

// loooool
const getAddressDetails = async (id) => {
    await axios.get(`single-address/${id}`, config).then(async res => {
        if (response(res) == "success") {
            const { lat, lng, map_desc, title } = res.data.data;
            // استخدام geocoder للحصول على المدينة والمنطقة
            loadGoogleMaps().then((google) => {
                getCityAndCountryFromLatLng(lat, lng, (error, { city, country }) => {
                    if (error) {
                        console.error('Error fetching address components:', error);
                    } else {
                        // إرسال البيانات إلى `store` مع المدينة والمنطقة
                        // store.sendLatLng(lat, lng, title, `${country}, ${city}`);
                        store.sendLatLng(lat, lng, map_desc, `${country}, ${city}`, title,);
                    }
                });
            });
        } else {
            errorToast(res.data.msg);
        }
    }).catch(err => {
        console.error(err);
    });
};


function getCityAndCountryFromLatLng(lat, lng, callback) {
    const geocoder = new google.maps.Geocoder();
    const language = localStorage.getItem('locale') || 'ar';
    const latlng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({ location: latlng, language: language }, (results, status) => {
        if (status === 'OK' && results[0]) {
            let city = '';
            let country = '';

            if (results[0].address_components) {
                results[0].address_components.forEach(component => {
                    if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
                        city = component.long_name;
                    }
                    if (component.types.includes('country')) {
                        country = component.long_name;
                    }
                });
            }

            callback(null, { city, country });
        } else {
            callback('Geocode was not successful for the following reason: ' + status);
        }
    });
}


const loadSelectedAddress = () => {
      const savedAddress = localStorage.getItem('selectedAddress');
      if (savedAddress) {
        selectedAddress.value = parseInt(savedAddress, 10);
      }
    };



/******************* Computed *******************/
let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value
});



/******************* Mounted *******************/
onMounted(async () => {
    await getaddress();
    loadSelectedAddress();


    loadGoogleMaps().then((google) => {
        console.log('Google Maps API loaded:', google);
        // يمكنك هنا تنفيذ أي عملية تتعلق بـ Google Maps API
    }).catch((error) => {
        console.error('Error loading Google Maps API:', error);
    });
});

</script>


<style lang="scss" scoped>
    .btns {
        display: flex;
        align-items: center;
        gap: 10px;
        button {
            padding: 6px;
            border-radius: 3px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 13px;
            color: #fff;
            width: 27px;
            height: 27px;
        }
    }
    .wrap_text {
        word-break: break-word;
        text-align: start;
    }
    .delete-btn {
        background-color: red;
    }

    .edit-btn {
        background-color: var(--main);
    }
    .main-disc {
        &.sm {
            font-size: 13px;
            font-weight: 400;
        }
    }
    .notificatin-card {
        display: flex;
        flex-grow: 1;
        justify-content: space-between;
        align-items: start;
        .notificatin-img {
            width: 65px;
            height: 45px;
            object-fit: cover;
            margin-inline-end: 15px;
            border-radius: 3px;
        }

    }
    .custom-height {
        min-height: 310px;
        @media (max-width: 1024px) {
            min-height: 100%;
        }
    }

    .not-item {
        justify-content: space-between;
        padding: 10px 15px;
        border-radius: 10px;
        border: 1px solid rgba($color: #dcdcdc, $alpha: 0.56);
        margin-bottom: 15px;

    .right {
        display: flex;
        align-items: center;
        gap: 15px;

        .logo {
        max-width: 60px;
        flex-shrink: 0;
        }

        .not_body {
        .time {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 12px;
            color: green;

            i {
            animation: bell-animation 4s infinite ease-in-out;
            }
        }
        }
    }

    &:last-child {
        margin-bottom: 0;
    }
    }

    .layout-form {
    background-color: var(--wh);
    box-shadow: 0px 3px 30px #0000001A;
    border-radius: 20px;
    margin-bottom: 50px;
    padding: 45px 15px;
    transition: all 0.3s ease-in-out;
    &.sm-radius {
        border-radius: 10px;
        padding: 0;
        overflow: hidden;
        border: 1px solid #eee;
        text-align: start;
        margin-bottom: 0;
    }

    &.sm {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 25px;
        padding: 15px;
        font-size: 13px;
        color: #000;
        font-weight: bold;
        border-radius: 15px;
        border: 1px solid #DBDBDB;
    }
    }

    .not-icon {
        margin-inline-end: 5px;
        i {
            font-size: 18px;

        }
    }

    .label-address {
        width: 100%;
        cursor: pointer;
        .form-check-input {
            display: none;
        }

        input:checked + .layout-form {
            background-color: #DCDCDC;
        }
    }
</style>
  