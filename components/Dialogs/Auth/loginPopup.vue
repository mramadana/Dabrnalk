<template>
    <Dialog modal class="custum_dialog_width" :draggable="false">
            <div class="text-center">
                <img src="@/assets/images/error-img.png" loading="lazy" alt="error-img" class="error-img">
                <h1 class="main-title bold mb-4">{{ $t("Auth.for_members") }}</h1>
                <div class="section-btns mt-5">
                    <button type="button" class="custom-btn sm d-inline-flex" @click="GoHome">
                        {{ $t("Home.home") }}
                    </button>

                    <button type="button" class="custom-btn transparent sm d-inline-flex"
                        @click="GoSignIn">
                        {{ $t("Auth.login") }}
                    </button>
                </div>
            </div>
    </Dialog>
</template>

<script setup>

// pinia store
import { useAuthStore } from '~/stores/auth';
import { storeToRefs } from 'pinia';
const store = useAuthStore();

// access variable from pinia , to change it in dialog 
const { Globaldialog } = storeToRefs(store);

// when route to home 
const GoHome = () => {
    Globaldialog.value = false;
    setTimeout(() => {
        navigateTo("/");
    }, 200);
}

// when route to lgoin 
const GoSignIn = () => {
    Globaldialog.value = false;
    setTimeout(() => {
        navigateTo("/Auth/login");
    }, 200);
}

</script>

<style lang="scss">
.error-img {
    width: 135px;
    object-fit: cover;
    margin-bottom: 15px;
}
</style>