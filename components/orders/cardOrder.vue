<template>
    <div>
        <div class="row">
            <div class="col-12 col-md-6 mb-5" v-for="order in orders" :key="order.id">
                <div class="order-box">
                    <img :src="order.car_image" loading="lazy" alt="order-img" class="order-img">
                    <div class="info">
                        <div class="head-title">
                            <h3 class="main-title mb-0"><span>{{ $t('Global.order_number') }}</span> : <span>{{ order.id }}</span></h3>
                            <span class="hint">{{ order.created_at }}</span>
                        </div>
                        <h4 class="order-info main-disc">{{ order.car_name }}</h4>
                        <div class="order-status">
                            <div class="status">
                                <i class="fas fa-x-ray"></i>
                                <span>{{ $t('Global.status') }}</span> : <span class="hint-status">{{ order.status_text }}</span>
                            </div>
                            <nuxt-link class="order-link" :to="'/orders/orderDetails/' + order.id">
                                {{ $t('Global.view_more') }}
                                <i class="fas fa-chevron-left"></i>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        orders: Array,
    },

}
</script>

<style lang="scss" scoped>
    .order-box {
        padding: 10px 15px;
        box-shadow: 0px 0px 4px 0px rgba(128, 128, 128, 20%);
        border-radius: 10px;
        display: flex;
        transition: transform .3s ease-out;
        &:hover {
            transform: translatey(-10px) scale(1.02);
        }
        @media (max-width: 768px) {
            flex-direction: column;
        }
        .order-img {
            width: 125px;
            height: 128px;
            object-fit: cover;
            border-radius: 10px;
            margin-inline-end: 20px;
            @media (max-width: 768px) {
                margin-inline-end: 0;
                width: 100%;
                margin: 0 auto 20px;
            }
        }
        .info {
            width: 100%;
            text-align: start;
            .head-title {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                .hint {
                    font-size: 12px;
                    color: #989898;
                }
            }
            .order-status {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-top: 15px;
                margin-top: 20px;
                border-top: 1px solid #dddddd;
                @media (max-width: 350px) {
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .status {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    color: #989898;
                    font-size: 14px;
                    .hint-status {
                        color: var(--main);
                    }
                    
                    @media (max-width: 1024px) {
                       font-size: 13px;
                    }
                }
                .order-link {
                    color: #000;
                    font-size: 14px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    @media (max-width: 1024px) {
                       font-size: 12px;
                    }
                    i {
                        font-size: 13px;
                        color: var(--main);
                    }
                }
            }
        }

        .main-title {
            @media (max-width: 768px) {
                font-size: 14px;
            }
        }
    }
</style>