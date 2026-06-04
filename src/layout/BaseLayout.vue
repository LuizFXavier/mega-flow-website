<script setup lang="ts">
import TheSidebar from '@/components/sidebar/TheSidebar.vue';
import { ref } from 'vue';

const isSidebarOpen = ref<boolean>(true)

</script>

<template>
    <div class="w-full h-full
                 flex flex-row">

        <section class="h-full 
                        content-center
                        ml-3 mr-3"
                 :class="{'w-9/200':!isSidebarOpen, 'w-30/200':isSidebarOpen}">
            <TheSidebar v-model="isSidebarOpen"/>
        </section>
        <section class="h-full
                        items-center
                        flex 
                        mr-3"
                 :class="{'w-191/200':!isSidebarOpen, 'w-170/200':isSidebarOpen}">

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