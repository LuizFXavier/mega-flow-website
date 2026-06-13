<script setup lang="ts">
import type { Member } from '@/types/Member';
import MemberPhoto from '../MemberPhoto.vue';
import { useMemberStore } from '@/stores/memberStore';
import { computed, onMounted } from 'vue';
import { useProjectStore } from '@/stores/projectStore.ts';

interface Props{
    member:Member;
}
const {member} = defineProps<Props>();

const diretoriaMap = new Map<string, string>([
    ["PROJETOS", "Projetos"],
    ["ADM_FINANCEIRO", "ADM Financeiro"],
    ["COMERCIAL", "Comercial"],
    ["GENTE_E_GESTAO", "Gente e Gestão"],
    ["MARKETING", "Marketing"],
    ["VICE_PRESIDENCIA", "Vice-presidente"],
    ["PRESIDENCIA", "Presidente"],
    ["A_DEFINIR", "***"],
])

const memberStore = useMemberStore();
const projectStore = useProjectStore();

const visibleProjects = computed(()=>{
    return member.projects.slice(0,3);
})

function getProject(id:string){
    return projectStore.getProject(id);
}

</script>
<template>
    <div class="bg-[#CCCCCC]/50
                border
                border-[#B1B1B1]
                rounded-xl
                hover:bg-white 
                hover:shadow-2xl
                hover:border
                hover:border-[#7C7C7C]/40
                cursor-pointer
                relative
                flex flex-col
                place-items-center
                ">
        <div class="w-full h-1/6
                    absolute
                    bg-linear-to-r from-mega-light to-mega-dark
                    rounded-t-xl">
        </div>

        <section class="absolute 
                    w-3/4 h-full
                    place-items-center
                    flex flex-col
                    gap-1">

            <div class="w-full min-h-0 h-1/3
                    place-items-center
                    py-2
                    ">
                <div class="w-1/2 h-full
                            place-items-center
                            justify-center">

                    <MemberPhoto :photo-url="memberStore.getPhoto(member.rga)"
                                class="border-4 border-[#E2E2E2] bg-[#E2E2E2]"/>
                </div>
            </div>
            <h1 class="text-2xl">
                {{ member.nome }}
            </h1>
            
            <h2 class="text-[#767676] text-base">
                {{ diretoriaMap.get(member.diretoria) }}
            </h2>
            <div v-if="member.projects.length > 0">
                <h3 class="text-sm">
                    Projetos relacionados:
                </h3>
    
                <ul class="list-disc">
                    <li v-for="project in visibleProjects">
                        {{ getProject(project.id).titulo }}
                    </li>
                </ul>
            </div>
            
        </section>
    </div>
</template>