<script setup lang="ts">
import { useProjectStore } from '@/stores/projectStore';
import { Project } from '@/types/Project';
import { ref, type Ref } from 'vue';

interface Props{
    id:string;
    role:string;
}

const props = defineProps<Props>();
const projectStore = useProjectStore();
const project:Ref<Project> = ref<Project>(projectStore.getProject(props.id)!);
</script>

<template>
    <tr class="border-b border-gray-200 last:border-none hover:bg-gray-50 font-inter">
        
        <td class="pl-5 py-3">
            <h1 class="text-gray-900 text-lg">
                {{ project.titulo }}
            </h1>
        </td>
        
        <td class="text-right pr-5 py-3">
            <span class="inline-block bg-[#F2F2F2] text-black text-sm italic 
                         px-4 py-1 rounded-full">
                {{ props.role }}
            </span>
        </td>
        
    </tr>
</template>