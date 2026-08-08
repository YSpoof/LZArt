<script setup lang="ts" vapor>
  import { onMounted } from "vue";
  import siteData from "@/siteData";
  import ProjectCard from "@/components/ProjectCard.vue";
  import Footer from "@/components/layout/Footer.vue";

  onMounted(() => {
    siteData.projects.forEach((project) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = project.url;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
  });
</script>

<template>
  <div class="min-h-screen flex flex-col bg-base-300 relative overflow-hidden">
    <div class="gradient-bg"></div>

    <section class="hero min-h-[60vh] relative z-10">
      <div class="hero-content text-center flex-col">
        <div class="logo-glow mb-6">
          <img
            :src="siteData.siteLogo"
            :alt="`Logo ${siteData.siteName}`"
            width="120"
            height="120"
            class="w-24 h-24 md:w-32 md:h-32 drop-shadow-2xl hover:scale-120 active:scale-95 transition-transform duration-300" />
        </div>
        <h1 class="text-5xl md:text-7xl font-black tracking-tight">
          <span>
            {{ siteData.siteName }}
          </span>
        </h1>
        <p
          class="text-xl md:text-2xl text-base-content/70 font-light tracking-widest uppercase mt-4">
          {{ siteData.siteDescription }}
        </p>
        <a
          href="#projects"
          class="btn btn-primary btn-lg mt-8 gap-2 group shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
          Ver Projetos
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 transition-transform group-hover:translate-y-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>

    <main
      id="projects"
      class="container mx-auto flex-1 px-4 py-16 relative z-10">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
        <span class="text-base-content">Nossos </span>
        <span class="text-primary">Projetos</span>
      </h2>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <ProjectCard
          v-for="project in siteData.projects"
          :key="project.title"
          v-bind="project" />
      </div>
    </main>

    <Footer
      :site-name="siteData.siteName"
      :site-logo="siteData.siteLogo"
      :contact-email="siteData.contatEmail" />
  </div>
</template>
