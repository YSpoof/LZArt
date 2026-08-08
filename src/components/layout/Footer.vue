<script setup lang="ts" vapor>
  defineProps<{
    siteName: string;
    siteLogo: string;
    contactEmail: string;
  }>();

  const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer footer-center bg-base-300/50 backdrop-blur-sm text-base-content py-8 relative z-10 border-t border-base-content/5">
    <aside class="flex flex-col items-center gap-2">
      <div class="flex items-center gap-3 mb-2">
        <img :src="siteLogo" alt="Logo" class="w-8 h-8 opacity-70" />
        <span class="font-bold text-lg">{{ siteName }}</span>
      </div>
      <a
        class="link link-hover text-base-content/70 hover:text-primary transition-colors"
        :href="`mailto:${contactEmail}`">
        {{ contactEmail }}
      </a>
      <p class="text-base-content/50 text-sm">&copy; {{ year }} - Todos os direitos reservados</p>
    </aside>
  </footer>
</template>
