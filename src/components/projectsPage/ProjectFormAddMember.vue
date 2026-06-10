<script setup lang="ts">
import { ref, type Ref } from 'vue';
import TheSearchBar from '../TheSearchBar.vue';
import ProjectFormMemberCard from './ProjectFormMemberCard.vue';
import { Member } from '@/types/Member';
import { memberService } from '@/services/memberService.ts';

const memberList:Ref<Member[]> = ref<Member[]>([]);

const name:Ref<string> = ref<string>('');

async function searchMembers(){
    memberList.value = await memberService.searchMembersByName(name.value);
    console.log("searching");
}

</script>
<template>
    <div class="bg-white
                border border-[#C2C2C2] rounded-xl
                flex flex-col
                h-full
                
                p-2
                ">
        <TheSearchBar @confirm="searchMembers"
                      v-model="name" 
                      text="Buscar membros"
                      class="sticky"></TheSearchBar>

        <div class="overflow-auto
                    flex flex-col
                    h-full
                    gap-2
                    p-2">
            <ProjectFormMemberCard v-for="member in memberList" :name="member.nome"/>
        </div>
    </div>
</template>