<script setup lang="ts">
import { memberService } from '@/services/memberService';
import { projectService } from '@/services/projectService';
import { useUserStore } from '@/stores/userStore';
import { type Participant } from '@/types/Participant';

const userStore = useUserStore();

interface Props{
    projects:Participant[]
}

const {projects} = defineProps<Props>();

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
    <table>
        <thead>
            <tr>
            <th>PROJETOS</th>
            <th>CARGO</th>
            <th>ANDAMENTO</th>
            </tr>
        </thead>
        <tbody v-for="p in projects">
            <tr>
            <td>{{ p.projeto.titulo }}</td>
            <td>{{roleMap.get(p.funcao)}}</td>
            <td>{{ statusMap.get(p.projeto.status) }}</td>
            </tr>
        </tbody>
    </table>
</template>