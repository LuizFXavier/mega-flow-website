<script setup lang="ts">
import TheSidebar from '@/components/sidebar/TheSidebar.vue';
import TheDashboardHeader from '@/components/dashboard/TheDashboardHeader.vue';
import TheDashboardReport from '@/components/dashboard/TheDashboardReport.vue';

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
                <TheDashboardHeader/>
                <TheDashboardReport/>
            </div>
            
        </section>
        
    </div> 
</template>