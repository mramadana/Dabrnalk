<template>
    <div>

        <div class="defaultLayout" :class="headerClass">
            <header class="header">
                <div class="top-header">
                    <div class="container">
                        <div class="inner-header">
                            <div class="filter-input">
                                <form>
                                    <div :class="['search-box', { show: isActive }]">
                                        <div class="main_input with_icon">
                                            <input type="search" class="input" :placeholder=" $t('Home.search') " />
                                            <button type="button" class="static-btn search-btn">
                                                <i class="fa-solid fa-magnifying-glass search-icon"></i>
                                            </button>
                                        </div>

                                        <!-- close icon to close the search by click -->
                                        <span class="responsive-filter" @click="addActiveClass">
                                            <i class="fa-solid fa-xmark"></i>
                                        </span>
                                    </div>
                                </form>

                                <span class="icon-filter" @click="addActiveClass">
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </span>
                            </div>
                            <div class="left-header">

                                <button class="dropdown dropdown-profile" v-if="isLoggedIn">
                                    <div class="profile-hint resp-icon" id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <img src="@/assets/images/user-image.png" loading="lazy" alt="login-image" class="login-img">
                                        <i class="fa-regular fa-user login-icon"></i>
                                        <p class="user-name notif-hint" v-if="user.name"> {{ $t("Auth.hello") }} {{ user.name }}</p>
                                    </div>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <nuxt-link class="dropdown-item" to="/profile">
                                            {{$t("Home.profile_personly")}}
                                        </nuxt-link>

                                        <nuxt-link class="dropdown-item" to="/settings">
                                            {{ $t("Home.settings") }}
                                        </nuxt-link>
                                        <nuxt-link class="dropdown-item" to="/Wallet">
                                            {{ $t("Home.portfolio") }}
                                        </nuxt-link>
                                        <nuxt-link class="dropdown-item" to="/myreservations">
                                            {{ $t("Home.myreservations") }}
                                        </nuxt-link>
                                        <div type="button" @click="logoutDialog = true" class="dropdown-item">
                                            {{ $t("Home.logout") }}
                                        </div>
                                    </ul>
                                </button>

                                <button class="notification transparent" v-if="isLoggedIn">
                                    <div class="notif-icon">
                                        <i class="fa-solid fa-location-dot resp-icon"></i>
                                        <span class="notif-hint">
                                            السعودية - الرياض
                                        </span>
                                        <div class="nof-cont" v-if="notifCount" :data-number="notifCount"></div>
                                    </div>
                                </button>

                                <NuxtLink  to="/Notifications" class="notification" v-if="isLoggedIn">
                                    <div class="notif-icon">
                                        <i class="fas fa-bell resp-icon"></i>
                                        <span class="notif-hint">
                                            {{ $t("Global.notification") }}
                                        </span>
                                        <div class="nof-cont" v-if="notifCount" :data-number="notifCount"></div>
                                    </div>
                                </NuxtLink>

                                <nuxt-link class="btn-login" to="/Auth/login" v-if="!isLoggedIn">
                                    <i class="fas fa-sign-in-alt sign-icon resp-icon"></i>
                                    <span class="login-text">
                                        <img src="@/assets/images/user-image.png" alt="login-image" class="login-img">
                                        {{$t("Auth.new_login")}}</span>
                                </nuxt-link>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="nav-header">
                    <div class="container">
                        <div class="inner">
                            <nuxtLink to="/" class="logo">
                                <img
                                    src="@/assets/images/logo.png"
                                    alt="logo"
                                />
                            </nuxtLink>
                            <ul class="nav-links" :class="{ active: navLinksActive }" >
                                <li>
                                    <NuxtLink to="/" class="link">
                                        {{ $t("Home.home") }}
                                    </NuxtLink>
                                </li>

                                <li>
                                    <nuxt-link class="link" to="/myreservations">
                                        {{ $t("Home.myreservations") }}
                                    </nuxt-link>
                                </li>

                                <li>
                                    <nuxt-link class="link" to="/Wallet">
                                            {{ $t("Home.portfolio") }}
                                    </nuxt-link>
                                </li>

                                <li>
                                    <NuxtLink to="/whoarewe" class="link">
                                        {{ $t("Home.whoarewe") }}
                                    </NuxtLink>
                                </li>

                                <li>
                                    <NuxtLink to="/connectUs" class="link">
                                        {{ $t("Home.connect_us") }}
                                    </NuxtLink>
                                </li>
                            </ul>

                            <div class="left">

                                <div class="dropdown drop-lang">
                                    <a
                                        class="dropdown-toggle hint-lang"
                                        href="#"
                                        data-bs-toggle="dropdown"
                                    >
                                        <i class="fas fa-globe icon"></i>
                                        <div v-if="htmlLang == ''">
                                            <p>العربية</p>
                                        </div>
                                        <div v-else>
                                            <p>
                                                {{
                                                    htmlLang === "ar"
                                                        ? "العربية"
                                                        : "english"
                                                }}
                                            </p>
                                        </div>
                                    </a>
            
                                    <ul class="dropdown-menu">
                                        <button
                                            class="dropdown-item"
                                            @click="switchLang('ar')"
                                        >
                                            العربيه
                                        </button>
                                        <button
                                            class="dropdown-item"
                                            @click="switchLang('en')"
                                        >
                                            English
                                        </button>
                                    </ul>
                                </div>
                                <button
                                    class="nav-btn"
                                    @click="handleClick"
                                    :class="{ active: navBtnActive }"
                                >
                                    <span></span><span></span><span></span>
                                </button>
                                <div
                                    class="nav-overlay"
                                    @click="handleOverlayClick"
                                    :class="{ show: navOverlayShow }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <!-- logout Dialog -->
            <Dialog
                v-model:visible="logoutDialog"
                modal
                class="custum_dialog_width"
                :draggable="false"
            >
                <div class="text-center">
                    <img
                        src="@/assets/images/noun_warning.png"
                        alt="check-img"
                        class="check-img"
                    />
                    <h1 class="main-title bold mb-4">
                        {{ $t("Global.sure_logout") }}
                    </h1>
                    <div class="section-btns mt-5">
                        <button
                            type="button"
                            class="custom-btn sm d-inline-flex"
                            @click="logoutDialog = false"
                        >
                            {{ $t("Home.retreat") }}
                        </button>
                        <button
                            type="button"
                            class="custom-btn logout sm d-inline-flex"
                            @click="logout"
                        >
                            {{ $t("Home.logout") }}
                        </button>
                    </div>
                </div>
            </Dialog>
        </div>

        <DialogsAuthLoginPopup v-model:visible="Globaldialog" />
    </div>

