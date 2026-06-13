import { memberService } from "@/services/memberService";
import { AuthLevel } from "@/types/AuthorizationLevel";

import { Member, parseUser, type UserAPI } from "@/types/Member";
import { jwtDecode } from "jwt-decode";
import { defineStore } from "pinia";
import { reactive, ref, type Reactive, type Ref } from "vue";


export const useUserStore = defineStore('user', ()=>{

    const user: Reactive<Member> = reactive(new Member());
    const level: Ref<AuthLevel> = ref(AuthLevel.MEMBER);

    async function setUserFromToken(token:string){
        const payload = jwtDecode(token) as UserAPI;

        const member = parseUser(payload);
        
        user.set(member);

        localStorage.setItem('user', JSON.stringify(user));

        if(user.cargo === "MEMBRO"){
            level.value = AuthLevel.MEMBER;
        }
        else if(user.cargo === "DIRETOR"){
            level.value = AuthLevel.DIRECTOR;
        }
        else if(user.cargo === "ADMINISTRADOR"){
            level.value = AuthLevel.ADMIN;
        }

    }

    async function setupPhoto() {

        if (user.fotoURL === null){
            
            user.fotoURL = await memberService.getMemberPhoto(user.rga);
        }

    }

    function photo(){
        return user.fotoURL ? user.fotoURL : "/icon/user.png";
    }

    function checkUser(){
        return user.rga.length > 0 && localStorage.getItem('user');
    }

    function isDirector():boolean{
        return level.value >= AuthLevel.DIRECTOR;
    }

    function isAdmin():boolean{
        return level.value === AuthLevel.ADMIN;
    }

    function clear(){
        user.clear()
        localStorage.removeItem('user');
        localStorage.removeItem('userPhoto');
    }

    return {user, setupPhoto, photo, isDirector, isAdmin, checkUser, setUserFromToken, clear}
});