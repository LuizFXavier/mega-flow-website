<script setup lang="ts">
import { useSidebarStore } from '@/stores/sidebarStore';


const props = defineProps({
    targetRoute: {type: String, required: true},
    iconUrl:String,
    isSidebarOpen:Boolean,
    marked:Boolean
});

const sidebarStore = useSidebarStore();

</script>
<template>
    
    <!-- <RouterLink v-show="!isSidebarOpen" :to="targetRoute" 
                class="w-full
                       flex
                       justify-center
                       py-4
                       "
                >
        <div :class="marked ? 'bg-linear-to-r from-mega-dark to-mega-light  rounded-full' : ''">
        
            <img :src="props.iconUrl"
                alt="icon"
                
            >
        </div>
    </RouterLink> -->

    <RouterLink v-show="!sidebarStore.state" 
                :to="targetRoute" 
                class="w-full 
                       flex 
                       justify-center 
                       py-4 
                       group"
                @click.stop>
                
        <div :class="[
            'w-8/10 aspect-square flex items-center justify-center rounded-full transition-all duration-200',
            marked ? 'bg-linear-to-r from-mega-dark to-mega-light' : 'bg-transparent group-hover:bg-gray-200'
            ]">
            <img 
                :src="props.iconUrl"
                alt="icon"
                class="w-7 h-7 object-contain"
                :class="marked ? 'invert' : ''"
            >
            
        </div>
    </RouterLink>

    <!-- <div v-show="sidebarStore.state"
         class="w-full
                flex
                px-4"
         > -->
        <RouterLink v-show="sidebarStore.state"
                    :to="targetRoute" 
                    class="w-full
                        flex
                        place-items-center
                        gap-2
                        p-2
                        py-4
                        group
                        justify-center
                        "
                    @click.stop   
                >

            <div :class="[
                'w-9/10 p-2 flex gap-5 items-center  rounded-xl transition-all duration-200',
                marked ? 'bg-linear-to-r from-mega-dark to-mega-light' : 'bg-transparent group-hover:bg-gray-200'
                ]">
                <img 
                    :src="props.iconUrl"
                    alt="icon"
                    class="w-7 h-7 object-contain"
                    :class="marked ? 'invert' : ''"
                >
            
                <h1 class="font-bold"
                    :class="marked ? 'invert':''">
                    <slot ></slot>
                </h1>
            </div>

        </RouterLink>
    <!-- </div> -->
</template>