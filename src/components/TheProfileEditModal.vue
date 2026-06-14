<script setup lang="ts">
import { CreatedMember, Member } from '@/types/Member.ts';
import AppModal from './AppModal.vue';
import MemberPhoto from './MemberPhoto.vue';
import { useUserStore } from '@/stores/userStore.ts';
import InputField from './InputField.vue';
import { computed, onMounted, reactive, ref, type Ref } from 'vue';
import { useMemberStore } from '@/stores/memberStore.ts';
import { memberService } from '@/services/memberService.ts';
import FormButton from './FormButton.vue';
import EditableMemberPhoto from './EditableMemberPhoto.vue';

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

const emit = defineEmits<{
  (e: 'close'): void,
  (e: 'deleteMember', index: number): void,
  (e: 'updateMember', newMember:CreatedMember):void
}>();

const userStore = useUserStore();

interface Props{
    focusedMember:Member;
}
const memberStore = useMemberStore();

const formsMember = reactive<CreatedMember>(new CreatedMember(memberStore.focusedMember!));

const oldPassword:Ref<string> = ref<string>('');
const newPassword:Ref<string> = ref<string>('');

const cargoMap = new Map<string, string>([
    ["MEMBRO", "Membro"],
    ["DIRETOR", "Diretor"],
    ["ADMINISTRADOR", "Administrador"]
])

const dataParaOInput = computed({
  get() {
    const date = formsMember.dataIngresso;
    return date ? date.split('T')[0] : '';
  },
  set(newValue: string) {
    if (newValue) {
      formsMember.dataIngresso = newValue;
    } else {
      formsMember.dataIngresso = '';
    }
  }
});

async function handleConfirm(){
    
    await memberService.updateMember(formsMember);
    await memberService.updateMemberPassword(formsMember.rga, oldPassword.value, newPassword.value);
    
    memberStore.focusedMember?.update(formsMember);

    closeModal();
}

function closeModal(){
    memberStore.reset();
    emit('close');
}

function getPhoto(){
    return memberStore.getPhoto(formsMember.rga);
}

function isSelf(){
    return userStore.user.rga === memberStore.focusedMember?.rga;
}

async function handleDelete() {
    await memberService.deleteMember(formsMember.rga);

    emit('deleteMember', memberStore.focusedIndex);
    closeModal();
}

onMounted(()=>{
    console.log("aqui", formsMember)
    console.log("lá", memberStore.focusedMember)
})

</script>

<template>
    <AppModal @close="closeModal" boxClass="w-1/3 h-85/100 bg-[#F2F2F2]">

        <article class="flex flex-col 
                        w-full h-full
                        place-items-center
                        relative
                        ">
            <h1 class="text-2xl">

                <strong>Editar perfil</strong>
            </h1>
            <div class="h-1/6 w-full
                        flex justify-center
                        relative">

                <!-- <MemberPhoto :photo-url="getPhoto()"
                                class="border-5 border-[#560197]"/> -->
                    <div>
                        <button @click.prevent="handleDelete"
                                v-if="userStore.isDirector() && !isSelf()"
                                class="flex flex-row 
                                        bg-[#5C0099]
                                        text-white
                                        place-items-center
                                        px-2
                                        py-1
                                        left-4
                                        bottom-4
                                        rounded-xl
                                        absolute">
                            <img src="/icon/trash.png"/>
                            Deletar
                        </button>
                    </div>
                <EditableMemberPhoto :focused-member="memberStore.focusedMember!"/>
            </div>
            <form class="flex flex-col 
                                    max-h-55/100
                                    w-9/10
                                    gap-2
                                    overflow-y-auto">
                <label>
                    <strong>Nome de usuário</strong>
                </label>
                <InputField type="text" 
                            v-model="formsMember.nome"
                            class="border border-[#C2C2C2]"/>

                <label>
                    <strong>Diretoria</strong>
                </label>
                <select class="w-full rounded-xl text-lg bg-[#F5F5F5] p-2 shadow-xl"
                        :disabled="!userStore.isAdmin()"
                        v-model="formsMember.diretoria"
                        >
                    <option v-for="[key, diretoria] in diretoriaMap"
                            :value="key"
                            class="rounded-lg  bg-[#F5F5F5] shadow-2xl"
                            
                            >
                        {{ diretoria }}
                    </option>
                </select>

                <div class="w-full flex justify-between place-items-baseline">
                    <div class="flex flex-col gap-1 h-full">
                        <label>
                            <strong>Cargo</strong>
                        </label>
                    <select class=" w-full 
                                    rounded-xl 
                                    text-lg
                                    px-2
                                    py-2
                                    2xl:py-2
                                    2xl:text-lg
                                    bg-[#F5F5F5]
                                    shadow-2xl"
                            v-model="formsMember.cargo"
                            :disabled="!userStore.isAdmin()">

                        <option v-for="[key, cargo] in cargoMap"
                                :value="key"
                                class="rounded-lg  bg-[#F5F5F5] shadow-2xl"
                                >
                            {{ cargo }}
                        </option>
                    </select>
                    </div>

                    <div class="flex flex-col gap-1 h-full">
                        <label>
                            <strong>Ingressou em:</strong>
                        </label>
                        <input v-model="dataParaOInput"
                                type="date"
                                class=" w-full 
                                        rounded-xl 
                                        text-lg 
                                        bg-[#F5F5F5] 
                                        p-2
                                        shadow-2xl"
                                :disabled="!userStore.isAdmin()">
                    </div>
                </div>
                <label>
                    <strong>E-mail</strong>
                </label>
                <InputField type="email" 
                            v-model="formsMember.email"
                            class="border border-[#C2C2C2]"/>
                <label>
                    <strong>Senha atual</strong>
                </label>
                <InputField type="password" 
                            v-model="oldPassword"
                            class="border border-[#C2C2C2]"/>

                <label>
                    <strong>Nova senha</strong>
                </label>
                <InputField type="password" 
                            v-model="newPassword"
                            class="border border-[#C2C2C2]"/>
            </form>
            
            <footer
                class="flex flex-1
                        w-9/10
                        place-items-center
                        ">

                <div class="w-full h-1/2
                            flex flex-row
                            justify-between 
                            place-items-center
                            py-5
                            ">
                    <FormButton class="w-35/100 text-2xl"
                                preset="cancel" @click="closeModal">
                        Cancelar
                    </FormButton>
                    <FormButton class="w-35/100 text-2xl"
                                preset="confirm" @click="handleConfirm">
                        Salvar
                    </FormButton>
                </div>
            </footer>
        </article>
    </AppModal>
</template>