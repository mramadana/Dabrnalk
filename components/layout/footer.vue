<template>
    <footer class="footer">
      <div class="inner-footer">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-4 mb-4">
              <div class="img-footer">
                <NuxtLink to="/" class="footer-logo">
                  <img src="@/assets/images/logo.png" alt="logo" loading="lazy" />
                </NuxtLink>
                <p class="color-wh normal mb-0">هنا نص يمكن ان يستبدل هنا نص يمكن ان يستبدل هنا نص يمكن ان يستبدل هنا نص يمكن ان يستبدل هنا نص يمكن ان يستبدل</p>
              </div>
            </div>
  
            <div class="col-12 col-lg-3 mb-4 first-collapse">
              <div class="footer-links">
                <h4 :class="['foot-title', { active: activeIndex === 0 }]" @click="handleFootTitleClick(0)">
                  {{ $t("Home.quick_links") }}
                </h4>
                <div class="with-shape"></div>
                <div class="links" :class="{ active: activeIndex === 0 }">
                  <NuxtLink to="/" class="link"> - {{ $t("Home.home") }}</NuxtLink>
                  <NuxtLink to="/whoAreWe" class="link"> - {{ $t("Home.whoarewe") }}</NuxtLink>
                  <NuxtLink to="/myreservations" class="link"> - {{ $t("Home.myreservations") }}</NuxtLink>
                  <NuxtLink to="/Wallet" class="link"> - {{ $t("Home.portfolio") }}</NuxtLink>
                </div>
              </div>
            </div>
  
            <div class="col-12 col-lg-3 mb-4">
              <div class="footer-links">
                <h3 :class="['foot-title', { active: activeIndex === 1 }]" @click="handleFootTitleClick(1)">
                  {{ $t("Global.help_center") }}
                </h3>
                <div class="with-shape"></div>
                <div class="links" :class="{ active: activeIndex === 1 }">
                  <NuxtLink class="link" to="/terms">
                     - {{ $t("Auth.terms_and_conditions") }}
                  </NuxtLink>
                  <NuxtLink to="" class="link">
                    - {{ $t("Global.privacy_policy") }}
                  </NuxtLink>
                  <NuxtLink to="" class="link"> - 
                    {{ $t("Home.connect_us") }}
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-2 mb-4">
              <div class="footer-links without-arrow">
                <h3 :class="['foot-title', { active: activeIndex === 1 }]">
                  {{ $t("Global.download_application") }}
                </h3>
                <div class="with-shape"></div>
                <div class="links">
                  
                  <NuxtLink to="" class="link btn-app">
                    <img src="@/assets/images/020.png" loading="lazy" alt="google-img" />
                  </NuxtLink>
                  <NuxtLink to="" class="link btn-app">
                    <img src="@/assets/images/app-store.png" loading="lazy" alt="app-store"/>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="copy-right">
        <div class="footer-shape position-relative">
          <div class="with-shape lg"></div>
          <div class="with-shape lg"></div>
        </div>
          <div class="container inner">
            <h6 class="hint">
              {{ $t("Home.Design_programming") }}
              <NuxtLink to="https://aait.sa" target="_blank" class="hint-link">
                {{ $t("Home.awamer_alshabaka") }}
              </NuxtLink>
            </h6>
            <h6 class="hint">{{ $t("Home.copy_right") }}</h6>
          </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const activeIndex = ref(null);
  
  const handleFootTitleClick = (index) => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 768) {
      if (activeIndex.value === index) {
        activeIndex.value = null;
      } else {
        activeIndex.value = index;
      }
    }
  };

  
  </script>
  
  <style lang="scss">
    .inner-footer {
      background-color: var(--main-bg);
      padding: 35px 15px;
      @media (max-width: 550px) {
        padding: 30px 0 0;
      }
      .foot-title {
        color: var(--main);
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 13px;
        cursor: pointer;
      }
    
    }
    
    .copy-right {
      padding: 10px 0;
      background-color: var(--main);
      .inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 15px;
        .hint {
          color: var(--wh);
          font-size: 13px;
          margin-bottom: 0;
          flex-basis: 49%;
          @media (max-width: 768px) {
             flex-basis: 47%;
          }
          &:first-child {
            text-align: end;
          }
          @media (max-width: 325px) {
            font-size: 11px;
          }
        }
    
        @media (max-width: 550px) {
          justify-content: center;
        }
      }
    }
    
    .footer-logo {
      display: block;
      img {
        height: 100px;
        max-width: fit-content;
        margin-bottom: 20px;
        @media (max-width: 550px) {
          height: 75px;
        }
      }
    }
    
    .hint-link {
      color: var(--wh);
    }

    // .first-collapse {
    //   display: flex;
    //   justify-content: center;
    //   @media (max-width: 1024px) {
    //      justify-content: space-between;
    //   }
    // }

  </style>
  