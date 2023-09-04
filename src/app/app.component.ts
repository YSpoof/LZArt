import { Component } from "@angular/core";
import siteData from "./siteData";

@Component({
  selector: "app-root",
  template: `
    <div
      id="newBody"
      class="bg-right-bottom bg-repeat min-h-screen min-w-screen flex flex-col justify-between transition-all ease-out duration-500 bg-[url('/background.webp')]"
    >
      <main class="container text-center min-w-full">
        <div class="logo max-w-64 mx-auto">
          <img
            src="/logo.webp"
            alt="Logo LZArt"
            (mouseover)="randomizeBgPosition()"
          />
        </div>
        <h1 class="text-xl m-4 font-bold">Projetos</h1>
        <div class="flex flex-col gap-4 max-w-fit mx-auto">
          @for (project of siteMeta.projects; track project.url) {
          <a
            class="transition-all text-center text-stone-300 bg-stone-900/50 px-4 py-2 rounded-lg hover:scale-105 hover:text-stone-100 active:scale-95"
            [href]="project.url"
            target="_blank"
            >{{ project.title }}</a
          >
          }
        </div>
      </main>
      <footer class="text-center bg-stone-900/30 p-1">
        <p class="text-stone-300">
          <a
            class="transition-all hover:text-stone-100 hover:underline"
            href="mailto:{{ siteMeta.contatEmail }}"
            >contato&#64;lzart.com.br</a
          >
          <-> {{ year }}
        </p>
      </footer>
    </div>
  `,
})
export class AppComponent {
  siteMeta = siteData;
  year = new Date().getFullYear();
  randomizeBgPosition() {
    const newBgPosition = `${Math.floor(Math.random() * 100)}% ${Math.floor(
      Math.random() * 100
    )}%`;
    const newBody = document.getElementById("newBody");
    if (newBody) newBody.style.backgroundPosition = newBgPosition;
  }

  ngOnInit() {
    window.addEventListener("blur", this.randomizeBgPosition);
    window.addEventListener("focus", this.randomizeBgPosition);

    this.siteMeta.projects.forEach((project) => {
      let link = document.createElement("link");
      link.rel = "prefetch";
      link.href = project.url;
      link.as = "document";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
      link.rel = "preconnect";
      document.head.appendChild(link);
    });

    this.randomizeBgPosition();
  }
}
