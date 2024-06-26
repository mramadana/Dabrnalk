import { defineStore } from "pinia";

// Axios
const axios = useApi();

// success response
const { response } = responseApi();

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: {
      phone: "",
      country_code: "",
    },
    token: null,
    isLoggedIn: false,
    newPhone: null,
    notificationToken: null,
    test: 'test key',
    currentemail: null,
    currentPasword: null,
    Globaldialog: false,
    lat: null,
    lng: null,
    visible: false,
    address: null,
    selectedAddress: null,
    carDetails: null,
    order_enquiry_data: null
  }),


  actions: {

    // Sign In
    async signInHandler(formData) {
      const resData = await axios.post("sign-in", formData);
      console.log(resData.data.key);
      if (resData.data.key == "needActive") {
        navigateTo("/Auth/activateAccount");
      }
      if (response(resData) == "success") {
        this.user = resData.data.data;
        this.token = resData.data.data.token;
        this.isLoggedIn = true;
        // navigateTo("/");
        return { status: "success", msg: resData.data.msg };
      } else {
        return { status: "error", msg: resData.data.msg };
      }

    },

    // Sign Up
    async signUpHandler(formData) {
      const resData = await axios.post("sign-up", formData);
      if (response(resData) == "success") {
        this.user = resData.data.data;
        navigateTo("/Auth/activateAccount");
        return { status: "success", msg: resData.data.msg };
      } else {
        return { status: "error", msg: resData.data.msg };
      }
    },

    // Verification Code
    async verificationHandler(formData) {
      const resData = await axios.post("activate?_method=patch", formData);
      if (response(resData) == "success") {
        this.token = resData.data.data.token;
        // this.isLoggedIn = true;
        navigateTo("/Auth/register");
        return { status: "success", msg: resData.data.msg };
      } else {
        return { status: "error", msg: resData.data.msg };
      }
    },

    // user-complete-account

    async completeAccountHandler(formData) {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };
      const resData = await axios.post("user-complete-account", formData, config);
      if (response(resData) == "success") {
        this.user = resData.data.data;
        this.isLoggedIn = true;
        
        // navigateTo("/");

        // open pop up google map 

        return { status: "success", msg: resData.data.msg };
      } else {
        return { status: "error", msg: resData.data.msg };
      }
    },

    // update Profile
    async profileHandler(formData) {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };

      const resData = await axios.post(
        "update-profile?_method=put",
        formData,
        config
      );
      if (response(resData) == "success") {
        this.user = resData.data.data;
        return { status: "success", msg: resData.data.msg };
        
      } else {
        return { status: "error", msg: resData.data.msg };
      }
    },

    // New Phone
    async phoneHandler(formData, newPhone) {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };

      const resData = await axios.post(
        "change-phone-send-code",
        formData,
        config
      );
      if (response(resData) == "success") {
        this.newPhone = newPhone;
        navigateTo("/mobileActivateCode");
        return { status: "success", msg: resData.data.msg };
      } else {
        return { status: "error", msg: resData.data.msg };
      }
    },

    // Logout
    async logoutHandler() {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };

      const resData = await axios.delete("sign-out", config);
      if (
        response(resData) == "success" ||
        response(resData) == "blocked" ||
        response(resData) == "unauthenticated"
      ) {
        this.token = null;
        this.user = {
          phone: "",
          country_code: "",
        };
        this.isLoggedIn = false;

        this.lat = null;
        this.lng = null;
        navigateTo("/Auth/login");
        return { status: "success", msg: resData.data.msg };
      } else {
        return { status: "error", msg: resData.data.msg };
      }

    },

    // delete account
    async deleteAccountHandler() {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };

      const resData = await axios.post("delete-account", '' ,config);
      if (
        response(resData) == "success" ||
        response(resData) == "blocked" ||
        response(resData) == "unauthenticated"
      ) {
        this.token = null;
        this.user = {
          phone: "",
          country_code: "",
          image: null,
          email: null,
          name: null
        };
        this.isLoggedIn = false;
        return { status: "success", msg: resData.data.msg };
      } else {
        return { status: "error", msg: resData.data.msg };
      }
    },

    // change mail
    async changeMailHandler(formData, currentemail, currentPasword) {
      const config = {
        headers: { Authorization: `Bearer ${this.token}` },
      };

      const resData = await axios.post(
        "change-email-send-code",
        formData,
        config
      );
      if (response(resData) == "success") {
        this.currentemail = currentemail;
        this.currentPasword = currentPasword;
        navigateTo('/emailActivateCode');
        return { status: "success", msg: resData.data.msg };
      } else {
        return { status: "error", msg: resData.data.msg };
      }
    },
    

    // get Car Details
    async car_detailshandler (curentID) {
      const resData = await axios.get(`car-details?car_id=${curentID}`);
      if (response(resData) === "success") {
        this.carDetails = resData.data.data;
        return { status: "success", msg: resData.data.msg };
      } else {
        return { status: "error", msg: resData.data.msg };
      }
    },


    // get order-enquiry data

    async orderEnquiry(formData) {
      const resData = await axios.post("order-enquiry", formData);
      if (response(resData) == "success") {
        this.order_enquiry_data = resData.data.data;
        return { status: "success", msg: resData.data.msg };
      } else {
        return { status: "error", msg: resData.data.msg };
      }

    },


    async sendLatLng(lat, lng , address , selectedAddress) {
      this.lat = Number(lat);
      this.lng = Number(lng);
      this.address = address;
      this.selectedAddress = selectedAddress
    }
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
    }),
  },
});