</template>


<script setup>

    import { useAuthStore } from '~/stores/auth';
    import { useGlobalStore } from '~/stores/global';

    // Toast
    const { successToast, errorToast } = toastMsg();

    // Axios
    const axios = useApi();
    
    // store
    const store = useAuthStore();

    const globalStore = useGlobalStore();

    const { user, isLoggedIn, token, Globaldialog } = storeToRefs(store);


    const { response } = responseApi();

    const { logoutHandler } = store;

    // notifications
    const notifCount = ref(null);
    const logoutDialog = ref(false);

    // config
    let config = {
    headers: {
        Authorization: `Bearer ${token.value}`
    }
};

// start to method 

const isActive = ref(false)

const addActiveClass = () => {
  isActive.value = !isActive.value
}

    const logout = async () => {
        
        // Get Returned Data From Store

        logoutDialog.value = false;
        const res = await logoutHandler();
        res.status == "success" ? successToast(res.msg) : errorToast(res.msg);
        localStorage.clear();
    }

    // notifCount

    // get notifications Count
    const getNotificationsCount = async () => {
        await axios.get('count-notifications', config).then(res => {
            if(response(res) == "success") {
                notifCount.value = res.data.data.count;
            }
        }).catch(err => {
            console.error(err);
        });
    };

    // watch token To Get The New User Data
    watch(token, async (newVal) => {
    if (newVal) {
        config = {
            headers: {
                Authorization: `Bearer ${newVal}`
            }
        }

        getNotificationsCount();
    } else {
        notifCount.value = 0;
    }
    });

    watch(notifCount, (newValue, oldValue) => {
      // If notifCount becomes empty or not 0, hide the element
      if (newValue == 0) {
        notifCount.value = null;
      }
    });

    const router = useRouter();

    router.afterEach(() => {
      getNotificationsCount();
      
    });

    onMounted( async () => {
       await getNotificationsCount();
    });
    
</script>

<script>

export default {
    data() {
        return {
            htmlLang: "",
            navBtnActive: false,
            navLinksActive: false,
            navOverlayShow: false,
            isActive: false,
        };
    },

    methods: {
        // logout() {
        //     localStorage.clear();
        //     this.logoutDialog = false;
        //     this.$router.push("/Auth/login");
        // },


        chageDir(dir) {
            let element = document.querySelector(".html_direction");
            element.setAttribute("lang", dir);
            if (dir === "ar") {
                element.setAttribute("dir", "rtl");
                this.htmlLang = dir;
            }
            if (dir === "en") {
                element.setAttribute("dir", "ltr");
                this.htmlLang = dir;
            }
        },
        switchLang(newLang) {
            const lang = useCookie('lang')
            if (newLang !== localStorage.getItem("locale")) {
                lang.value = newLang
                localStorage.setItem("locale", newLang);
                location.reload();
            }
        },

        handleClick() {
            this.navBtnActive = true;
            this.navLinksActive = true;
            this.navOverlayShow = true;
        },

        handleOverlayClick() {
            this.navBtnActive = false;
            this.navLinksActive = false;
            this.navOverlayShow = false;
        },
    },

    watch: {
    // Watch for changes in the route
    
    $route(to, from) {
      // Handle the event here
      console.log("Route changed:", to, from);
      this.handleOverlayClick();
    },
  },

    async mounted() {
        let sessionKey = localStorage.getItem("locale");

        window.sessionKey = localStorage.getItem("locale");
        if (sessionKey) {
            this.chageDir(localStorage.getItem("locale"));
        }
    },

    computed: {
        headerClass() {
            return {
                "remove-margin": this.shouldAddMarginBottom,
            };
        },
        shouldAddMarginBottom() {
            // Check if the current route is not the home page
            console.log("updated is Done");
            return this.$route.path.includes("Auth") === true;
        },
    },
};
</script>

<style lang="scss">
.remove-margin {
    margin-bottom: 0 !important;
}
.defaultLayout {
    position: sticky;
    top: 0;
    z-index: 1000;
    margin-bottom: 40px;
}
</style>
