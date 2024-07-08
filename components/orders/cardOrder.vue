<template>
    <div>
        <div class="row">
            <div class="col-12 col-xl-3 col-md-6 mb-5" v-for="order in orders" :key="order.id">
                <div class="order-box">
                    <img src="@/assets/images/order-img.jpg" loading="lazy" alt="order-img" class="order-img">
                    <div class="info">
                        <div class="head-title">
                            <h3 class="main-title normal mb-0"><span>{{ $t('Global.order_number') }}</span> : <span>{{ order.id }}</span></h3>
                            <span class="hint">{{ order.created_at }}</span>
                        </div>

                        <h4 class="order-info d-flex gap-1 flex-wrap mb-0">
                            <span>{{ $t('Order.service_provider') }}  :</span> 
                            <span>{{ order.provider.name }}</span>
                        </h4>
                        <div class="order-status">
                            <div class="status">
                                <i class="fas fa-x-ray"></i>
                                <span>{{ $t('Global.status') }}</span> : 
                                <div class="hint-status">
                                    <span v-if="order.status == 0">{{ $t('Order.new') }}</span>
                                    <span v-if="order.status == 1">{{ $t('Order.in_progress') }}</span>
                                    <span class="cl-red" v-if="order.status == 3 || order.status == 5">{{ $t('Order.canceled') }}</span>
                                    <span v-if="order.status == 4">{{ $t('Titles.finished') }}</span>
                                </div>
                            </div>
                            <nuxt-link class="order-link custom-btn smm" :to="'/orderDetails/' + order.id">
                                {{ $t('Global.show_more') }}
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
        transition: transform .3s ease-out;
        &:hover {
            transform: translatey(-10px) scale(1.02);
        }
        @media (max-width: 768px) {
            flex-direction: column;
        }
        .order-img {
            width: 100%;
            height: 128px;
            object-fit: cover;
            border-radius: 4px;
            margin-bottom: 12px;
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
                margin-top: 15px;
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
                    font-size: 13px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    height: 35px;
                    @media (max-width: 1024px) {
                       font-size: 12px;
                    }
                    i {
                        font-size: 11px;
                        color: var(--wh);
                    }
                    &:hover {
                        i {
                            color: var(--main);
                        }
                    }
                }
            }
        }

        .main-title {
            @media (max-width: 768px) {
                font-size: 14px;
            }
        }

        .order-info {
            font-size: 11px;
            color: #878787;
        }
    }
</style>