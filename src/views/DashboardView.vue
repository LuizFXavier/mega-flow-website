<script setup lang="ts">
import TheSidebar from '@/components/sidebar/TheSidebar.vue';
import TheDashboardHeader from '@/components/dashboard/TheDashboardHeader.vue';
import TheDashboardReport from '@/components/dashboard/TheDashboardReport.vue';
import BaseLayout from '@/layout/BaseLayout.vue';
import { onMounted, ref, type Ref } from 'vue';
import type { Participant } from '@/types/Participant';
import { projectService } from '@/services/projectService';
import { useUserStore } from '@/stores/userStore';

const memberProjects:Ref<Participant[]> = ref<Participant[]>([]);
const memberIsLeader:Ref<Set<string>> = ref<Set<string>>(new Set());

const userStore = useUserStore();

onMounted(async ()=>{
    const {participant, isLeader}  = await projectService.getMemberProjects(userStore.user.rga);
    
    memberProjects.value = participant;
    memberIsLeader.value = isLeader;
})

</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <TheDashboardHeader/>
        </template>

        <TheDashboardReport :projects="memberProjects" :member-is-leader="memberIsLeader"/>

    </BaseLayout>
</template>