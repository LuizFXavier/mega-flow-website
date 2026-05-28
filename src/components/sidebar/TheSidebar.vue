<script setup lang="ts">
import { useRouter } from 'vue-router'
import SidebarNav from './SidebarNav.vue';

</script>
<template>
    <section class = "h-full w-9/200 
                      content-center
                      ml-3 mr-3">
        <div class="flex flex-col 
                        bg-white border border-[#E5E7EB] rounded-2xl
                        w-full h-95/100
                        
                        ">
            <div class="w-full h-1/10 
                        bg-linear-to-r from-[#43226C] to-[#8242D2] 
                        rounded-t-2xl
                        flex
                        place-items-center
                        ">

                <SidebarNav target-route="/projects" icon-url="/icon/sidebar/projects.png"/>
            </div>

            <SidebarNav target-route="/" icon-url="/icon/sidebar/menu.png"/>
            <SidebarNav target-route="/projects" icon-url="/icon/sidebar/projects.png"/>
            <SidebarNav target-route="/members" icon-url="/icon/sidebar/members.png"/>

            <button class="justify-items-center 
                           mt-4">
                <img src="/icon/sidebar/log-out.png" alt="icon">
            </button>
        </div>
    </section>
</template>