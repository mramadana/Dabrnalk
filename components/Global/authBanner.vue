<template>
    <div class="layout_Auth">
        <img src="@/assets/images/authBanner.png" alt="authbbaner" loading="lazy">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
    .layout_Auth {
        position: relative;
        padding: 40px 0;
        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        @media (max-width: 550px) {
            padding: 20px 0;
        }
    }
</style>