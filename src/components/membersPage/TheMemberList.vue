<script setup lang="ts">
import { useMemberStore } from '@/stores/memberStore';
import MemberCard from './MemberCard.vue';
import { onMounted, ref, watch } from 'vue';
import { Member } from '@/types/Member';

const memberStore = useMemberStore();

const members = ref<Member[]>([]);

watch(memberStore.memberMap, () => {

  members.value = memberStore.getMemberArray();
})

onMounted(()=>{
    members.value = memberStore.getMemberArray();
})

</script>

<template>
    <article class="w-full h-full 
                    grid gap-4 
                    grid-cols-4 grid-rows-2 
                    p-4 
                    overflow-y-auto">
        <MemberCard v-for="member in members"
                    :member="member"/>
    </article>
</template>