<template>
    <div>
        <div class="container">
            <h1>Create Order</h1>

            <form>
                <div class="custom-width lg text-start">
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.rental_period') }}
                                </label>
                                <div class="main_input">
                                    <i class="fa-solid fa-key sm-icon"></i>
                                    <input @keypress="validDot" type="number" class="validInputs" valid="rental_period" name="rental_period" v-model="rentalPeriod" :placeholder="$t('Global.rental_period')">
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.rental_type') }}
                                </label>
                                <div class="flex justify-content-center dropdown_card main_input special-custom">
                                    <i class="far fa-calendar-alt sm-icon"></i>
                                    <Dropdown v-model="rent_type" :options="rent_types" optionLabel="name" :placeholder="$t('Auth.nationality')" class="w-full md:w-14rem custum-dropdown" />
                                </div>
                            </div>
                        </div>

                        <col-12 class="col-md-6">
                        <div class="position-relative">
                            <label class="label">{{ $t('Global.received_date') }}</label>
                            <div class=" main_input with_icon">
                                <i class="fas fa-calendar sm-icon"></i>
                                <flat-pickr v-model="calender_date" :config="config_a" class="select_date main_input custom-date"
                                :placeholder="$t('Global.select_received_date')"
                                name="date"
                                @on-change="change"
                                />
                                
                                <i class="fas fa-calendar static-btn"></i>
                            </div>
                        </div>
                        </col-12>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>

    import { useI18n } from 'vue-i18n';
    const { successToast, errorToast } = toastMsg();
    const { t } = useI18n({ useScope: 'global' }); 

    // flatpicker date import

    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';


    const rentalPeriod = ref(null);

    const rent_type = ref(null);

    const rent_types = ref([
        { name: 'Daily', code: 'daily' },
        { name: 'Weekly', code: 'weekly' },
        { name: 'Monthly', code: 'monthly' },
    ])

    // flatpicker date
    const calender_date = ref(null);
    const config_a = ref({
    wrap: true, // set wrap to true only when using 'input-group'
    altFormat: "Y-m-d",
    altInput: true,
    dateFormat: "Y-m-d",
    minDate: 'today',
    });

    // vaidate rental period
    const validDot = (evt) => {
        if (evt.key === '.' || evt.key === ',' || evt.key === 'e' || evt.key === 'E' || evt.key === '+' || evt.key === '-') {
            evt.preventDefault();
            errorToast(t(`validation.rentalPeriod`));
        }
    }
</script>