import { reactive, ref, type Reactive, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { Project, type ProjectMap } from '@/types/Project'
import { projectService } from '@/services/projectService';

export const useProjectStore = defineStore('project', () => {
  
    const focusedProject:Ref<Project | null> = ref<Project | null>(null);
    const focusedIndex:Ref<number> = ref<number>(-1);

    const projectMap:Reactive<ProjectMap> = reactive<ProjectMap>(new Map());

    async function setupProjects(){
            
        if (projectMap.size > 0)
            return;

        const projects:Project[] = await projectService.getAllProjects();

        projects.forEach(project =>{
            projectMap.set(project.id, project);
        })
    }

    function getProjectArray():Project[]{
    
        return Array.from(projectMap.values());
    }

    function getProject(id:string):Project{
    
            return projectMap.get(id)!;
    }

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

    return { focusedProject, focusedIndex, projectMap, 
                setupProjects, getProjectArray, getProject, 
                setFocusedProject, reset, isValid }
})
