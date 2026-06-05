<script setup lang="ts">
import TheSidebar from '@/components/sidebar/TheSidebar.vue';
import TheDashboardHeader from '@/components/dashboard/TheDashboardHeader.vue';
import TheDashboardReport from '@/components/dashboard/TheDashboardReport.vue';
import BaseLayout from '@/layout/BaseLayout.vue';
import { onMounted, ref, type Ref } from 'vue';
import type { Participant } from '@/types/Participant';
import { projectService } from '@/services/projectService';
import { useUserStore } from '@/stores/userStore';

const projects:Ref<Participant[]> = ref<Participant[]>([]);

const userStore = useUserStore();

onMounted(async ()=>{
    projects.value = await projectService.getMemberProjects(userStore.user.rga);
})

</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <TheDashboardHeader/>
        </template>

        <TheDashboardReport :projects="projects"/>

    </BaseLayout>
</template>