<template>
    <div>
     
        <div class="row">

            <div class="col-12 col-md-6 col-xl-3 mb-5" v-for="branche in branches" :key="branche.id">
                <div class="Branche" v-if="!loading">
                    <img :src="branche.image" alt="branch-image" class="branch-image" loading="lazy">
                    <h4 class="main-title normal mb-2">{{ branche.name }}</h4>
                    <div class="info">
                        <h3 class="main-title normal gap-2 d-flex flex-wrap mb-0">
                            <i class="fa-solid fa-location-dot"></i>
                            <span>{{ branche.address }}</span>
                        </h3>
                        <nuxt-link :to="'/branches/' + branche.id"  @click="saveFormData(branche.id)" class="custom-btn smm">{{ $t('Global.show_more') }}</nuxt-link>
                    </div>
                </div>
            </div>

        </div>

        <!-- if no data -->
        <div class="nodata d-flex justify-content-center mb-5" v-if="branches?.length == 0 && !loading">
            <div class="radio-content">
                <img  loading="lazy" src="@/assets/images/no_data.avif" alt="image" class="no-data-img car-img">
                <div class="no-data-text">{{ nodataText }}</div>
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

    const defineProps = defineProps(['branches', 'loading', 'nodataText'])

    // save id to local storage

    const saveFormData = (id) => {
        localStorage.setItem('branch_id', id)
    }
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