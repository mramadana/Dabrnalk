<template>

    <div>
        <div class="container">
            <form @submit.prevent="submitData" ref="createOrder">
                <div class="custom-width lg text-start">

                    <div class="row">
                        <div class="col-12 col-md-8 mb-4 mr-auto" v-if="carDetails.time.is_available == true">
                            <h1 class="custom-btn">
                                {{ $t('Global.hours_left') }} 
                                {{ carDetails.time.hours_left }} 
                                {{ $t('Global.until_branch_closes') }}
                            </h1>
                        </div>

                        <div class="col-12 col-md-6">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.rental_period') }}
                                </label>
                                <div class="main_input">
                                    <i class="fa-solid fa-key sm-icon"></i>
                                    <input @keypress="validDot" @input="OnRentalPeriod" type="number" class="validInputs custum-input-icon" valid="rental_period" name="duration" v-model="rentalPeriod" :placeholder="$t('Global.rental_period')">
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
                                    <Dropdown v-model="rental_type" :options="rental_types" @change="handleRentTypeChange" optionLabel="name" :placeholder="$t('Global.rental_type')" class="w-full md:w-14rem custum-dropdown" />
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
                                    ref="flatpickr"
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

                        <div class="col-12 col-md-6" v-if="user.type == 2 || user.type == 1">
                            <div class="form-group">
                                <label class="label">
                                    {{ $t('Global.car_count') }}
                                </label>
                                <div class="main_input">
                                    <i class="fa-solid fa-key sm-icon"></i>
                                    <input @keypress="validDot" type="number" class="validInputs custum-input-icon" valid_2="car_count" valid="carValid" name="quantity" :placeholder="$t('Global.car_count')">
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-6">
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
                            <button class="custom-btn w-100" type="submit">
                                {{ $t('Global.complete_order') }}
                                <span class="spinner-border spinner-border-sm" v-if="loading" role="status" aria-hidden="true"></span>
                            </button>
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

    // pinia store
    const store = useAuthStore();

    // get carDetails from Store
    const { carDetails, user } = storeToRefs(store);

    const { orderEnquiry } = store;

    const loading = ref(false);

    const createOrder = ref(null); 

    // flatpicker
    const flatpickr = ref(null);

    let showErrorToast = false;

    import { useI18n } from 'vue-i18n';
    const { successToast, errorToast } = toastMsg();
    const { t } = useI18n({ useScope: 'global' }); 

    // flatpicker date import

    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';

    const errors = ref([]);

    const rentalPeriod = ref(null);
    const rental_type = ref(null);

    const copon = ref(null);

    const rental_types = ref([
        { name: t(`Global.daily`), id: 0 },
        { name: t(`Global.monthly`), id: 1 },
        { name: t(`Global.yearly`), id: 2 },
    ])

    const return_date = ref(null);
    
    // flatpicker date
    const calender_date = ref(null);

    // flatpicker date
    const config_a = ref({
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: "Y-m-d",
        altInput: true,
        dateFormat: "Y-m-d",
        minDate: 'today',
        onOpen: (selectedDates, dateStr, instance) => {
            if (!rentalPeriod.value || !rental_type.value) {
                if (!showErrorToast) {
                    errorToast(t(`validation.rentalPeriod_and_type`));
                    showErrorToast = true;
                    setTimeout(() => {
                        showErrorToast = false;
                    }, 500); 
                }
                return_date.value = new Date();
                return_date.value = null; 
                instance.close();
            }
        }
    });

    // vaidate rental period
    const validDot = (evt) => {
    const input = evt.target.value;
    const validClss = evt.target
        if (
            evt.key === '.' || evt.key === ',' || evt.key === 'e' || evt.key === 'E' || evt.key === '+' || evt.key === '-' ||
            (input.length === 0 && evt.key === '0')
        ) {
            evt.preventDefault();
            if(validClss.getAttribute('valid') == 'rental_period') {
                errorToast(t(`validation.rentalPeriod`));
            } else if (validClss.getAttribute('valid_2') == 'car_count') {
                errorToast(t(`validation.car_count`));
            }
        }
    };

    // validation Function
    const validate = () => {
        let allInputs = document.querySelectorAll('.validInputs');
        for (let i = 0; i < allInputs.length; i++) {
            if (allInputs[i].value === '') {
                errors.value.push(t(`validation.${allInputs[i].getAttribute('valid')}`));
            };
            if(!rental_type.value) {
                errors.value.push(t(`validation.rental_type`));
            }

            if(!calender_date.value) {
                errors.value.push(t(`validation.receive_date`));
            }
        }
    }

    // change date function for flatpicker
    const change = (selectedDates) => {
        if (selectedDates.length === 0) return;

        return_date.value = new Date(selectedDates[0]);
        if (rental_type.value.id == 0) {
            return_date.value.setDate(return_date.value.getDate() + +rentalPeriod.value);
        } else if (rental_type.value.id == 1) {
            return_date.value.setMonth(return_date.value.getMonth() + +rentalPeriod.value);
        } else if (rental_type.value.id == 2) {
            return_date.value.setFullYear(return_date.value.getFullYear() + +rentalPeriod.value);
        }
        console.log(rental_type.value.id, "rental_type");
    }

    // change date function calculation on input
    const handleRentTypeChange = () => {
        if(calender_date.value) {
            change([calender_date.value]); // Call change method with the current calendar date value
        }
    }

    // on rental period change calculation 
    const OnRentalPeriod = () => {
        if(rentalPeriod.value || rental_type.value || calender_date.value) {
            handleRentTypeChange();
        }
    }

    const submitData = async () => {
        loading.value = true;
        const fd = new FormData(createOrder.value);
        fd.append('car_id', localStorage.getItem('car_id'));
        if(rental_type.value) {
            fd.append('rental_type', rental_type.value.id);
        }
        fd.append('receive_date', calender_date.value);
        validate();
        if (errors.value.length) {
            errorToast(errors.value[0]);
            loading.value = false;
            errors.value = [];
        } else {
            loading.value = true;
            const res = await orderEnquiry(fd);
            if(res.status == "success") {


            // Create an object to hold all form data
            const formData = {
                order_rental_type: rental_type.value.id,
                order_receive_date: calender_date.value,
                order_copon: copon.value,
            };
            
            // Convert the object to a JSON string
            const order_enquiry_storage = JSON.stringify(formData);
            
            // Save the JSON string into localStorage
            localStorage.setItem('formData_enquiry', order_enquiry_storage);

            console.log(order_enquiry_storage, "formDataString");

                successToast(res.msg);
                navigateTo("/CompleteOrder")
            } else {
                errorToast(res.msg);
            }

            loading.value = false;
        }
    }

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