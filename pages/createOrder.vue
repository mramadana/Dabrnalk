<template>
    <div>
        <div class="container">
            <h1>Create Order</h1>

            <form>
                <div class="custom-width lg text-start">

                    <div class="row">

                        <div class="col-12 col-md-8 mb-4 mr-auto">
                            <div class="custom-btn">{{ $t('Global.hours_left_until_branch_closes') }}</div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.rental_period') }}
                                </label>
                                <div class="main_input">
                                    <i class="fa-solid fa-key sm-icon"></i>
                                    <input @keypress="validDot" type="number" class="validInputs custum-input-icon" valid="rental_period" name="rental_period" v-model="rentalPeriod" :placeholder="$t('Global.rental_period')">
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

                        <div class=" col-12 col-md-6">
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
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.return_date') }}
                                </label>
                                <div class="with_icon position-relative pointer">
                                    <Calendar
                                        class="main_input p-0 overflow-hidden"
                                        v-model="return_date"
                                        :placeholder="$t('Global.enter_return_date')"
                                        dateFormat="yy-mm-dd"
                                        readonly
                                    />
                                    <button class="static-btn" type="button"><i class="far fa-calendar-alt icon"></i></button>
                                </div>
                            </div>
                        </div>

                        <div class="col-12">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.discount_coupon') }}
                                </label>
                                <div class="main_input with_icon">
                                    <i class="fa-solid fa-percent"></i>
                                    <input type="text" class="validInputs custum-input-icon" valid="copon" name="copon" v-model="copon" :placeholder="$t('Global.discount_coupon')">
                                    <button type="button" class="static-btn custom">{{ $t('Global.activation') }}</button>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-8 mb-4 mr-auto">
                            <div class="custom-btn">{{ $t('Global.car_reservation_not_amount') }}</div>
                        </div>

                        <div class="col-12 col-md-8 mb-4 mr-auto">
                            <div class="custom-btn">{{ $t('Global.book_hours_inspection') }}</div>
                        </div>

                        <div class="col-12 col-md-8 mr-auto">
                            <button class="custom-btn w-100" type="submit">{{ $t('Global.complete_order') }}</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>

    definePageMeta({
        name : "Titles.create_order",
    });

    import { useI18n } from 'vue-i18n';
    const { successToast, errorToast } = toastMsg();
    const { t } = useI18n({ useScope: 'global' }); 

    // flatpicker date import

    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';


    const rentalPeriod = ref(null);

    const rent_type = ref(null);

    const rent_types = ref([
        { name: t(`Global.daily`), id: "daily" },
        { name: t(`Global.monthly`), id: "monthly" },
        { name: t(`Global.yearly`), id: "yearly" },
    ])

    const return_date = ref(null);

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

    const change = (e) => {
    console.log(...e);
    console.log(rent_type.value, "rent_type")
    return_date.value = new Date(...e);
    if (rent_type.value.id == 'daily') {
    return_date.value.setDate(
    return_date.value.getDate() + +rentalPeriod.value
    );
    } else if (rent_type.value.id == 'monthly') {
    return_date.value.setMonth(
    return_date.value.getMonth() + +rentalPeriod.value
    );
    } else if (rent_type.value.id == 'yearly') {
    return_date.value.setFullYear(
    return_date.value.getFullYear() + +rentalPeriod.value
    );
    }

    console.log(rent_type.value.id, "rent_type")
};
</script>

<style lang="scss" scoped>
    .static-btn {
        &.custom {
            padding: 3px 8px;
            border-radius: 5px;
            background-color: var(--main);
            color: var(--wh);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
        }
    }
</style>