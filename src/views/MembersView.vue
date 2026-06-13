<script setup lang="ts">
import TheMemberHeader from '@/components/membersPage/TheMemberHeader.vue';
import TheMemberList from '@/components/membersPage/TheMemberList.vue';
import BaseLayout from '@/layout/BaseLayout.vue';
import { useMemberStore } from '@/stores/memberStore';
import { useProjectStore } from '@/stores/projectStore';
import { onMounted } from 'vue';

const memberStore = useMemberStore();

const projectStore = useProjectStore();

onMounted(async ()=>{
    
    // Primeiro recuperar os projetos para que tenha o que se percorrer quando os membros carregarem
    await projectStore.setupProjects();

    await memberStore.setupMembers();
    await memberStore.setupMembersPhotos();
})
</script>

<template>
    <BaseLayout>
        <template v-slot:header>
            <TheMemberHeader/>
        </template>

        <TheMemberList/>
    </BaseLayout>
</template>