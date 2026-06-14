import { reactive, ref, type Reactive, type Ref} from 'vue'
import { defineStore } from 'pinia'
import type { Member, MemberMap } from '@/types/Member';
import { memberService } from '@/services/memberService';

export const useMemberStore = defineStore('member', () => {

    const memberMap:Reactive<MemberMap> = reactive<MemberMap>(new Map());
    const photoMap:Reactive<Map<string, string>> = reactive<Map<string,string>>(new Map());

    const focusedMember:Ref<Member | null> = ref<Member | null>(null);
    const focusedIndex:Ref<number> = ref<number>(-1);

    function setFocusedMember(member:Member, index:number){
            focusedMember.value = member;
            focusedIndex.value = index;
    }

    function reset(){
        focusedIndex.value = -1;
        focusedMember.value = null;
    }

    async function setupMembers(){
        
        console.log(memberMap.size)
        if (memberMap.size > 0)
            return;

        console.log(memberMap)
        const members:Member[] = await memberService.getAllMembers();

        members.forEach(member =>{
            memberMap.set(member.rga, member);
        })
    }

    async function setupMembersPhotos() {

        if (photoMap.size > 0)
            return;
        
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
            return '/icon/user.png';
        }
    }

    function getMemberArray():Member[]{

        return Array.from(memberMap.values());
    }

    function getMember(rga:string):Member{

        return memberMap.get(rga)!;
    }

    return {memberMap,
            focusedMember,
            focusedIndex,
            setFocusedMember,
            reset,
            setupMembers, 
            setupMembersPhotos,
            getPhoto, 
            getMemberArray,
            getMember}
})
