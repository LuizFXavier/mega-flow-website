<script setup lang="ts">
import { useMemberStore } from '@/stores/memberStore';
import MemberCard from './MemberCard.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { Member } from '@/types/Member';

const memberStore = useMemberStore();

interface Props {
    members: Member[];
}

const { members } = defineProps<Props>();

const emit = defineEmits<{
  (e: 'openDetailModal'): void
  (e: 'openEditModal'):void
}>();


const page_items = 8;
const actualPage = ref(1);

const totalPages = computed(() => Math.ceil(members.length / page_items));

const visibleMembers = computed(() => {
    return members.slice(
        (actualPage.value - 1) * page_items,
        actualPage.value * page_items,
    );
});

watch(visibleMembers, (value) => {

  if (value.length === 0){
  
    if(actualPage.value != 1)
    actualPage.value = previousPage.value
  }
})

const previousPage = computed(() => {
    return actualPage.value - 1;
});

const nextPage = computed(() => {
    return actualPage.value + 1;
});

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
  <article class="w-full h-full flex flex-col">
      <div class="w-full h-full
                      grid gap-4 
                      grid-cols-4 grid-rows-2 
                      p-4 
                      overflow-y-auto">
          <MemberCard v-for="(member, index) in visibleMembers"
                      :member="member"
                      @open-modal="openDetailModal(member, index)"
                      @open-edit-modal="openEditModal(member, index)"/>
    </div>

    <div
            v-if="totalPages > 1"
            class="flex justify-center items-center gap-4 p-4 border-gray-200"
            >
            <div>
                <button
                @click="actualPage = previousPage"
                :disabled="actualPage === 1"
                class="px-4 py-2 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
                >
                Anterior
                </button>
                <span>{{ actualPage }}/{{ totalPages }}</span>
                <button
                    @click="actualPage = nextPage"
                    :disabled="actualPage === totalPages"
                    class="px-4 py-2 bg-gray-100 rounded disabled:opacity-50 hover:bg-gray-200 transition-colors"
                >
                    Próximo
                </button>
            </div>
        </div>
  </article>
</template>