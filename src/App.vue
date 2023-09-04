<script setup lang="ts" vapor>
  import { onMounted, onBeforeUnmount, useTemplateRef } from "vue";
  import siteData from "@/siteData";

  const year = new Date().getFullYear();
  const newBodyRef = useTemplateRef("newBody");

  const randomizeBgPosition = () => {
    const newBgPosition = `${Math.floor(Math.random() * 100)}% ${Math.floor(
      Math.random() * 100
    )}%`;
    if (newBodyRef.value)
      newBodyRef.value.style.backgroundPosition = newBgPosition;
  };

  onMounted(() => {
    if (newBodyRef.value)
      newBodyRef.value.style.backgroundImage = `url(${siteData.bgImage})`;

    window.addEventListener("blur", randomizeBgPosition);
    window.addEventListener("focus", randomizeBgPosition);

    siteData.projects.forEach((project) => {
      let link = document.createElement("link");
      link.rel = "prefetch";
      link.href = project.url;
      link.as = "document";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      link.rel = "preconnect";
      document.head.appendChild(link);
    });
  });

  onBeforeUnmount(() => {
    // Clean up event listeners
    window.removeEventListener("blur", randomizeBgPosition);
    window.removeEventListener("focus", randomizeBgPosition);
  });
</script>

<template>
  <div
    ref="newBody"
    class="bg-right-bottom bg-repeat flex flex-col justify-between transition-all ease-out duration-500">
    <main class="container text-center min-w-full min-h-screen h-full">
      <div class="logo max-w-64 mx-auto mt-8">
        <img
          :src="siteData.siteLogo"
          alt="Logo LZArt"
          height="256"
          width="256"
          title="Built on Vue"
          @mouseover="randomizeBgPosition" />
      </div>
      <h1 class="text-xl m-4 font-bold">Projetos</h1>
      <div class="flex flex-col gap-4 max-w-fit mx-auto">
        <template v-if="siteData.projects.length">
          <a
            v-for="project in siteData.projects"
            :key="project.title"
            class="transition-all text-center text-stone-300 bg-stone-900/60 px-4 py-2 rounded-lg hover:scale-105 hover:text-stone-100 active:scale-95"
            :href="project.url"
            target="_blank"
            :title="`Built on ${project.technology}`">
            {{ project.title }}
          </a>
        </template>
        <div v-else>Loading...</div>
      </div>
    </main>
    <footer class="mt-8 text-center bg-stone-900/30 p-1">
      <p class="text-stone-300">
        <a
          class="transition-all hover:text-stone-100 hover:underline"
          :href="`mailto:${siteData.contatEmail}`">
          {{ siteData.contatEmail }}
        </a>
        - {{ year }}
      </p>
    </footer>
  </div>
</template>
