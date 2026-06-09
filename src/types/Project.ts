import type { MemberMap } from "./Member";

export interface Project{

    id:string;
    titulo:string;
    status:string;

    cliente:string;

    dataCriacao:string;
    dataAtualizacao:string;
    dataConclusao:string | null;
    descricao:string;

    liderRga:string;

    participants:ProjectParticipant[];
}

export interface ProjectParticipant{
    funcao:string;
    memberRga:string;
}

export interface ProjectGroup{
    projects:Project[];
    membermap:MemberMap;
}