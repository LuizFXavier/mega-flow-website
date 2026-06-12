<script setup lang="ts">
interface Props{
    name:string;
    photoUrl:string;
}
const {name, photoUrl} = defineProps<Props>();

</script>
<template>
    <div class="border border-[#C2C2C2] rounded-full
                flex flex-row
                place-items-center
                gap-3
                p-1">

        <div class="w-1/6">
            <img :src="photoUrl" alt=""
                class="aspect-square
                        h-8
                        rounded-full">
        </div>
        <div class="flex flex-col
                    w-4/6">
        {{ name }}
            <slot>
                
            </slot>
        </div>

        <div class="w-1/6
                    flex
                    place-items-center">
            <slot name="button"></slot>
        </div>
    </div>
</template>