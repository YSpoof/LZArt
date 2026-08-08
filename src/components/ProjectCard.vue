<script setup lang="ts" vapor>
  defineProps<{
    title: string;
    url: string;
    technology: string;
    tooltip: string;
    preview?: string;
  }>();
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener"
    class="card glass-card group cursor-pointer">
    <figure v-if="preview" class="relative overflow-hidden aspect-video">
      <img
        :src="preview"
        :alt="title"
        class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" />
      <div class="absolute inset-0 bg-linear-to-t from-base-300 to-transparent opacity-60"></div>
    </figure>
    <div v-else class="aspect-video flex items-center justify-center bg-linear-to-br from-primary/20 to-secondary/20">
      <span class="text-5xl font-black text-base-content/20">{{ title.charAt(0) }}</span>
    </div>
    <div class="card-body p-5">
      <h3 class="card-title text-lg group-hover:text-primary transition-colors">
        {{ title }}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </h3>
      <p class="text-sm text-base-content/70 line-clamp-2">{{ tooltip }}</p>
      <div class="card-actions justify-start mt-2">
        <span class="badge badge-sm badge-primary badge-outline">{{ technology }}</span>
      </div>
    </div>
  </a>
</template>
