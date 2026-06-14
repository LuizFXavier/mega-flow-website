<script setup lang="ts">

interface Props {
    title?: string;
    boxClass?: string; 
}

const props = withDefaults(defineProps<Props>(), {
    boxClass: 'h-85/100 aspect-square bg-white '
});


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
          class=" rounded-2xl 
                  shadow-xl 
                  border border-gray-border 
                  flex flex-col  
                  "
          :class="props.boxClass"
      >
        
      <slot></slot>
        

      </div>
      
    </div>
  </Teleport>
</template>