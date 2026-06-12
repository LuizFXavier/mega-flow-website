<script setup lang="ts">
import { computed, onMounted, reactive, ref, type Reactive, type Ref } from 'vue';
import AppModal from '../../AppModal.vue';
import ProjectFormInputBox from './ProjectFormInputBox.vue';
import { Project } from '@/types/Project.ts';
import { useProjectStore } from '@/stores/projectStore.ts';
import ProjectFormAddMember from './ProjectFormAddMember.vue';
import type { Member, MemberMap } from '@/types/Member.ts';
import { useMemberStore } from '@/stores/memberStore.ts';
import ProjectFormMember from './ProjectFormMember.vue';
import FormButton from '@/components/FormButton.vue';
import { projectService } from '@/services/projectService.ts';

const statusMap = [
    ["CANCELADO", "Cancelado"],
    ["EM_ANDAMENTO", "Em andamento"],
    ["NAO_INICIADO", "Não iniciado"],
    ["CONCLUIDO", "Concluído"]
]

const memberStore = useMemberStore();

const isModalOpen = defineModel<boolean>();

const isAddMemberModalOpen = ref<boolean>(false);

const projectStore = useProjectStore();

function closeModal(){
    projectStore.reset();
    isModalOpen.value = false;
}

function getMember(rga:string):Member{
    return memberStore.memberMap.get(rga)!
}

function removeMember(index:number){

    const rga = formsProject.membros[index]?.rga;
    projectMembers.delete(rga!)
    formsProject.membros.splice(index, 1);
}

async function handleConfirm(){

    if(isNew.value){
        formsProject.dataCriacao = new Date().toISOString().split('T')[0]!;
        console.log(formsProject)
        await projectService.createProject(formsProject);
    }
    else{
        console.log(formsProject)
        await projectService.updateProject(formsProject, projectStore.focusedProject!);
    }
    closeModal();
}

async function handleDelete() {
    await projectService.deleteProject(formsProject);

    closeModal();
}

const formsProject:Reactive<Project> = reactive<Project>(new Project());

const isNew:Ref<boolean> = ref<boolean>(false)

const projectMembers:Set<string> = new Set();

const dataParaOInput = computed({
  get() {
    const date = formsProject.dataConclusao;
    return date ? date.split('T')[0] : '';
  },
  set(newValue: string) {
    if (newValue) {
      formsProject.dataConclusao = newValue;
    } else {
      formsProject.dataConclusao = null;
    }
  }
});

onMounted(()=>{
    if(projectStore.isValid()){
        formsProject.set(projectStore.focusedProject)

        formsProject.membros = [...projectStore.focusedProject!.membros];

        projectStore.focusedProject?.membros.forEach(membro => {
            projectMembers.add(membro.rga);
        });
    }
    else{
        isNew.value = true;
    }
    
})

</script>

<template>
    <AppModal @close="closeModal" class="overflow-hidden">
        <header class=" w-full
                        border-b-gray-border border-b-2
                        py-2 px-4
                        justify-between
                        flex flex-row">

                <div>

                    <h1 v-if="isNew">
                        Novo projeto
                    </h1>
    
                    <h1 v-else class="text-[#7E7979]">
                        Editar projeto
                    </h1>
    
                    <input v-model="formsProject.titulo"
                            type="text" 
                            placeholder="Digite o nome do projeto"
                            class="text-2xl"/>
                </div>
                <div class="flex place-items-end">
                    <select v-model="formsProject.status">
                        <option v-for="entry in statusMap" :value="entry[0]">
                            {{ entry[1] }}</option>
                    </select>
                </div>
            </header>
        <form class="h-8/10 relative overflow-y-auto" >

            <div class="flex flex-col
                        gap-4
                        py-2 px-4">
                <section class="flex flex-row gap-5 
                                w-full    
                                justify-between 
                                place-items-baseline">

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
                        <input  v-model="dataParaOInput"
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
                                w-full
                                ">

                    <ProjectFormInputBox>
                        <template v-slot:title>
                            <img src="/icon/projects/paper.png"/>
                            <h2>
                                Descrição
                            </h2>
                            
                        </template>
                        <textarea  v-model="formsProject.descricao"
                                    class="h-full w-full"></textarea>
                    </ProjectFormInputBox>
                </section>

                <section class="flex flex-col 
                                w-full
                                ">
                    <ProjectFormMember
                        v-model="formsProject.membros"
                        @change-role="console.log(formsProject)"
                        @open-modal="isAddMemberModalOpen = true"
                        @remove-member="removeMember"
                    />
                </section>
                
                <div class="flex gap-3">

                    <img src="/icon/projects/crown.png"/>
                    <h2>
                        Líder do projeto
                    </h2>
                </div>
                <div class="flex justify-between">

                    <select v-model="formsProject.liderRga"
                            class="min-w-1/4" 
                            >
                            <option v-for="member in formsProject.membros" 
                                            :value="member.rga">
                                {{ getMember(member.rga).nome }}
                            </option>
                    </select>
                    <button @click.prevent="handleDelete">
                        Deletar
                    </button>
                </div>
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
                <ProjectFormAddMember   v-model:project="formsProject"
                                        v-model:projectMembers="projectMembers"/>
            </div>
        </form>
         <footer class="flex flex-row 
                        justify-center 
                        place-items-center
                        gap-10 bottom-0
                        py-5
                        min-h-3/20
                        ">
            <FormButton preset="cancel" @click="closeModal">
                Cancelar
            </FormButton>
            <FormButton preset="confirm" @click="handleConfirm">
                Salvar
            </FormButton>
        </footer>
    </AppModal>
</template>