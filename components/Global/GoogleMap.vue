<template>
    <Dialog
        modal
        :show_inputs="show_inputs"
        :lat="lat"
        :lng="lng"
        class="map_style"
    >
        <div class="modal-body-main modal-pad">
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
                <div class="position-relative w-100">
                    <img
                        src="@/assets/images/marker.png"
                        alt="input-img"
                        class="map_search_img"
                    />
                    <GMapAutocomplete
                        :placeholder="$t('Global.search_here')"
                        @place_changed="setPlace"
                        class="search_here main_input"
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
                style="width: 100%; height: 400px"
            >
                <GMapMarker
                    @dragend="getPositionmarker($event)"
                    :position="center"
                    :draggable="true"
                    :icon="{
                        url: markerImage,
                        scaledSize: { width: 20, height: 35, f: 'px', b: 'px' },
                    }"
                />
            </GMapMap>
            <div class="flex-group-me mt-4">
                <button
                    type="button"
                    class="custom-btn bold"
                    @click="closeModal"
                >
                    تاكيد
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
//refs
const titleName = ref();
const lat = ref(null);
const lng = ref(null);
const address = ref("");
const center = ref({ lat: 24.7135517, lng: 46.6752957 });
const emit = defineEmits();
const closeModal = () => {
    emit("closeModal", titleName.value);
    lat.value = center.value.lat;
    lng.value = center.value.lng;
    sendLatLng(center.value.lat, center.value.lng);
    console.log(lat.value, lng.value);
};
const props = defineProps(["show_inputs", "lat", "lng", "title"]);

// search places
if (props.show_inputs == true) {
    setTimeout(() => {
        getCurrentLocatoin();
    }, 200);
} else {
    center.value.lat = props.lat;
    center.value.lng = props.lng;
    console.log(props.lat, ' , ', props.lng)
}

function getLanguage() {
    const locale = localStorage.getItem("locale");
    return (locale === null || locale === "ar") ? "ar" : "en";
};

function setPlace(e) {
    // sended data to backend
    address.value = e.formatted_address;
    lat.value = e.geometry.location.lat();
    lng.value = e.geometry.location.lng();

    // change marker pos
    center.value.lat = e.geometry.location.lat();
    center.value.lng = e.geometry.location.lng();
}
// get lat , lng , address from change marker position
function getPositionmarker(e) {
    center.value.lat = e.latLng.lat();
    center.value.lng = e.latLng.lng();
    getaddressfromlatlng();
}

// getaddress from latlng
function getaddressfromlatlng() {
    const geocoder = new google.maps.Geocoder();
    const language = getLanguage();
    geocoder.geocode(
        { location: center.value, language: language },
        (results, status) => {
            if (status === "OK") {
                if (results[0]) {
                    address.value = results[0].formatted_address;

                    document.querySelector(".pac-target-input").value =
                        results[0].formatted_address;
                } else {
                    address.value = "No results found";
                }
            } else {
                address.value = "Geocoder failed due to: " + status;
            }
        }
    );
}
// get current location
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

</script>

<style lang="scss" scoped>
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
