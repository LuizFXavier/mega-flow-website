import { Member } from "@/types/Member";
import api from "./api"

export const memberService = {
  
    // Função que recupera as informações de um membro dado um rga
    async getMember(rga:string):Promise<Member> {

        try{
            const {data} = await api.get<Member>('/membros/' + rga);
            
            return data;
        }
        catch(e){
            throw e;
        }
    },
    async getAllMembers():Promise<Member[]> {

        try{
            const {data} = await api.get<Member[]>('/membros');
            
            return data;
        }
        catch(e){
            throw e;
        }
    },
    async getMemberPhoto(rga:string){
        try{
            const response = await api.get('/membros/' + rga + '/foto', {
                responseType: 'blob'
            });
            
            const imageBlob: Blob = response.data;
              
            const imageUrl: string = URL.createObjectURL(imageBlob);
            return imageUrl; 
            
        }
        catch(e){
            throw(e)
        }
    },

    async searchMembersByName(name:string):Promise<Member[]>{
        try{
            const {data} = await api.get<Member[]>('/membros?nome=' + name);
            
            return data;
        }
        catch(e){
            throw e;
        }
    }
    
}