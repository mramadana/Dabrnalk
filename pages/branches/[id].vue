<template>
    <div>
        <div class="container">

            <img  src="@/assets/images/change-email.png" loading="lazy" alt="car-img" class="car-img w-100">

            <!-- <div v-if="loading">
                <skeleton width="100%" height="250px" class="mb-4" />
            </div> -->

            <div class="branch-info mb-5">
                <h4 class="main-title bold mb-0">اسم الفرع</h4>
                <div class="branch-details">
                    <div class="work-time">
                        <i class="far fa-clock"></i>
                        مواعيد العمل
                    </div>

                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i>
                        موقع الفرع
                    </div>
                </div>
            </div>

            <h1 class="main-title bold mb-4"> {{ $t("Global.categories_branch") }}</h1>

            <div class="row">
                <div class="col-12 col-xl-3 col-md-6 mb-5" v-for="branch in branchs" :key="branch.id">
                    <nuxt-link to="/cars" class="branch-box">
                        <img src="@/assets/images/branche-img.png" loading="lazy" alt="branch-image" class="branch-image">
                        <h3 class="branch-name">{{ branch.name }}</h3>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const { id } = useRoute().params;

    const branchs = ref([
        {
            id: 1,
            name: "الفرع الاول",
        },
        {
            id: 2,
            name: "الفرع الاول",
        },
        {
            id: 3,
            name: "الفرع الاول",
        },
        {
            id: 4,
            name: "الفرع الاول",
        },
        {
            id: 5,
            name: "الفرع الاول",
        }
    ]);
</script>

<style lang="scss" scoped>
.branch-info {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    .branch-details {
        display: flex;
        gap: 40px;
        flex-wrap: wrap;
        .work-time, .location {
            display: flex;
            align-items: center;
            gap: 5px;
            i {
                color: var(--main);
            }
        }
    }
}
.car-img {
    height: auto;
    max-height: 300px;
    object-fit: cover;
    border-radius: 10px;
    margin-bottom: 30px;
    border: 1px solid #262626;
}

.branch-box {
    display: block;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #dddddd;
    .branch-image {
        width: 100%;
        height: 180px;
        object-fit: cover;
        margin-bottom: 15px;
        @media (max-width: 550px) {
            height: 150px;
        }
    }

    .branch-name {
        font-size: 17px;
        color: var(--main);
        padding: 0 10px 5px;
    }
}

</style>