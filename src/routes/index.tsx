import {
  component$,
  useVisibleTask$,
  useTask$,
  useStore,
  useStylesScoped$,
  $,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { Twitch } from "../utils/api-twitch";
import MarkdownIt from "markdown-it";

import mdStyles from "../utils/md-css.css?inline";
import { YoutubeIcon } from "~/icons/youtube-icon";
import { GithubIcon } from "~/icons/github-icon";
import { TwitchIcon } from "~/icons/twitch-icon";
import { LogoIcon } from "~/icons/logo-icon";

const twitchDataInfo = $(async function (
  name: string,
  state: any,
  apiTwitch: any
) {
  const channelName = name || "ArturoZarzalejo";

  state.twitch.userInfo = await apiTwitch.getUser(
    channelName,
    state.twitch.token.access_token,
    true
  );

  state.twitch.channelInfo = await apiTwitch.getChannel(
    state.twitch.userInfo.data[0].id,
    state.twitch.token.access_token,
    true
  );

  state.twitch.categoryInfo = await apiTwitch.getCategory(
    state.twitch.channelInfo.data[0].game_id,
    state.twitch.token.access_token,
    true
  );

  state.twitch.streams = await apiTwitch.getStreams(
    state.twitch.userInfo.data[0].id,
    state.twitch.token.access_token,
    true
  );
});

async function obtenerShortsYVideosDeCanal(apiKey: string, channelId: string, dev: Boolean) {
  try {

    const url = dev ? `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&maxResults=10&channelType=any&type=video&order=date&part=snippet&key=${apiKey}` : `/mocks/api-youtube-mock.json`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener los shorts y videos");
    }

    const data = await response.json();

    const videos = data.items;

    // console.log("videos:", videos);
    return videos;

    // Obtén los videos del canal (realiza otra solicitud si es necesario)
    // ...
  } catch (error) {
    console.error("Error al obtener los shorts y videos:", error);
  }
}

// async function obtenerThumbnailsYT(videoId: string, API_KEY: string) {
//   try {
//     const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${API_KEY}`;

//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error("Error al obtener los shorts y videos");
//     }

//     const data = await response.json();

//     // console.log("videos:", videos);
//     return data;
//   } catch (error) {
//     console.error("Error al obtener los shorts y videos:", error);
//   }
// }

