<template>
    <section>
        <div v-if="!loading">

            <div class="slider" dir="ltr" v-if="slider?.length">
                <Carousel :value="slider" :responsiveOptions="responsiveOptions" :autoplayInterval="4000" class="dir-slider">
                    <template #item="slotProps">
                        <img :src="slotProps.data.image" loading="lazy" alt="slider-img" class="slider-img">
                    </template>
                </Carousel>
            </div>
    
            <div class="no-data" v-else>
                <img  loading="lazy" src="@/assets/images/no_data.avif" alt="image" class="no-data-img">
                <div class="no-data-text">{{ $t('Global.imgs') }}</div>
            </div>
            
        </div>
        
        <div v-if="loading">
            <Skeleton width="100%" height="480px" class="slider-img rounded-0"></Skeleton>
            <img  loading="lazy" src="@/assets/images/black_logo.png" alt="image" class="login_logo sm position">
        </div>
    </section>
</template>


<script setup>
    const props = defineProps({
    slider: {
        type: Array,
        required: true
    },
    loading: {
        type: Boolean,
        default: false,
    },
});
</script>
