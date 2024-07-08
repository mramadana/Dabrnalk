<template>
    <div>
        <div class="row">
            <div class="col-12 col-xl-6 mb-5">
                <div class="main-box">
                    <img src="@/assets/images/weAreWe.png" loading="lazy" alt="we-are-img" class="we-are-img">
                </div>
            </div>
            <div class="col-12 col-xl-6 mb-5">
                <h1 class="main-title bold mb-5">
                    <img src="@/assets/images/we-are-sm.png" loading="lazy" alt="branches-img" class="branches-img">
                    {{ $t("Home.whoarewe") }}
                </h1>

                <p class="main-text mb-4" v-if="WeAreWe?.length">{{ WeAreWe }}</p>

                <div v-if="loading">
                    <Skeleton class="rounded-2 mb-4" width="80%" height="15px"></Skeleton>
                </div>

                <div class="weare-info mb-5">
                    <div class="itme-we-are">
                        <div class="hint"><i class="fas fa-check"></i></div>
                        <p class="main-disc" v-html="WeAreDesc.desc1"></p>
                    </div>
                    <div class="itme-we-are">
                        <div class="hint"><i class="fas fa-check"></i></div>
                        <p class="main-disc" v-html="WeAreDesc.desc2"></p>
                    </div>
                    <div class="itme-we-are">
                        <div class="hint"><i class="fas fa-check"></i></div>
                        <p class="main-disc" v-html="WeAreDesc.desc3"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    const props = defineProps({
        WeAreWe: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean,
            default: false,
        },
    });

    import { useI18n } from 'vue-i18n';

    const { t } = useI18n({ useScope: 'global' });


    const WeAreDesc = {
        desc1: t("Home.available_cars"),
        desc2: t("Home.experience_car"),
        desc3: t("Home.available_models")
    }
</script>

<style lang="scss" scoped>

    .main-box {
        @media (max-width: 550px) {
        text-align: center;
        }
    }

    .we-are-img {
        width: auto;
        object-fit: cover;
        height: 400px;
        @media (max-width: 768px) {
            height: 300px;
        }
        @media (max-width: 550px) {
           height: 200px;
        }
    }

    .branches-img {
        width: auto;
        height: 20px;
        margin-inline-end: 10px;
    }

    .itme-we-are {
        display: flex;
        &:not(:last-child) {
            margin-bottom: 15px;
        }
        .hint {
            border: 1px solid;
            font-size: 11px;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-inline-end: 10px;
        }
    }
</style>