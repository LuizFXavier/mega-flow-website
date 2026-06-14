<script setup lang="ts">
import TheMemberCreateModal from '@/components/membersPage/modal/TheMemberCreateModal.vue';
import TheMemberDetailModal from '@/components/membersPage/modal/TheMemberDetailModal.vue';
import TheMemberHeader from '@/components/membersPage/TheMemberHeader.vue';
import TheMemberList from '@/components/membersPage/TheMemberList.vue';
import TheProfileEditModal from '@/components/TheProfileEditModal.vue';
import BaseLayout from '@/layout/BaseLayout.vue';
import { memberService } from '@/services/memberService';
import { useMemberStore } from '@/stores/memberStore';
import { useProjectStore } from '@/stores/projectStore';
import type { CreatedMember, Member } from '@/types/Member';
import { onMounted, ref, type Ref } from 'vue';


const projectStore = useProjectStore();

const isCreateModalOpen:Ref<boolean> = ref<boolean>(false);
const isDetailModalOpen:Ref<boolean> = ref<boolean>(false);
const isEditProfileModalOpen:Ref<boolean> = ref<boolean>(false);

const members:Ref<Member[]> = ref<Member[]>([]);

const matchedMembers:Ref<Member[]> = ref<Member[]>([]);

const memberStore = useMemberStore();

const emit = defineEmits(['openProfileEdit']);

function handleCreation(member:Member){
    members.value.push(member);
}

async function handleDelete(index:number){
    matchedMembers.value.splice(index, 1);
    members.value = await memberService.getAllMembers();
}

async function handleSearch(input:string){
    
    matchedMembers.value = await memberService.searchMembersByName(input);
    
}

function clearSearch(){
    matchedMembers.value = members.value;
}

function openEditModal(){
    
    isEditProfileModalOpen.value = true;
}
    
onMounted(async ()=>{
    
    // Primeiro recuperar os projetos para que tenha o que se percorrer quando os membros carregarem
    await projectStore.setupProjects();

    await memberStore.setupMembers();
    await memberStore.setupMembersPhotos();

    members.value = memberStore.getMemberArray();
    matchedMembers.value = members.value;
})
</script>

<template>
    <BaseLayout>
        <template v-slot:header>

            <TheMemberHeader
                @open-create-modal="isCreateModalOpen = true"
                @search="handleSearch"
                @clear-search="clearSearch"/>

        </template>
        
        <TheMemberList :members="matchedMembers" 
                        @open-detail-modal="isDetailModalOpen = true"
                        @open-edit-modal="openEditModal"/>
        
    </BaseLayout>
    <TheMemberCreateModal @close="isCreateModalOpen = false" v-if="isCreateModalOpen"
                            @create-member="handleCreation"/>

    <TheMemberDetailModal @close="isDetailModalOpen = false" v-if="isDetailModalOpen"/>

    <TheProfileEditModal v-if="isEditProfileModalOpen"
                         @close="isEditProfileModalOpen = false"
                         @delete-member="handleDelete"/>
</template>