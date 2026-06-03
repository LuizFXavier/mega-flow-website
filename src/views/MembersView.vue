<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import TheMemberHeader from '@/components/membersPage/TheMemberHeader.vue';
import TheSidebar from '@/components/sidebar/TheSidebar.vue';
import BaseLayout from '@/layout/BaseLayout.vue';
</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <TheMemberHeader/>
        </template>

    </BaseLayout>
</template>