<script setup lang="ts">
import TheSidebar from '@/components/sidebar/TheSidebar.vue';
import { useSidebarStore } from '@/stores/sidebarStore';

const sidebarStore = useSidebarStore();

</script>

<template>
    <div class="w-full h-full
                 flex flex-row gap-2 px-5">

        <section class="h-full 
                        content-center
                         "
                 :class="{'w-10/200':!sidebarStore.state, 'w-30/200':sidebarStore.state}">
            <TheSidebar/>
        </section>
        <section class="h-full
                        items-center
                        flex 
                        "
                 :class="{'w-190/200':!sidebarStore.state, 'w-170/200':sidebarStore.state}">

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