import { memberService } from "@/services/memberService";
import { Member, type UserAPI } from "@/types/Member";
import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";
import { reactive, type Reactive } from "vue";


export const useUserStore = defineStore('user', ()=>{

    const user: Reactive<Member> = reactive(new Member());

    async function setUserFromToken(token:string){
        const payload = jwtDecode(token) as UserAPI;
        
        user.rga = payload.sub;
        user.cargo = payload.cargo;

        const member = await memberService.getMember(user.rga);

        user.set(member);
        
        localStorage.setItem('user', JSON.stringify(user));
    }

    function checkUser(){
        return user.rga.length > 0 && localStorage.getItem('user');
    }

    function clear(){
        user.clear()
        localStorage.removeItem('user');
    }

    return {user, checkUser, setUserFromToken, clear}
});