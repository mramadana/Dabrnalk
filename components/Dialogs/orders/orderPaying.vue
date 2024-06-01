<template>
    <div class="container">
        <Dialog v-model:visible="orderpaying" modal class="custum_dialog_width" :draggable="false">
                
                <h1 class="text-center main-title bold mb-4">{{ $t('Global.complete_payment') }}</h1>
                <form @submit.prevent="submitData">

                    <div class="payment-items input-g">
    
                    <div class="payment-item mb-3" v-for="(pay, i) in paymentItems" :key="pay.id">
    
                        <input type="radio" name="pay_type" :value="pay.id" v-model="payment"
                            :id="`payment${i}`" class="payment-input" @change="handlepayId(pay.id)">
                        <label :for="`payment${i}`" class="payment-label">
    
                            <div class="right">
                                <img :src="pay.icon" alt="" class="payment-img">
                                <div class="content">
                                    <div class="name">{{ pay.name }}</div>
                                    <div class="text">{{ pay.desc }}</div>
                                </div>
                            </div>
    
                            <div class="circle"></div>
    
                        </label>
    
                    </div>
    
                    </div>
    
                    <div class="text-center">
                        <button type="submit" class="custom-btn sm d-inline-flex with_disabled" :disabled="!allRadiosChecked">
                          {{ $t('Global.pay_now') }}
                          <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
                        </button>
                    </div>
                </form>
                

        </Dialog>
    </div>
</template>


<script>

import image_1 from '@/assets/images/card.png';
import image_2 from '@/assets/images/wallet.png';


export default {
  props: ['orderId', 'loading'],
  data() {
    return {
      orderpaying: false,
      payment: null,
      paymentItems: [
        {
          id: 4,
          name: this.$t('Global.payment_electronically'),
          desc: this.$t('Global.pay_online'),
          icon: image_1
        },
        {
          id: 2,
          name: this.$t('Home.portfolio'),
          desc: this.$t('Global.pay_wallet'),
          icon: image_2
        }
      ]
    };
  },

  methods: {

    handlepayId(payId) {
      this.$emit('PaySelected', payId);
    },
    submitData() {
      // this.orderpaying = false;
      if (this.payment) {
            this.handlepayId(this.payment);
            this.$emit('paymentDone', true);
        }
    }
  },

  computed: {
    allRadiosChecked() {
      // Check if all radio buttons are checked
      return this.paymentItems.some(pay => pay.id === this.payment);
    }
  },
}
</script>
<style lang="scss">

.payment-items {
  display: grid;
  gap: 12px;
  padding: 20px;
  .payment-item {
    .payment-input {
      display: none;
    }

    .payment-label {
      padding: 10px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #F8F8F8;
      cursor: pointer;
      border-radius: 12px;
      border: 1px solid transparent;
      transition: all 0.4s ease;

      .right {
        display: flex;
        align-items: center;
        gap: 14px;

        .payment-img {
          max-width: 30px;
          max-height: 30px;
        }

        .name {
          color: #000;
          margin-bottom: 3px;
          display: block;
        }

        .text {
          color: #000;
          font-size: 12px;
          text-align: start;
        }
      }

      .circle {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 1px solid var(--main);
        opacity: 0;
        position: relative;
        transition: all 0.4s ease;

        &::after {
          content: "";
          height: 6px;
          width: 10px;
          border-left: 3px solid var(--main);
          border-bottom: 3px solid var(--main);
          border-radius: 1px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -60%) rotate(-45deg);
          transform-origin: center center;
        }
      }
    }
  }
}

.payment-item .payment-input:checked + .payment-label {
  background-color: #fff;
  border-color: var(--main);
}

.payment-item .payment-input:checked + .payment-label .circle {
  opacity: 1;
}

.payment-item .payment-input:checked + .payment-label {
    background-color: rgba(224, 148, 65, .2);
  border-color: transparent;
}

@media screen and (max-width: 425px) {
  .payment-item {
    width: 100%;
  }

  .payment-item .payment-label {
    padding: 18px 14px;
    width: 100%;
  }

  .payment-item .payment-label .right .name {
    font-size: 15px;
  }
}
</style>