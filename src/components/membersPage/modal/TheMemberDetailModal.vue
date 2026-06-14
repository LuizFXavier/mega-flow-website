<script setup lang="ts">
import { CreatedMember, Member } from '@/types/Member.ts';
import AppModal from '../../AppModal.vue';
import MemberPhoto from '../../MemberPhoto.vue';
import { useMemberStore } from '@/stores/memberStore.ts';
import MemberDetailModalProjectItem from './MemberDetailModalProjectItem.vue';


const diretoriaMap = new Map<string, string>([
    ["A_DEFINIR", "A definir"],
    ["PROJETOS", "Projetos"],
    ["ADM_FINANCEIRO", "ADM Financeiro"],
    ["COMERCIAL", "Comercial"],
    ["GENTE_E_GESTAO", "Gente e Gestão"],
    ["MARKETING", "Marketing"],
    ["VICE_PRESIDENCIA", "Vice-presidente"],
    ["PRESIDENCIA", "Presidente"],
]);

const emit = defineEmits(['close']);

const memberStore = useMemberStore();

const cargoMap = new Map<string, string>([
    ["MEMBRO", "Membro"],
    ["DIRETOR", "Diretor"],
    ["ADMINISTRADOR", "Administrador"]
])

const roleMap = new Map<string, string>([
    ["LEADER", "Líder"],
    ["FRONT_END", "Front-end"],
    ["BACK_END", "Back-end"],
    ["DESIGN", "Designer"]
])

function closeModal(){
    emit('close');
}

function getPhoto(){
    return memberStore.getPhoto(memberStore.focusedMember!.rga);
}

function focusedMember(){
    return memberStore.focusedMember!
}

function dataIngresso(){
    return new Date(focusedMember().dataIngresso).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function dataDesligamento(){
    if(!focusedMember().dataDesligamento)
        return ''
    return new Date(focusedMember().dataDesligamento).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

</script>

<template>
    <AppModal @close="closeModal" boxClass="w-1/3 h-85/100 bg-[#F2F2F2]">

        <article class="flex flex-col 
                        w-full h-full
                        place-items-center
                        relative
                        py-2
                        px-10
                        gap-2
                        ">
            <h1 class="text-2xl">

                <strong>Detalhes do membro</strong>
            </h1>
            <div class="h-1/4 w-full
                        flex justify-center">

                <MemberPhoto :photo-url="getPhoto()"
                                class="border-5 border-[#560197]"/>
            </div>
            <div class="flex flex-col justify-center place-items-center">
                <h1 class="text-xl">
                    <strong>{{ focusedMember().nome }}</strong>
                </h1>
                <h2 class="text-[#767676] text-base">
                {{ diretoriaMap.get(focusedMember().diretoria) }}
            </h2>
            </div>
            <h2>
                <i>({{ cargoMap.get(focusedMember().cargo) }})</i>
            </h2>

            <div class="justify-between w-full flex">
                <div class="bg-[#FAFAFA]
                            p-3
                            w-1/3
                            shadow-xl
                            border border-[#C2C2C2] rounded-2xl
                            flex flex-col">
                    <h2 class = "text-[#767676]">
                        INGRESSO
                    </h2>
                    <h2>
                        {{ dataIngresso() }}
                    </h2>
                </div>

                <div v-if="focusedMember().dataDesligamento"
                     class="bg-[#FAFAFA]
                            p-3
                            w-1/3
                            shadow-sm
                            border border-[#C2C2C2] rounded-2xl
                            flex flex-col">
                    <h2 class = "text-[#767676]">
                        INGRESSO
                    </h2>
                    <h2>
                        {{ dataDesligamento() }}
                    </h2>
                </div>

            </div>

        
        <div v-if="focusedMember().projects.length > 0" 
            class="w-full max-h-75 overflow-y-auto 
                    border border-gray-300 rounded-xl shadow-sm bg-white">
            
            <table class="w-full text-left border-collapse">
                
                <thead class="sticky top-0 bg-[#F5F5F5] z-10 
                            border-b border-gray-300 text-gray-500 text-sm">
                    <tr>
                        <th class="font-medium pl-5 py-3 w-2/3">PROJETOS</th>
                        <th class="font-medium pr-5 py-3 text-right w-1/3"></th>
                    </tr>
                </thead>
                
                <tbody>
                    <MemberDetailModalProjectItem 
                        v-for="p in focusedMember().projects" 
                        :key="p.id"
                        :role="roleMap.get(p.funcao)!"
                        :id="p.id"
                    />
                </tbody>

            </table>
        </div>


        </article>
    </AppModal>
</template>