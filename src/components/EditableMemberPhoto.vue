<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { memberService } from '@/services/memberService';
import { compressImage } from '@/utils/MemberPhotoUtils';
import MemberPhoto from './MemberPhoto.vue';
import type { Member } from '@/types/Member.ts';
import { useMemberStore } from '@/stores/memberStore.ts';

const userStore = useUserStore();

// Referências
const inputArquivoRef = ref<HTMLInputElement | null>(null);
const urlPreview = ref<string | null>(null);
const arquivoSelecionado = ref<File | null>(null);
const isLoading = ref<boolean>(false);

interface Props{
    focusedMember:Member;
}

const {focusedMember} = defineProps<Props>();

function abrirSeletor() {
  inputArquivoRef.value?.click();
}

// 2. Captura o arquivo e gera o preview temporário
function tratarArquivoSelecionado(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    arquivoSelecionado.value = input.files[0]!;
    urlPreview.value = URL.createObjectURL(arquivoSelecionado.value!);
  }
}

// 3. Cancela a ação e volta para a foto original
function cancelarEdicao() {
  arquivoSelecionado.value = null;
  urlPreview.value = null;
  if (inputArquivoRef.value) {
    inputArquivoRef.value.value = ''; // Limpa o input
  }
}

// 4. Salva a foto (Comprime e Envia)
async function salvarNovaFoto() {
  if (!arquivoSelecionado.value) return;

  isLoading.value = true;
  try {
    const fotoComprimida = await compressImage(arquivoSelecionado.value);
    
    // Envia para a API
    await memberService.updateMemberPhoto(focusedMember.rga, fotoComprimida);

    // Atualiza o estado global para reatividade
    if (urlPreview.value) {
      focusedMember.fotoURL = urlPreview.value;
    }

    // Limpa a interface (os botões de confirmar somem)
    arquivoSelecionado.value = null;
    
  } catch (erro) {
    console.error(erro);
    alert("Falha ao atualizar a foto.");
  } finally {
    isLoading.value = false;
  }
}

const memberStore = useMemberStore();

</script>

<template>
  <div class="relative w-20 h-20 2xl:w-24 2xl:h-24">
    
    <MemberPhoto 
      :photo-url="urlPreview ? urlPreview : memberStore.getPhoto(focusedMember.rga)"
      class="bg-[#E2E2E2] w-full h-full rounded-full object-cover"
      :class="{ 'opacity-50': isLoading }"
    />

    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center text-purple-600 font-bold">
      ...
    </div>

    <button 
      v-if="!arquivoSelecionado && !isLoading"
      @click.stop="abrirSeletor"
      class="absolute -bottom-1 -right-2 
             bg-white hover:bg-gray-100 transition-colors
             rounded-lg p-1.5 shadow-md border border-gray-200
             flex items-center justify-center"
      title="Alterar foto"
    >
      <img src="/icon/edit.png" class="w-5 h-5 object-contain" alt="Editar">
    </button>

    <div 
      v-if="arquivoSelecionado && !isLoading" 
      class="absolute -bottom-2 -right-8 flex gap-1 bg-white p-1 rounded-xl shadow-lg border border-gray-200"
    >
      <button 
        @click.stop="salvarNovaFoto"
        class="bg-green-500 hover:bg-green-600 text-white w-7 h-7 rounded-lg flex items-center justify-center transition-colors shadow-sm"
        title="Salvar"
      >
        ✓
      </button>

      <button 
        @click.stop="cancelarEdicao"
        class="bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-lg flex items-center justify-center transition-colors shadow-sm"
        title="Cancelar"
      >
        ✕
      </button>
    </div>

    <input 
      type="file" 
      ref="inputArquivoRef" 
      accept="image/png, image/jpeg, image/jpg" 
      class="hidden" 
      @change="tratarArquivoSelecionado"
    />

  </div>
</template>