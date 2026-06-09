<script setup lang="ts">
import type { MemberMap } from '@/types/Member';
import type { Project } from '@/types/Project';


interface Props{
    project:Project;
    memberMap:MemberMap;
}

const {project, memberMap} = defineProps<Props>();

</script>

<template>
    <h1>
        {{ project.titulo }}
    </h1>

    <div v-for="{memberRga, funcao} in project.participants">
        <h2>
            funcao, {{ memberMap.get(memberRga) }}
        </h2>
    </div>

</template>