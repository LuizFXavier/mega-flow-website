import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type SidebarEntry } from '@/types/SidebarEntry'

export const useSidebarStore = defineStore('sidebar', () => {
  const entry = ref<SidebarEntry>('');
  const state = ref<boolean>(false);
  
  function set(entryValue:SidebarEntry | undefined){
    
    if (entryValue)
        entry.value = entryValue;
  }

  function toggle(){
    state.value = !state.value;
  }

  return {entry, state, set, toggle}
})