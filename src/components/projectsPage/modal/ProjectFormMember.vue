<script setup lang="ts">
import { useMemberStore } from '@/stores/memberStore';
import ProjectFormInputBox from "./ProjectFormInputBox.vue"
import ProjectFormMemberCard from './ProjectFormMemberCard.vue';

interface Props{
    leaderRga:string;
    canEdit:boolean;
}

const {canEdit, leaderRga} = defineProps<Props>();

const members = defineModel<{funcao:string, rga:string}[]>();

const emit = defineEmits<{
  (e: 'removeMember', id: number): void,
  (e: 'openModal'): void,
  (e: 'modifyMember', rga:string):void
}>();

const memberStore = useMemberStore();

const roleMap = new Map<string, string>([
    ["FRONT_END", "Front-end"],
    ["BACK_END", "Back-end"],
    ["DESIGN", "Designer"]
])

function showDelete(rga:string):boolean{
    
    if (rga === leaderRga){
        return false;
    }

    return canEdit;
}


</script>

<template>
    <div class="max-h-68 w-full">
        <ProjectFormInputBox class="h-full">
            <template v-slot:title>

                <div class="flex w-full h-full justify-between">
                    <div class="flex flex-row gap-3">

                        <img src="/icon/projects/member.png"/>
                        <h2>
                            Membros
                        </h2>
                    </div>
                    <button v-if="canEdit"
                            class="place-self-end"
                            type="button"
                            @click = "emit('openModal')">
                        + Adicionar
                    </button>
                    
                </div>
            </template>
            
            <div class="grid gap-2 grid-cols-3
                        overflow-y-scroll
                        w-full
                        grid-flow-row
                        min-h-10
                        max-h-35
                        p-2">
                <ProjectFormMemberCard 
                    v-for="(member, index) in members"
                    :name="memberStore.getMember(member.rga).nome"
                    :photo-url="memberStore.getPhoto(member.rga)">

                    <select name="role" id="role" class=""
                            v-model="member.funcao"
                            :disabled="!canEdit"
                            @change="emit('modifyMember', member.rga)">
                            <option v-for="role in roleMap.keys()"
                                    :value="role">

                                {{ roleMap.get(role)! }}
                            </option>
                    </select>

                    <template v-slot:button>
                        <button @click.prevent="emit('removeMember', index)" v-if="showDelete(member.rga)">
                            <img src="/icon/circle-x.png"/>
                        </button>
                    </template>
                </ProjectFormMemberCard>
            </div>
        </ProjectFormInputBox>

    </div>
</template>