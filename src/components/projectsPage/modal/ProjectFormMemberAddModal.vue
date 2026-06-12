<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import TheSearchBar from '../../TheSearchBar.vue';
import ProjectFormMemberCard from './ProjectFormMemberCard.vue';
import { Member } from '@/types/Member';
import { memberService } from '@/services/memberService.ts';
import { useMemberStore } from '@/stores/memberStore.ts';
import { Project } from '@/types/Project.ts';
import { useProjectStore } from '@/stores/projectStore.ts';

const memberStore = useMemberStore();

const memberList:Ref<Member[]> = ref<Member[]>(memberStore.getMemberArray());
const filteredMemberList:Ref<Member[]> = ref<Member[]>([]);

const name:Ref<string> = ref<string>('');

const project = defineModel<Project>('project');

const projectMembers = defineModel<Set<string>>('projectMembers');

const emit = defineEmits<{
  (e: 'addMember', rga: string): void
}>();

function addMemberToProject(rga:string){

  if(projectMembers.value?.has(rga))
    return;

  project.value?.membros.push({rga:rga, funcao:''});
  
  projectMembers.value?.add(rga);

  emit('addMember', rga);
}

watch(name, (newName) => {

  if (newName.length > 0){
    memberList.value = filteredMemberList.value;
  }
  else{
    filteredMemberList.value = []
    memberList.value = memberStore.getMemberArray();
  }
})

async function searchMembers(){
    filteredMemberList.value = await memberService.searchMembersByName(name.value);

    console.log("searching");
    memberList.value = filteredMemberList.value;
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
            <ProjectFormMemberCard v-for="member in memberList" 
                                    :name="member.nome"
                                    :photo-url="memberStore.getPhoto(member.rga)"
                                    class="cursor-pointer"
                                    @click="addMemberToProject(member.rga)">

              <h2>
                {{ member.cargo }}
              </h2>
            </ProjectFormMemberCard>
        </div>
    </div>
</template>