import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { Project } from '@/types/Project'

export const useProjectStore = defineStore('project', () => {
  
    const focusedProject:Ref<Project | null> = ref<Project | null>(null);

    function setFocusedProject(project:Project){
        focusedProject.value = project;
    }

    function reset(){
        focusedProject.value = null;
    }

    function isValid():boolean{
        return focusedProject.value !== null;
    }

    return { focusedProject, setFocusedProject, reset, isValid }
})
