import { component$ } from "@builder.io/qwik";
import { GithubIcon } from "~/icons/github-icon";
// import MarkdownIt from "markdown-it";


const obtenerTiempoTranscurrido = (fecha: Date) => {
  const tiempoActual = Date.now();
  const tiempoPasado = new Date(fecha).getTime();
  const diferencia = tiempoActual - tiempoPasado;

  const segundos = Math.floor(diferencia / 1000);
  const minutos = Math.floor(segundos / 60);
  const horas = Math.floor(minutos / 60);
  const dias = Math.floor(horas / 24);

  if (dias > 0) {
    return `hace ${dias} días`;
  } else if (horas > 0) {
    return `hace ${horas} horas`;
  } else if (minutos > 0) {
    return `hace ${minutos} minutos`;
  } else {
    return "hace unos segundos";
  }
};

export default component$((props: any) => {

  // const getMarkdown = $(async (repoURL: string) => {
  //   const markdown = new MarkdownIt();
  //   const readme = await fetch(`${repoURL}/readme`)
  //     .then((data) => data.json())
  //     .then((data) => data);

  //   console.log("lo que queremos", readme);

  //   return markdown.render(atob(readme.content));

  // });

  return (
    <div class="my-6">
      <div class="">
        <div class="flex p-4 gap-2">
          <GithubIcon width={40} height={28} />
          <span class="font-medium text-lg">Github Repos</span>
        </div>
        <ul class="flex flex-col overflow-x-auto overflow-y-hidden">
          {props.repos.slice(0, 4).map((repo: any) => (
            <li
              class="p-4 flex justify-between gap-2"
              key={repo.id}
            >
              <div class="flex flex-col gap-1">
                <span class="font-medium text-base">{repo.name}</span>
                <div class="flex gap-2 items-center">
                  {repo.language && (
                    <span class="text-zinc-500 flex gap-2 items-center">
                      <i
                        class={`${props.iconsMatch[repo.language.toLowerCase()]
                          } text-xl text-white`}
                      ></i>

                      {repo.language}
                    </span>
                  )}

                  <span class="text-zinc-500">
                    {obtenerTiempoTranscurrido(repo.updated_at)}
                  </span>
                </div>
              </div>

              <div class="flex gap-2">
                <button onClick$={() => props.copyUrlFN(repo.clone_url)}>
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M878-79 750-207v125h-60v-228h228v60H792l128 128-42 43ZM520-600h220L520-820v220ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h340l240 240v270H630v290H220Z" />
                  </svg>
                </button>
                <button>
                  <svg
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M180-81q-24 0-42-18t-18-42v-603h60v603h474v60H180Zm120-120q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Z" />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
