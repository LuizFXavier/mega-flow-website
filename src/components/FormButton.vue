<script setup lang="ts">
import { computed } from 'vue';


const emit = defineEmits(['click'])

type btnPreset = 'cancel' | 'confirm';

interface Props{
    preset:btnPreset;
}

const {preset} = defineProps<Props>();

const btnCollor = computed(()=>{
    return preset == 'cancel' ? '#DA0004' : '#16A34A';
})

</script>

<template>
    <button @click.prevent="emit('click')"
            :style="{ backgroundColor: btnCollor }"
            class="text-white
                    rounded-sm
                    text-2xl
                    w-1/4
                    h-full
                    shadow-2xl
                    ">
        <slot></slot>
    </button>
</template>