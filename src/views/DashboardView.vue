<script setup lang="ts">
import TheSidebar from '@/components/sidebar/TheSidebar.vue';
import TheDashboardHeader from '@/components/dashboard/TheDashboardHeader.vue';
import TheDashboardReport from '@/components/dashboard/TheDashboardReport.vue';
import BaseLayout from '@/layout/BaseLayout.vue';

</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <TheDashboardHeader/>
        </template>

        <TheDashboardReport/>

    </BaseLayout>
</template>