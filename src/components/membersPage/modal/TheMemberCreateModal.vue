<script setup lang="ts">
import AppModal from '@/components/AppModal.vue';
import FormButton from '@/components/FormButton.vue';
import InputField from '@/components/InputField.vue';
import { memberService } from '@/services/memberService';
import { CreatedMember } from '@/types/Member';
import { reactive } from 'vue';

const emit = defineEmits(['close']);

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

const cargoMap = new Map<string, string>([
    ["MEMBRO", "Membro"],
    ["DIRETOR", "Diretor"],
    ["ADMINISTRADOR", "Administrador"]
])

function closeModal(){
    emit('close')
}

const formsMember = reactive<CreatedMember>(new CreatedMember());

async function handleConfirm(){

    console.log(formsMember);

    await memberService.createMember(formsMember);
}

</script>

<template>
    <AppModal @close="emit('close')" >

        <article class="h-full w-full
                        place-items-center
                        px-5
                        py-4">

            <div class="bg-gray-main/50 
                        h-full w-full
                        rounded-2xl 
                        shadow-xl 
                        border border-[#B2B2B2]
                        flex flex-col
                        place-items-center
                        relative">

                <div class="flex flex-col 
                            py-2
                            w-2/3 h-full
                            place-items-center
                            gap-5">
                    <h1 class="text-4xl">
                        <strong>Cadastrar Usuário</strong>
                    </h1>

                    <forms class = "flex flex-col 
                                    place-items-center
                                    h-full w-full
                                    gap-2
                                    overflow-y-auto">

                        
                        <label>
                            <strong>Nome de usuário</strong>
                        </label>
                        <InputField type="text" placeholder="" v-model="formsMember.nome"/>

                        <label>
                            <strong>RGA</strong>
                        </label>
                        <InputField type="text" placeholder="" v-model="formsMember.rga"/>

                        <label>
                            <strong>E-mail</strong>
                        </label>
                        <InputField type="email" placeholder="" v-model="formsMember.email"/>

                        <label>
                            <strong>Senha</strong>
                        </label>
                        <InputField type="password" placeholder="" v-model="formsMember.senha"/>


                        <label>
                            <strong>Diretoria</strong>
                        </label>
                        <select class="w-full rounded-xl text-lg bg-[#F5F5F5] p-2 shadow-xl"
                                v-model="formsMember.diretoria">
                            <option v-for="[key, diretoria] in diretoriaMap"
                                    :value="key"
                                    class="rounded-lg  bg-[#F5F5F5] shadow-2xl"
                                    >
                                {{ diretoria }}
                            </option>
                        </select>

                        <div class="w-full flex justify-between">
                            <div class="flex flex-col gap-1">
                                <label>
                                    <strong>Cargo</strong>
                                </label>
                            <select class="w-full rounded-xl text-lg bg-[#F5F5F5] p-2 shadow-2xl"
                                    v-model="formsMember.cargo">

                                <option v-for="[key, cargo] in cargoMap"
                                        :value="key"
                                        class="rounded-lg  bg-[#F5F5F5] shadow-2xl"
                                        >
                                    {{ cargo }}
                                </option>
                            </select>
                            </div>

                            <div class="flex flex-col gap-1">
                                <label>
                                    <strong>Ingressou em:</strong>
                                </label>
                                <input v-model="formsMember.dataIngresso"
                                        type="date"
                                        class=" w-full 
                                                rounded-xl 
                                                text-lg 
                                                bg-[#F5F5F5] 
                                                p-2
                                                shadow-2xl">
                            </div>
                        </div>
                    </forms>
                    
                    <footer
                        class="flex flex-row 
                                justify-between 
                                place-items-center
                                w-full
                                gap-10 bottom-0
                                py-5
                                min-h-3/20
                                ">
                        <FormButton class="w-35/100 text-3xl"
                                    preset="cancel" @click="closeModal">
                            Cancelar
                        </FormButton>
                        <FormButton class="w-35/100 text-3xl"
                                    preset="confirm" @click="handleConfirm">
                            Salvar
                        </FormButton>
                    </footer>
                </div>
            </div>
        </article>
    </AppModal>
</template>