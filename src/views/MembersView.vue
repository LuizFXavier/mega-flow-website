<script setup lang="ts">
import TheMemberCreateModal from '@/components/membersPage/modal/TheMemberCreateModal.vue';
import TheMemberHeader from '@/components/membersPage/TheMemberHeader.vue';
import TheMemberList from '@/components/membersPage/TheMemberList.vue';
import BaseLayout from '@/layout/BaseLayout.vue';
import { useMemberStore } from '@/stores/memberStore';
import { useProjectStore } from '@/stores/projectStore';
import { onMounted, ref, type Ref } from 'vue';

const memberStore = useMemberStore();

const projectStore = useProjectStore();

const isCreateModalOpen:Ref<boolean> = ref<boolean>(false);

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
            <TheMemberHeader
                @open-create-modal="isCreateModalOpen = true"/>
        </template>

        <TheMemberList/>
    </BaseLayout>
    <TheMemberCreateModal @close="isCreateModalOpen = false" v-if="isCreateModalOpen"/>
</template>