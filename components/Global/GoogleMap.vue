<template>
    <Dialog
        modal
        :show_inputs="show_inputs"
        :visible="visible"
        :lat="lat"
        :lng="lng"
        :closeModal_btn="closeModal_btn"
        class="map_style"
    >
        <div class="modal-body-main modal-pad">
            <button type="button" class="close transparent" v-if="props.closeModal_btn" @click="closeDialog">
                <i class="far fa-times-circle"></i>
            </button>
            <div class="text-center fontbold font22 mb-4">
                {{ props.title }}
            </div>
            <div class="dirmain mb-3">
                <input
                    class="main_input"
                    :placeholder="$t('Global.address_name')"
                    type="text"
                    name=""
                    v-model="titleName"
                    id=""
                    v-if="props.show_inputs"
                />
                <div class="position-relative w-100" v-if="!props.AutoComplete">
                    <img
                        src="@/assets/images/marker.png"
                        alt="input-img"
                        class="map_search_img"
                    />
                    <GMapAutocomplete
                        :placeholder="$t('Global.search_here')"
                        @place_changed="setPlace"
                        class="search_here main_input"
                        :value="address"
                    >
                    </GMapAutocomplete>
                </div>
                <button
                    class="custom-btn smm bold getCurent"
                    @click="getCurrentLocatoin"
                    v-if="props.show_inputs"
                >
                    {{ $t("Global.current_location") }}
                </button>
            </div>
            <GMapMap
                :center="center"
                :zoom="8"
                map-type-id="terrain"
                style="width: 100%; height: 380px"
            >
                <GMapMarker
                    @dragend="getPositionmarker($event)"
                    :position="center"
                    :draggable="props.isDraggable"
                    :icon="{
                        url: markerImage,
                        scaledSize: { width: 20, height: 35, f: 'px', b: 'px' },
                    }"
                />
            </GMapMap>
            <div class="flex-group-me mt-4" v-if="!props.submit_location">
                <button type="button" class="custom-btn bold" @click="closeModal">
                    {{ $t("Auth.confirmation") }}
                </button>
            </div>
        </div>
    </Dialog>
</template>


<script setup>
import { useAuthStore } from "~/stores/auth";
const store = useAuthStore();
const { sendLatLng } = store;
import markerImage from "@/assets/images/marker.png";


// props

const props = defineProps({
        show_inputs: Boolean,
        lat: Number,
        lng: Number,
        title: String,
        current_location: Boolean,
        closeModal_btn: Boolean,
        AutoComplete: Boolean,
        submit_location: Boolean,
        isDraggable: Boolean,
        resetTitle: Boolean,
        CurrentTitle: String,
        mapAddress: String,
        shouldUpdateData: {
            type: Boolean,
            default: true
        }
    });



// refs

const address = ref(props.mapAddress);
const titleName = ref(props.CurrentTitle);
const selectedAddress = ref(null);
const lat = ref(null);
const lng = ref(null);
// const address = ref('');
const center = ref({ lat: 24.7135517, lng: 46.6752957 });

const emit = defineEmits(["updateAddress"]);

const closeDialog = () => {
    emit("handleClose");
}

const closeModal = () => {
    emit("closeModal", titleName.value);
    lat.value = center.value.lat;
    lng.value = center.value.lng;
    if (props.shouldUpdateData) {
        sendLatLng(center.value.lat, center.value.lng, address.value, selectedAddress.value);
    }
};

// const props = defineProps(["show_inputs", "lat", "lng", "title", "current_location", "closeModal_btn", "AutoComplete", "submit_location", "isDraggable", "shouldUpdateData"]);

// watch props changes to update center
watch(() => [props.lat, props.lng], ([newLat, newLng]) => {
    if (typeof newLat === 'number' && typeof newLng === 'number' && isFinite(newLat) && isFinite(newLng)) {
        center.value = { lat: newLat, lng: newLng };
    }
}, { immediate: true });

watch(
    () => props.CurrentTitle,
    (newVal) => {
        titleName.value = newVal;
    },
    { immediate: true }
);

watch(() => props.mapAddress, (newVal) => {
    address.value = newVal;
}, { immediate: true });

// delete title on reset
watch(() => props.resetTitle, (newVal) => {
    if (newVal) {
        titleName.value = newVal;
    }
}, { immediate: true });

function getLanguage() {
    const locale = localStorage.getItem("locale");
    return (locale === null || locale === "ar") ? "ar" : "en";
};

function setPlace(e) {
    address.value = e.formatted_address;
    lat.value = e.geometry.location.lat();
    lng.value = e.geometry.location.lng();

    let city = '';
    let country = '';

    if (e.address_components) {
        e.address_components.forEach(component => {
            if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
                city = component.long_name;
            }
            if (component.types.includes('country')) {
                country = component.long_name;
            }
        });
    }

    selectedAddress.value = `${country}, ${city}`;

    center.value.lat = e.geometry.location.lat();
    center.value.lng = e.geometry.location.lng();

    emit("updateAddress", address.value);
    handleMapUpdate(center.value.lat, center.value.lng, address.value);
}

function getPositionmarker(e) {
    center.value.lat = e.latLng.lat();
    center.value.lng = e.latLng.lng();
    
    // location.value.lat = e.latLng.lat();
    // location.value.lng = e.latLng.lng();
    getaddressfromlatlng();
}

function getaddressfromlatlng() {
    const geocoder = new google.maps.Geocoder();
    const language = getLanguage();
    geocoder.geocode(
        { location: center.value, language: language },
        (results, status) => {
            if (status === "OK" && results[0]) {
                address.value = results[0].formatted_address;

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

                selectedAddress.value = `${country}, ${city}`;

                document.querySelector(".pac-target-input").value = results[0].formatted_address;
                emit("updateAddress", address.value);
                handleMapUpdate(center.value.lat, center.value.lng, address.value);
            } else {
                address.value = "No results found";
            }
        }
    );
}

function getCurrentLocatoin() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                center.value.lat = position.coords.latitude;
                center.value.lng = position.coords.longitude;
                lat.value = position.coords.longitude;
                lng.value = position.coords.longitude;
                getaddressfromlatlng();
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

onMounted(() => {
  if (props.current_location) {
    getCurrentLocatoin();

  }
  
});

watch(() => props.current_location, (newVal) => {
  if (newVal) {
    getCurrentLocatoin();
  }
});


// function to handle map update lat and lng
function handleMapUpdate(newLat, newLng, newAddress) {
    center.value = { lat: newLat, lng: newLng };
    address.value = newAddress;
    emit('updateAddress', { lat: newLat, lng: newLng, address: newAddress });
}

</script>


<style lang="scss">

    .dirmain {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        .main_input {
            width: 100%;
        }
    }

    .main_input {
        &.search_here {
            border: 1px solid #eee;
            background-color: #eee;
        }
    }

    .flex-group-me {
        justify-content: center;
    }
    .map_search_img {
        height: 30px;
        width: 30px;
        position: absolute;
        top: 50%;
        transform: translate(0%, -50%);
    }
</style>

<style lang="scss">
    // hidden close modal button
    .map_style {
        .p-dialog-header {
            .p-dialog-header-icons {
                display: none;
            }
        }

    }
</style>
