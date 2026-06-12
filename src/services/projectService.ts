import type { Participant } from "@/types/Participant";
import api from "./api"
import { Project, ProjectGroup, type ProjectParticipant } from "@/types/Project";
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

                const project:Project = new Project();

                project.set(element);
                
                project.membros = [];

                const membros:{membro:Member, funcao:string}[] = element.membros!;

                membros.forEach((m)=>{

                    project.membros.push({rga:m.membro.rga, funcao:m.funcao});
                    
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

            const projects:Project[] = [];

            data.forEach((element:any) => {

                const project:Project = new Project();

                project.set(element);
                
                project.membros = [];

                const membros:{membro:Member, funcao:string}[] = element.membros!;

                membros.forEach((m)=>{

                    project.membros.push({rga:m.membro.rga, funcao:m.funcao});
                    
                })

                projects.push(project);
                
            });
            
            return projects;
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
    },

    async createProject(project:Project){
        try{
            const membros:ProjectParticipant[] = [];

            project.membros.forEach(m=>{
                membros.push(m)
            })
            console.log(membros)
            const creationPayload = {
                titulo: project.titulo,
                descricao: project.descricao,
                cliente: project.cliente,
                dataInicio: project.dataCriacao,
                dataConclusao: project.dataConclusao,
                status: project.status,
                liderRga: project.liderRga,
                orcamento: project.orcamento,
                
                membros: membros
                };
            await api.post('/projetos', creationPayload);
        }
        catch(e){
            console.error("Falha ao criar o projeto:", e);
            throw e;
        }
    },

    async updateProject(project:Project, focusedProject:Project){

        try{
            const updatePayload = {
                titulo: project.titulo,
                descricao: project.descricao,
                cliente: project.cliente,
                dataConclusao: project.dataConclusao,
                status: project.status,
                orcamento: project.orcamento,
                
                };

            await api.patch('/projetos/' + project.id, updatePayload);

            if (project.liderRga !== focusedProject.liderRga){
                const leaderPayload = {
                    novoLiderRga: project.liderRga
                };

                await api.patch('/projetos/'+project.id+'/lider', leaderPayload);
            }

            focusedProject.set(project);
            focusedProject.membros = project.membros;
            
            // TODO: Atualizar outras coisas
        }
        catch(e){
            throw e;
        }
    },
    async deleteProject(project:Project){
        try{
            await api.delete('/projetos/' + project.id);
        }
        catch(e){
            throw e;
        }
    }
}