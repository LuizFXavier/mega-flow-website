import { reactive, type Reactive} from 'vue'
import { defineStore } from 'pinia'
import type { Member, MemberMap } from '@/types/Member';
import { memberService } from '@/services/memberService';

export const useMemberStore = defineStore('member', () => {

    const memberMap:Reactive<MemberMap> = reactive<MemberMap>(new Map());
    const photoMap:Reactive<Map<string, string>> = reactive<Map<string,string>>(new Map());

    async function setupMembers(){
        
        if (memberMap.size > 0)
            return;

        const members:Member[] = await memberService.getAllMembers();

        members.forEach(member =>{
            memberMap.set(member.rga, member);
        })
    }

    async function setupMembersPhotos() {

        memberMap.forEach(async (member, rga) =>{
            const photoUrl:string = await memberService.getMemberPhoto(rga);
            photoMap.set(rga, photoUrl);
        })
    }

    function getPhoto(rga:string){

        if (photoMap.has(rga)){

            const photoUrl = photoMap.get(rga);

            return photoUrl!;
        }
        else{
            return '/icon/sidebar/members.png';
        }
    }

    function getMemberArray():Member[]{

        const members:Member[] = []

        memberMap.forEach((member)=>{
            members.push(member);
        })

        return members;
    }

    function getMember(rga:string):Member{

        return memberMap.get(rga)!;
    }

    return {memberMap, 
            setupMembers, 
            setupMembersPhotos, 
            getPhoto, 
            getMemberArray,
            getMember}
})
