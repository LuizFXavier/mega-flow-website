import type { MemberMap } from "./Member";

export class Project{

    id:string;
    titulo:string;
    status:string;

    cliente:string;

    dataCriacao:string;
    dataAtualizacao:string;
    dataConclusao:string | null = null;
    descricao:string;

    liderRga:string;

    participants:ProjectParticipant[] = [];

    constructor(project:any){
        this.id = project.id;
        this.titulo = project.titulo;
        this.status = project.status;

        this.cliente = project.cliente;

        this.dataAtualizacao = project.dataAtualizacao;
        this.dataCriacao = project.dataCriacao;
        this.dataAtualizacao = project.dataAtualizacao;
        this.dataConclusao = project.dataConclusao;
        this.descricao = project.descricao;
        this.liderRga = project.liderRga;
    }
}

export interface ProjectParticipant{
    funcao:string;
    memberRga:string;
}

export class ProjectGroup{
    projects:Project[] = [];
    membermap:MemberMap = new Map();
}