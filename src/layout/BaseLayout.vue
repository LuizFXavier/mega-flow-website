<script setup lang="ts">
import TheSidebar from '@/components/sidebar/TheSidebar.vue';
</script>

<template>
    <div class="w-full h-full
                 flex flex-row">

        <section class = "h-full w-9/200 
                      content-center
                      ml-3 mr-3">
            <TheSidebar/>
        </section>
        <section class = "h-full w-191/200 
                      items-center
                      flex 
                      mr-3">

            <div class="h-95/100 w-full 
                        flex flex-col 
                        gap-2">
            <slot name = "header"></slot>
            
            <div class="bg-white 
                border border-gray-border
                rounded-2xl
                flex-4">

                <slot></slot>
            </div>
            </div>
            
        </section>
        
    </div> 
</template>