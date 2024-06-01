<template>
    <div class="container">
        <Dialog v-model:visible="sent_Successfully" modal class="custum_dialog_width" :draggable="false">
                <div class="text-center">
                    <img src="@/assets/images/check.png" alt="check-img" class="check-img">
                    <h1 class="main-title bold mb-4">{{ $t('Global.congratulations_request') }}</h1>
                    <button class="custom-btn sm d-inline-flex" @click="sent_SuccessfullyFun">
                        {{ $t('Global.track_your_order') }}
                        <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
                    </button>
                </div>
        </Dialog>
    </div>
</template>

<script>
export default {
    props: ['orderId', 'loading'],
    data() {
        return {
            sent_Successfully: false
        };

    },
    methods: {
        sent_SuccessfullyFun() {
            this.$emit('sentSuccessfully', true);
        }
    },
}
</script>