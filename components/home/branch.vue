<template>
    <div>
     
        <div class="row mb-5 mt-5">
            <div class="col-12 col-md-6 col-xl-3 mb-4" v-for="branche in branches" :key="branche.id">
                <div class="Branche" v-if="!loading">
                    <img src="@/assets/images/branche-img.png" alt="branch-image" class="branch-image" loading="lazy">
                    <h4 class="main-title normal">{{ branche.name }}</h4>
                    <div class="info">
                        <h3 class="main-title normal gap-2 d-flex flex-wrap">
                            <i class="fa-solid fa-location-dot"></i>
                            <span>{{ branche.address }}</span>
                        </h3>
                        <nuxt-link :to="'/branche/' + branche.id" class="custom-btn smm">show more</nuxt-link>
                    </div>
                </div>
            </div>

        </div>

        <!-- if no data -->
        <div class="nodata d-flex justify-content-center" v-if="branche?.length == 0 && !loading">
            <div class="radio-content">
                <img  loading="lazy" src="@/assets/images/no_data.avif" alt="image" class="no-data-img car-img">
                <div class="no-data-text">{{ $t('Global.no_products') }}</div>
            </div>
        </div>
        
        <!-- loading -->
        <div class="d-flex align-items-center justify-content-between row" v-if="loading">
            <div v-for="i in 4" :key="i" class="col-md-4 col-xl-3 mb-4">
                <Skeleton height="170px" class="slider-img rounded-2"></Skeleton>
            </div>
        </div>
    </div>
</template>

<script setup>

    const defineProps = defineProps(['branches', 'loading'])

</script>

<style lang="scss" scoped> 
    .Branche {
        padding: 20px 15px;
        border: 1px solid #000000;
        border-radius: 3px;
        .branch-image {
            width: 180px;
            height: 80px;
            display: block;
            object-fit: cover;
            margin: 0 auto 15px;
            @media (max-width: 550px) {
                width: 170px;
                height: 80px;
            }
        }

        .info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
        }
    }
</style>