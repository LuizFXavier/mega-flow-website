<script setup lang="ts">

interface Props{
    title?:string;
}

const props = defineProps<Props>();


const emit = defineEmits(['close']);
</script>

<template>
  <Teleport to="body">
    
    <div
      @click="emit('close')"
      class = " fixed inset-0 z-50 
                flex 
                items-center justify-center 
                bg-black/60
                "
    >
      
      <div @click.stop 
          class="bg-white 
                  h-85/100 
                  rounded-2xl 
                  shadow-xl 
                  border border-gray-border 
                  flex flex-col  
                  aspect-square
                  
                  py-2"
      >
        
      <slot></slot>
        

      </div>
      
    </div>
  </Teleport>
</template>