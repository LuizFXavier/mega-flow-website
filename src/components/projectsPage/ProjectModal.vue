<script setup lang="ts">
import AppModal from '../AppModal.vue';
import ProjectFormInputBox from './ProjectFormInputBox.vue';

const isModalOpen = defineModel<boolean>();

const statusMap = [
    ["CANCELADO", "Cancelado"],
    ["EM_ANDAMENTO", "Em andamento"],
    ["NAO_INICIADO", "Não iniciado"],
    ["CONCLUIDO", "Concluído"]
]

</script>

<template>
    <AppModal v-model="isModalOpen">
        <form class="h-9/10">
            <header class=" w-full
                        border-b-gray-border border-b-2
                        py-2
                        px-4">

                <h1>
                    Novo projeto
                </h1>
                <input type="text" placeholder="Digite o nome do projeto"/>

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
                            <img src="/icon/forms/building.png"/>
                            <h2>
                                Empresa contratante
                            </h2>
                        </template>

                        <input type="text" placeholder="Ex: Mega Jr" class="placeholder-[#818181] placeholder-opacity-100"/>

                    </ProjectFormInputBox>
                    

                    <ProjectFormInputBox>
                        <template v-slot:title>
                            <img src="/icon/forms/calendar.png"/>
                            <h2>
                                Entrega prevista
                            </h2>
                        </template>
                        <input type="date"/>
                    </ProjectFormInputBox>

                    <ProjectFormInputBox>
                        <template v-slot:title>
                            <img src="/icon/forms/wallet.png"/>
                            <h2>
                                Orçamento
                            </h2>
                        </template>
                        <input type="number"/>
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
                        <textarea  class="h-full"></textarea>
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
                                    <button class="place-self-end">
                                        + Adicionar
                                    </button>
                                    
                                </div>
                            </template>
                            
                    </ProjectFormInputBox>
                </section>
                <select name="status" id="status" class="">
                            <option v-for="entry in statusMap" :value="entry">{{ entry[1] }}</option>
                </select>

            </div>
        </form>

    </AppModal>
</template>