export default component$(() => {
  useStylesScoped$(mdStyles);
  // useStylesScoped$(styles);

  const state = useStore<any>({
    apiGithubUrl: "https://api.github.com/users/arturozarzalejo",
    apiGithubMock: "/mocks/api-github-mock.json",
    apiGithubRepos: "https://api.github.com/users/arturozarzalejo/repos",
    apiGithubReposMock: "/mocks/api-github-repos.json",
    apiYoutubeMock: "/mocks/api-youtube-mock.json",
    dataServerJson: {},
    github: {
      repos: [],
    },
    twitch: {
      token: {},
      userInfo: {},
      categoryInfo: {},
      channelInfo: {},
      streams: {},
    },
    youtube: {
      videos: [],
    },
    iconsMatch: {
      'javascript': 'devicon-javascript-plain colored',
      'html': 'devicon-html5-plain colored',
      'typescript': 'devicon-typescript-plain colored',
      'css': 'devicon-css3-plain colored'
    }
  });

  const getMarkdown = $(async (repoURL: string) => {
    const markdown = new MarkdownIt();
    const readme = await fetch(`${repoURL}/readme`)
      .then((data) => data.json())
      .then((data) => data);

    state.github.readme = markdown.render(atob(readme.content));

    console.log("lo que queremos", state.github.readme);
  });

  const getRepos = $(async (dev: boolean) => {
    const url = dev ? state.apiGithubRepos : state.apiGithubReposMock;

    return fetch(url)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        // Manejo de errores
        console.log("Error:", error);
      });
  });

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
  }


  useTask$(async () => {
    // state.dataServerJson = await fetch(state.apiGithubMock)
    //   .then((response) => response.json())
    //   .then((data) => data)
    //   .catch((error) => {
    //     // Manejo de errores
    //     console.log("Error:", error);
    //   });
  });

  useVisibleTask$(async () => {
    state.dataServerJson = await fetch(state.apiGithubMock)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        // Manejo de errores
        console.log("Error:", error);
      });
    const apiKey = "AIzaSyC3O-zPANM6pcSOIY49QzaU66VJuCslKw4";
    const channelId = "UC9h5heKFR7KaoLSzjWIIxjw"; // ID del canal "arturodevelop"
    const youtubeVideos = await obtenerShortsYVideosDeCanal(apiKey, channelId, true);

    if (youtubeVideos) {
      state.youtube.videos = [...youtubeVideos];

      // state.youtube.videos.map(async (video: any) => {
      //   const videoMaxRes = await obtenerThumbnailsYT(video.id.videoId, apiKey);
      //   return (video.snippet.thumbnails =
      //     videoMaxRes.items[0].snippet.thumbnails);
      // });
    }

    const repos = await getRepos(true);

    state.github.repos = repos.sort((a: any, b: any) =>
      b.pushed_at.localeCompare(a.pushed_at)
    );

    const apiTwitch = new Twitch();
    state.twitch.token = await apiTwitch.getToken();
    await twitchDataInfo("ArturoDevelop", state, apiTwitch);

    console.log("cositas?", state);
  });

  return (
    <div class="text-white">
      <img
        class={`img-rounded hidden ${state.twitch.streams.data &&
          state.twitch.streams.data[0].type === "live" &&
          `live-image`
          }`}
        src={state.dataServerJson.avatar_url}
        alt=""
      />
      <header class="p-6">
        <h1 class="text-5xl font-semibold leading-tight tracking-wide max-w-[230px]">
          {state.dataServerJson.name}
        </h1>
        <figure
          class="
        flex justify-center absolute 
        top-0 right-4 w-32 h-80 z-10 
        after:bg-gradient-to-b after:from-[#9046FF] after:to-[rgba(0,0,0,0)] after:w-5/6 after:absolute after:top-0 after:h-full"
        >
          <LogoIcon
            classList={["relative", "top-8", "z-[4]"]}
            width={74}
            height={74}
          />
          <img
            class="absolute bottom-[-50px] scale-110"
            src="/imgs/pordiu.png"
            alt="Arturobobo"
          />
        </figure>
        <p class="text-2xl font-medium flex flex-col mt-24">
          <span class="flex gap-2">
            Front End <b style={"--characters:9ch;"} class="text-[#9046FF] typing-general delay-[1000]">Developer</b>
          </span>
          <span class="flex gap-2">
            Content <b style={"--characters:7ch; animation-delay: 0.5s;"} class="text-[#ECFF15] typing-general">Creator</b>
          </span>
          <span class="flex gap-2">
            Tech <b style={"--characters:5ch; animation-delay: 1s;"} class="text-[#DF3939] typing-general">Lover</b>
          </span>
        </p>
      </header>

      {/* <div class="card card-background-color card-box-shadow card-border-radius">
        <div class="md-css" dangerouslySetInnerHTML={state.github.readme}></div>
      </div> */}
      {(state.twitch.streams.data && state.twitch.streams.data.length && (
        <div class="my-12 mb-6">
          <div class="">
            <div class="flex p-4 gap-4">
              <TwitchIcon width={28} height={28} />
              <span class="font-medium text-lg">Twitch</span>
            </div>

            <img
              class="thumbnail-twitch"
              src={state.twitch.streams.data[0].thumbnail_url.replace(
                "{width}x{height}",
                "1920x1080"
              )}
              alt=""
            />
            <div class="flex p-4 gap-4 justify-center">
              <img
                class="w-12 h-12 rounded-lg"
                src={state.twitch.userInfo.data[0].profile_image_url}
                alt={state.twitch.userInfo.data[0].display_name}
              />
              <span class=" flex items-center font-medium text-sm leading-tight">
                {state.twitch.streams.data[0].title}
              </span>
            </div>
          </div>
        </div>
      )) ||
        ``}

      {(state.youtube.videos.length && (
        <div class="my-6">
          <div class="">
            <div class="flex p-4 gap-2">
              <YoutubeIcon width={40} height={28} fill="#FF0000" />
              <span class="font-medium text-lg">YouTube Videos</span>
            </div>
            <ul class="flex snap-proximity overflow-x-auto overflow-y-hidden">
              {state.youtube.videos.map((video: any) => (
                <li
                  class="flex snap-center basis-[46%] shrink-0 relative p-2"
                  key={video.id.videoId}
                  onClick$={() =>
                    window.open(
                      "https://www.youtube.com/shorts/" + video.id.videoId
                    )
                  }
                >
                  <div class="relative">
                    <img
                      class="h-[380px] rounded-xl object-center object-cover"
                      src={
                        (video.snippet.thumbnails.maxres &&
                          video.snippet.thumbnails.maxres.url) ||
                        video.snippet.thumbnails.high.url
                      }
                      alt=""
                    />
                    <div class="bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0)] absolute top-0 left-0 h-full w-full z-2 rounded-xl">
                      <div class="flex justify-center items-center h-full">
                        <YoutubeIcon
                          fill={"rgba(0,0,0,0.8)"}
                          width={82}
                          height={82}
                        />
                      </div>

                      <span class="absolute bottom-4 p-2 font-medium text-xs">
                        {video.snippet.title}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )) ||
        ``}

      {state.github.repos.length && (
        <div class="my-6">
          <div class="">
            <div class="flex p-4 gap-2">
              <GithubIcon width={40} height={28} />
              <span class="font-medium text-lg">Github Repos</span>
            </div>
            <ul class="flex flex-col overflow-x-auto overflow-y-hidden">
              {state.github.repos.slice(0, 4).map((repo: any) => (
                <li class="p-4 flex justify-between gap-2" key={repo.id} onClick$={() => getMarkdown(repo.url)}>
                  <div class="flex flex-col gap-1">
                    <span class="font-medium text-base">
                      {repo.name}
                    </span>
                    <div class="flex gap-2 items-center">
                      {repo.language && <span class="text-zinc-500 flex gap-2 items-center">
                        <i class={`${state.iconsMatch[repo.language.toLowerCase()]} text-xl text-white`}></i>

                        {repo.language}

                      </span>}

                      <span class="text-zinc-500">
                        {obtenerTiempoTranscurrido(repo.updated_at)}
                      </span>
                    </div>
                  </div>

                  <div class="flex gap-2">
                    <button onClick$={() => getMarkdown(repo.url)}>
                      <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M878-79 750-207v125h-60v-228h228v60H792l128 128-42 43ZM520-600h220L520-820v220ZM220-80q-24 0-42-18t-18-42v-680q0-24 18-42t42-18h340l240 240v270H630v290H220Z" /></svg>
                    </button>
                    <button>
                      <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M180-81q-24 0-42-18t-18-42v-603h60v603h474v60H180Zm120-120q-24 0-42-18t-18-42v-560q0-24 18-42t42-18h440q24 0 42 18t18 42v560q0 24-18 42t-42 18H300Z" /></svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) || ``}
    </div>
  );
});

export const head: DocumentHead = {
  title: "Arturo Zarzalejo",
  links: [
    {
      rel: 'stylesheet',
      href: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css',
    },
  ],
};
