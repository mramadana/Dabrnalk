<template>
    <div class="customLayout">
        <p>custom Layout 00000000</p>
        <p>{{ $t("home") }}</p>


        <div class="drop-down-content">
              <button class="web-lang active" @click="setArabic">
                العربية
              </button>
              <button class="web-lang" @click="setEnglish">الانجليزية</button>
        </div>

        <slot />
    </div>
</template>






<script setup>
import { ref, onMounted } from "vue";

function setEnglish() {
//   if (!process.server) {
// }
localStorage.setItem("locale", "en");
  location.reload();
}
function setArabic() {
//   if (!process.server) {
// }
localStorage.setItem("locale", "ar");

  location.reload();
}

onMounted(() => {
  if (localStorage.getItem("locale") == "en") {
    document.querySelector("body").classList.add("ltr");
  } else {
    document.querySelector("body").classList.remove("ltr");
  }
});
</script>

