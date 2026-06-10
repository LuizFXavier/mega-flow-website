<script setup lang="ts">
import { onMounted, reactive, ref, type Reactive, type Ref } from 'vue';
import AppModal from '../AppModal.vue';
import ProjectFormInputBox from './ProjectFormInputBox.vue';
import { Project } from '@/types/Project.ts';
import { useProjectStore } from '@/stores/projectStore.ts';
import ProjectFormAddMember from './ProjectFormAddMember.vue';
import ProjectFormMemberCard from './ProjectFormMemberCard.vue';
import type { Member, MemberMap } from '@/types/Member.ts';

const statusMap = [
    ["CANCELADO", "Cancelado"],
    ["EM_ANDAMENTO", "Em andamento"],
    ["NAO_INICIADO", "Não iniciado"],
    ["CONCLUIDO", "Concluído"]
]

interface Props{
    memberMap:MemberMap;
}

const {memberMap} = defineProps<Props>();

const isModalOpen = defineModel<boolean>();

const isAddMemberModalOpen = ref<boolean>(false);

const projectStore = useProjectStore();

function closeModal(){
    projectStore.reset();
    isModalOpen.value = false;
}

function getMember(rga:string):Member{
    return memberMap.get(rga)!
}

const formsProject:Reactive<Project> = reactive<Project>(new Project());

const isNew:Ref<boolean> = ref<boolean>(false)

onMounted(()=>{
    if(projectStore.isValid()){
        formsProject.set(projectStore.focusedProject)
        formsProject.membros = projectStore.focusedProject!.membros;
    }
    else{
        isNew.value = true;
    }
    
})

</script>

<template>
    <AppModal @close="closeModal">
        <form class="h-9/10 relative" >
            <header class=" w-full
                        border-b-gray-border border-b-2
                        py-2
                        px-4">

                <h1 v-if="isNew">
                    Novo projeto
                </h1>

                <h1 v-else>
                    Editar projeto
                </h1>

                <input v-model="formsProject.titulo"
                        type="text" 
                        placeholder="Digite o nome do projeto"/>

                <select name="status" id="status">
                    <option v-for="entry in statusMap" :value="entry">{{ entry[1] }}</option>
                </select>
            </header>

            <div class="h-full
                        py-2 px-4">
                <section class="flex flex-row gap-5 
                                w-full    
                                justify-between place-items-baseline">

                    <ProjectFormInputBox>
                        <template v-slot:title>
                            <img src="/icon/projects/building.png"/>
                            <h2>
                                Empresa contratante
                            </h2>
                        </template>

                        <input v-model="formsProject.cliente"
                                type="text" 
                                placeholder="Ex: Mega Jr" 
                                class="placeholder-[#818181] 
                                "/>

                    </ProjectFormInputBox>
                    

                    <ProjectFormInputBox>
                        <template v-slot:title>
                            <img src="/icon/projects/calendar.png"/>
                            <h2>
                                Entrega prevista
                            </h2>
                        </template>
                        <input  v-model="formsProject.dataConclusao"
                                type="date"/>
                    </ProjectFormInputBox>

                    <ProjectFormInputBox>
                        <template v-slot:title>
                            <img src="/icon/projects/wallet.png"/>
                            <h2>
                                Orçamento
                            </h2>
                        </template>
                        <input  v-model="formsProject.orcamento"
                                type="number" min="0" step="0.01"/>
                    </ProjectFormInputBox>
                </section>
                
                <section class="flex flex-col 
                                h-1/4  w-full
                                ">

                    <ProjectFormInputBox>
                        <template v-slot:title>
                            
                            <h2>
                                Descrição
                            </h2>
                            
                        </template>
                        <textarea  v-model="formsProject.descricao"
                                    class="h-full"></textarea>
                    </ProjectFormInputBox>
                </section>

                <section class="flex flex-col 
                                h-1/4 w-full
                                ">
                    <ProjectFormInputBox class="h-full">
                            <template v-slot:title>

                                <div class="flex w-full h-full justify-between">
                                    <h2>
                                        Membros
                                    </h2>
                                    <button class="place-self-end"
                                            type="button"
                                            @click="isAddMemberModalOpen = true">
                                        + Adicionar
                                    </button>
                                    
                                </div>
                            </template>
                            
                            <div class="grid">
                                <ProjectFormMemberCard v-for="member in formsProject.membros"
                                    :name="getMember(member.rga).nome"/>
                            </div>
                    </ProjectFormInputBox>
                </section>
                <select name="status" id="status" class="">
                            <option v-for="member in formsProject.membros" 
                                            :value="getMember(member.rga).nome">
                                {{ getMember(member.rga).nome }}
                            </option>
                </select>

            </div>

            <div v-if="isAddMemberModalOpen"
                @click="isAddMemberModalOpen=false"
                class=" z-10
                        fixed inset-0">
            </div>

            <div v-if="isAddMemberModalOpen"
                    class="absolute
                            z-20
                            bottom-4 right-0
                            w-1/3 h-1/3
                            mr-4">
                <ProjectFormAddMember/>
            </div>
        </form>

    </AppModal>
</template>