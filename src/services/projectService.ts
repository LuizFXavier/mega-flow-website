import type { Participant } from "@/types/Participant";
import api from "./api"
import { Project, ProjectGroup } from "@/types/Project";
import type { Member } from "@/types/Member";

export const projectService = {
  
    // Função que recupera as informações de um projeto, dado um id
    async getProject(id:string):Promise<Project> {

        try{
            const {data} = await api.get<Project>('/projetos/' + id);
            
            return data;
        }
        catch(e){
            throw e;
        }
    },
    async getProjectsWithMembers():Promise<ProjectGroup>{
        try{
            const {data} = await api.get('/projetos');

            const projectGroup:ProjectGroup = new ProjectGroup();

            data.forEach((element:any) => {

                const project:Project = new Project(element);
                
                project.participants = [];

                const membros:{membro:Member, funcao:string}[] = element.membros!;

                membros.forEach((m)=>{

                    project.participants.push({memberRga:m.membro.rga, funcao:m.funcao});
                    
                    projectGroup.membermap.set(m.membro.rga, m.membro);
                })

                projectGroup.projects.push(project);
                
            });
            
            return projectGroup;
        }
        catch(e){
            throw e;
        }
    },
    async getAllProjects():Promise<Project[]> {

        try{
            const {data} = await api.get('/projetos');
            
            return data;
        }
        catch(e){
            throw e;
        }
    },
    // Função que recupera os projetos que um membro participa, dado um rga
    async getMemberProjects(rga:string):Promise<Participant[]> {

        try{
            
            const {data} = await api.get('/membros/' + rga);
            
            const {projetosLider, projetosParticipante} = data;
            
            const projects:Participant[] = projetosParticipante;
            
            projetosLider.forEach((p:Project) => {
                projects.push({funcao:"LEADER", projeto:p})
            });
            return projects;
        }
        catch(e){
            throw e;
        }
    }
}