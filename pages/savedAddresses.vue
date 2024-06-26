<template>
    <div>
        
        <div class="container">
            <div class="custom-width lg">
                <h1 class="main-title bold text-center mb-5">{{ $t("Global.saved_addresses") }}</h1>
    
                <transition-group name="fade" v-if="!loading">
                    <form>
                        <div v-for="(single, index) in address" :key="single.index">
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
    
                                    <button type="button" class="edit-btn">
                                        <i class="far fa-edit edit-icon" v-if="!editLoading" @click="editaddress(single.id)"></i>
                                        <span class="spinner-border spinner-border-sm m-0" v-if="editLoading" role="status" aria-hidden="true"></span>
                                    </button>
    
                                    <button class="delete-btn">
                                        <i class="far fa-trash-alt trash-icon" v-if="!deleteLoading" @click="removenotifation(index)"></i>
                                        <span class="spinner-border spinner-border-sm m-0" v-if="deleteLoading" role="status" aria-hidden="true"></span>
                                    </button>
                                </div>
                            </div>
                            </div>
                        </div>
            
                        <div v-if="!address.length">
                            {{ $t("Global.no_address") }}
                        </div>

                        <button class="custom-btn md mr-auto mt-5">{{ $t("Auth.confirmation") }}</button>

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
            :title= "$t('Global.current_location')"
            />
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
    currentID.value = id;
    loading.value = true;
    visible.value = true;
    await axios.get(`single-address/${id}`, config).then(res => {
        if (response(res) == "success") {
            location.value.lat = Number(res.data.data.lat);
            location.value.lng = Number(res.data.data.lng);
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}

// الفانكشن دى عشان تسمع التحديثات اللى بتتم على الماب وتاخد الاحداثيات الجديده , by (Ramadan)

const handleUpdateAddress = (newData) => {
    const { lat, lng, address } = newData;
    location.value.lat = lat;
    location.value.lng = lng;
    mapAddress.value = address;
};

const updateAddress = async (data) => {
    loading.value = true;
    titleName.value = data;
    const fd = new FormData();
    fd.append('lat', Number(location.value.lat));
    fd.append('lng', Number(location.value.lng));
    fd.append('map_desc', mapAddress.value);
    fd.append('title', titleName.value);
    console.log('Submitting lat, lng:', +location.value.lat, +location.value.lng); // Debugging
    await axios.post(`update-address/${currentID.value}?_method=put`, fd, config).then(res => {
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
       

// Remove Single Notification
const removenotifation = async (index) => {
    loading.value = true;
    await axios.delete(`delete-notification/${address.value[index].id}`, config).then(res => {
        if (response(res) == "success") {
            address.value.splice(index, 1);
            successToast(res.data.msg);
        } else {
            errorToast(res.data.msg);
        }
        loading.value = false;
    }).catch(err => {
        console.error(err);
    });
}



/******************* Computed *******************/
let showPaginate = computed(() => {
    return totalPage.value > pageLimit.value
});


/******************* Watch *******************/

/******************* Mounted *******************/
onMounted(async () => {
    await getaddress();
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
            width: 25px;
            height: 25px;
        }
    }
    .wrap_text {
        word-break: break-word;
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
</style>
  