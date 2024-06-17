<template>
    <div>
        <div class="container">

            <h1 class="main-title normal lg text-center">{{ $t("Global.research_results") }}</h1>
    
            <!-- start to Branches -->
            <HomeBranch :branches="branches" :loading="loading"/>
        </div>
    </div>
</template>

<script setup>

    const branches = ref([
    {
        name: 'الفرع الرئيسي',
        address: 'الرياض',
        id: 1,
    },

    {
        name: 'الفرع الفرعى',
        address: 'الرياض',
        id: 2,
    },
    {
        name: 'الفرع الثاني',
        address: 'الرياض',
        id: 3,
    },
    {
        name: 'الفرع الثالث',
        address: 'بسم الله الرحمن الرحيم',
        id: 4,
    },
]);

</script>