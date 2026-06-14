<script setup lang="ts">
import { useMemberStore } from '@/stores/memberStore';
import MemberCard from './MemberCard.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { Member } from '@/types/Member';

const memberStore = useMemberStore();

// const members = ref<Member[]>([]);

// watch(memberStore.memberMap, () => {

//   members.value = memberStore.getMemberArray();
// })

interface Props {
    members: Member[];
}

const { members } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'openDetailModal'): void
  (e: 'openEditModal'):void
}>();


const page_items = 9;
const actualPage = ref(1);
const totalPages = computed(() => Math.ceil(members.length / page_items));

function openDetailModal(member:Member, localindex:number) {

  const globalIndex = (actualPage.value - 1) * page_items + localindex;
  memberStore.setFocusedMember(member, globalIndex);
  emit('openDetailModal');
}

function openEditModal(member:Member, localindex:number) {
  console.log('list')
  const globalIndex = (actualPage.value - 1) * page_items + localindex;
  memberStore.setFocusedMember(member, globalIndex);
  emit('openEditModal');
}

</script>

<template>
    <article class="w-full h-full
                    grid gap-4 
                    grid-cols-4 grid-rows-2 
                    p-4 
                    overflow-y-auto">
        <MemberCard v-for="(member, index) in members"
                    :member="member"
                    @open-modal="openDetailModal(member, index)"
                    @open-edit-modal="openEditModal(member, index)"/>
    </article>
</template>