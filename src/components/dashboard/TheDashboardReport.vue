<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { type Participant } from '@/types/Participant';
import DashboardReportItem from './DashboardReportItem.vue';
import TheSearchBar from '../TheSearchBar.vue';
import { computed, ref } from 'vue';

const userStore = useUserStore();

interface Props{
    projects:Participant[],
    memberIsLeader:Set<string>
}

const searchInput = ref('');


const filteredProjects = computed(() => {
  
  if (!searchInput.value.trim()) {
    return projects;
  }

  const termo = searchInput.value.toLowerCase();

  return projects.filter(project =>
    
    project.projeto.titulo.toLowerCase().includes(termo)
  );
});

const {projects, memberIsLeader} = defineProps<Props>();

function getRole(participant:Participant):string{

    let role = roleMap.get(participant.funcao)!;

    const id = participant.projeto.id;

    if(memberIsLeader!.has(id)){
        role += '/Líder'
    }

    return role;
}

const roleMap = new Map<string, string>([
    ["LEADER", "Líder"],
    ["FRONT_END", "Front-end"],
    ["BACK_END", "Back-end"],
    ["DESIGN", "Designer"]
])

const statusMap = new Map<string, string>([
    ["CANCELADO", "Cancelado"],
    ["EM_ANDAMENTO", "Em andamento"],
    ["NAO_INICIADO", "Não iniciado"],
    ["CONCLUIDO", "Concluído"]
])

</script>
<template>
    <section class="h-full w-full flex flex-col">

        <header class="w-full
                       border-b border-b-gray-border
                       h-12/100
                       flex flex-row
                       ">
            <div class="flex flex-col pt-1 pl-3 w-1/4">
                <h1 class="text-base">
                    Meus projetos
                </h1>
                <h2 class="text-sm text-gray-500">
                    Acompanhe progresso e status
                </h2>
            </div>
            
            <div v-if="projects.length > 0"
                class="flex 
                        p-3
                        w-1/2">
                <TheSearchBar :text="'Buscar Projeto'" v-model="searchInput"/>
            </div>
            <div class="w-1/4"></div>
        </header>

        <table v-if="projects.length > 0" class="w-full">
            <thead class = "justify-items-start
                            border-y border-gray-border
                            text-lg
                            ">
                <tr>
                <th class="text-left
                           w-35/100
                           pl-5
                           py-1">PROJETOS</th>
                <th class="text-center w-30/100">CARGO</th>
                <th class="text-center w-35/100">ANDAMENTO</th>
                </tr>
            </thead>
            <tbody v-for="p in filteredProjects">
                <DashboardReportItem :titulo="p.projeto.titulo"
                                     :cargo="getRole(p)"
                                     :andamento="statusMap.get(p.projeto.status)!"
                                     :dataAtualizacao="p.projeto.dataAtualizacao"/>
            </tbody>
        </table>
        <div v-else class= "w-full h-full
                            flex place-items-center
                            justify-center">
            <div class="h-1/2">

                <p class = "text-center
                            text-[1.75rem]">
                    Você ainda não está participando de nenhum projeto.
                    Entre em <br> contato com seu diretor para ser alocado.
                </p>
            </div>
        </div>
    </section>
</template>