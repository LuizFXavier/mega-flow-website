<script setup lang="ts">
import TheProjectHeader from '@/components/projectsPage/TheProjectHeader.vue';
import BaseLayout from '@/layout/BaseLayout.vue';

</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <TheProjectHeader/>
        </template>

    </BaseLayout>
</template>