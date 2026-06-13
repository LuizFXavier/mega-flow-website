import { Member } from "@/types/Member";
import api from "./api";
import type { Project } from "@/types/Project";

export const memberService = {
  // Função que recupera as informações de um membro dado um rga
  async getMember(rga: string): Promise<Member> {
    try {
      const { data } = await api.get<Member>("/membros/" + rga);

      return data;
    } catch (e) {
      throw e;
    }
  },
  async getAllMembers(): Promise<Member[]> {
    
    try {
      const { data } = await api.get<Member[]>("/membros");

      const members:Member[] = [];
      
      data.forEach((element:any) => {

          const member:Member = new Member();

          member.set(element);
          
          member.projects = [];

          const projects:{projeto:Project, funcao:string}[] = element.projetosParticipante!;

          projects.forEach((p)=>{

              member.projects.push({id:p.projeto.id, funcao:p.funcao});
              
          })

          members.push(member);
          
      });
      
      
      return members;
    } catch (e) {
      throw e;
    }
  },
  async getMemberPhoto(rga: string) {
    try {
      const response = await api.get("/membros/" + rga + "/foto", {
        responseType: "blob",
      });

      const imageBlob: Blob = response.data;

      const imageUrl: string = URL.createObjectURL(imageBlob);
      return imageUrl;
    } catch (e) {
      return "/icon/user.png";
    }
  },

  async searchMembersByName(name: string): Promise<Member[]> {
    try {
      const { data } = await api.get<Member[]>("/membros?nome=" + name);

      return data;
    } catch (e) {
      throw e;
    }
  },
  async updateMemberPhoto(rga: string, photo: File | Blob): Promise<void> {
    try {
      const formData = new FormData();
      formData.append("photo", photo);

      await api.put(`/membros/${rga}/foto`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e) {
      throw e;
    }
  },
};
