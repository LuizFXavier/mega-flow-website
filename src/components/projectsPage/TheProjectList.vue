<script setup lang="ts">
import type { Project } from "@/types/Project";
import ProjectCard from "./ProjectCard.vue";
import { useProjectStore } from "@/stores/projectStore.ts";
import { computed, ref } from "vue";

interface Props {
    projects: Project[];
}

const { projects } = defineProps<Props>();

const isModalOpen = defineModel<boolean>();

const projectStore = useProjectStore();

const page_items = 9;
const actualPage = ref(1);
const totalPages = computed(() => Math.ceil(projects.length / page_items));

const visibleProjects = computed(() => {
    return projects.slice(
        (actualPage.value - 1) * page_items,
        actualPage.value * page_items,
    );
});

const previousPage = computed(() => {
    return actualPage.value - 1;
});

const nextPage = computed(() => {
    return actualPage.value + 1;
});

function openViewModal(project: Project, localindex: number) {
    const globalIndex = (actualPage.value - 1) * page_items + localindex;
    projectStore.setFocusedProject(project, globalIndex);
    isModalOpen.value = true;
}
</script>

<template>
    <article
        class="w-full h-full grid grid-cols-3 gap-4 grid-rows-3 p-4 overflow-y-auto"
    >
        <ProjectCard
            v-for="(project, index) in visibleProjects"
            :key="project.id"
            @open-modal="openViewModal(project, index)"
            :project="project"
        />
    </article>

    <div
        v-if="totalPages > 1"
        class="flex justify-center items-center gap-4 p-4 border-gray-200"
    >
        <button
            @click="actualPage = previousPage"
            :disabled="actualPage === 1"
            class="px-4 py-2 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
        >
            Anterior
        </button>
        <span>{{ actualPage }}/{{ totalPages }}</span>
        <button
            @click="actualPage = nextPage"
            :disabled="actualPage === totalPages"
            class="px-4 py-2 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
        >
            Próximo
        </button>
    </div>
</template>
