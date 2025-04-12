import { Index, onMount } from "solid-js";
import siteData from "./siteData";

export default function App() {
  onMount(() => {
    const newBody = document.getElementById("newBody");
    if (newBody) newBody.style.backgroundImage = `url(${siteData.bgImage})`;

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

    randomizeBgPosition();
  });

  const year = new Date().getFullYear();

  const randomizeBgPosition = () => {
    const newBgPosition = `${Math.floor(Math.random() * 100)}% ${Math.floor(
      Math.random() * 100
    )}%`;
    const newBody = document.getElementById("newBody");
    if (newBody) newBody.style.backgroundPosition = newBgPosition;
  };

  return (
    <div
      id="newBody"
      class="bg-right-bottom bg-repeat flex flex-col justify-between transition-all ease-out duration-500">
      <main class="container text-center min-w-full min-h-screen h-full">
        <div class="logo max-w-64 mx-auto">
          <img
            src={siteData.siteLogo}
            alt="Logo LZArt"
            onMouseOver={randomizeBgPosition}
          />
        </div>
        <h1 class="text-xl m-4 font-bold">Projetos</h1>
        <div class="flex flex-col gap-4 max-w-fit mx-auto">
          <Index each={siteData.projects} fallback={<div>Loading...</div>}>
            {(project) => (
              <a
                class="transition-all text-center text-stone-300 bg-stone-900/60 px-4 py-2 rounded-lg hover:scale-105 hover:text-stone-100 active:scale-95"
                href={project().url}
                target="_blank"
                title={`Built on ${project().technology}`}>
                {project().title}
              </a>
            )}
          </Index>
        </div>
      </main>
      <footer class="mt-8 text-center bg-stone-900/30 p-1">
        <p class="text-stone-300">
          <a
            class="transition-all hover:text-stone-100 hover:underline"
            href={`mailto:${siteData.contatEmail}`}>
            contato@lzart.com.br
          </a>{" "}
          - {year}
        </p>
      </footer>
    </div>
  );
}
