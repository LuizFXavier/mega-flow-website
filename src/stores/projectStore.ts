import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { Project } from '@/types/Project'

export const useProjectStore = defineStore('project', () => {
  
    const focusedProject:Ref<Project | null> = ref<Project | null>(null);
    const focusedIndex:Ref<number> = ref<number>(-1);

    function setFocusedProject(project:Project, index:number){
        focusedProject.value = project;
        focusedIndex.value = index;
    }

    function reset(){
        focusedIndex.value = -1;
        focusedProject.value = null;
    }

    function isValid():boolean{
        return focusedProject.value !== null;
    }

    return { focusedProject, focusedIndex, setFocusedProject, reset, isValid }
})
