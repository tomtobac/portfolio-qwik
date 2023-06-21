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

import mdStyles from "../utils/md-css.css?inline";
import { LogoIcon } from "~/icons/logo-icon";
import YoutubeVideos from "~/components/youtube-videos/youtube-videos";
import TwitchVideos from "~/components/twitch-videos/twitch-videos";
import TwitchStream from "~/components/twitch-stream/twitch-stream";
import { TwitchIcon } from "~/icons/twitch-icon";

import GithubRepos from "~/components/github-repos/github-repos";
import Timeline from "~/components/timeline/timeline";
import Weekcontent from "~/components/week-content/week-content";
import { cn } from "~/utils/cn";

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

  state.twitch.videos = await apiTwitch.getVideos(
    state.twitch.userInfo.data[0].id,
    state.twitch.token.access_token,
    true
  );
});

async function obtenerShortsYVideosDeCanal(
  apiKey: string,
  channelId: string,
  dev: Boolean
) {
  try {
    const url = dev
      ? `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&maxResults=10&channelType=any&type=video&order=date&part=snippet&key=${apiKey}`
      : `/mocks/api-youtube-mock.json`;
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

const totalTwitchViews = arrayVideos => arrayVideos.reduce((acumulator, video) => {
  return acumulator + video.view_count;
}, 0);


export default component$(() => {
  useStylesScoped$(mdStyles);
  // useStylesScoped$(styles);

  const state = useStore<any>({
    apiGithubUrl: "https://api.github.com/users/arturozarzalejo",
    apiGithubMock: "/mocks/api-github-mock.json",
    apiGithubRepos: "https://api.github.com/users/arturozarzalejo/repos",
    apiGithubReposMock: "/mocks/api-github-repos.json",
    apiYoutubeMock: "/mocks/api-youtube-mock.json",
    github: {
      info: {},
      repos: [],
      copyShow: false,
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
      javascript: "devicon-javascript-plain colored",
      html: "devicon-html5-plain colored",
      typescript: "devicon-typescript-plain colored",
      css: "devicon-css3-plain colored",
    },
    loading: false,
  });

  const copyUrlFN = $((cloneUrlRepo: string) => {
    navigator.clipboard.writeText(cloneUrlRepo);
    state.github.copyShow = !state.github.copyShow;
    setTimeout(() => {
      state.github.copyShow = !state.github.copyShow;
    }, 2000);
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

  useTask$(async () => {
    // state.github.info = await fetch(state.apiGithubMock)
    //   .then((response) => response.json())
    //   .then((data) => data)
    //   .catch((error) => {
    //     // Manejo de errores
    //     console.log("Error:", error);
    //   });
  });

  useVisibleTask$(async () => {
    console.time("cargandoHTML");
    state.loading = true;
    state.github.info = await fetch(state.apiGithubMock)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        // Manejo de errores
        console.log("Error:", error);
      });
    const apiKey = "AIzaSyC3O-zPANM6pcSOIY49QzaU66VJuCslKw4";
    const channelId = "UC9h5heKFR7KaoLSzjWIIxjw"; // ID del canal "arturodevelop"
    const youtubeVideos = await obtenerShortsYVideosDeCanal(
      apiKey,
      channelId,
      false
    );

    if (youtubeVideos) {
      state.youtube.videos = [...youtubeVideos];

      // state.youtube.videos.map(async (video: any) => {
      //   const videoMaxRes = await obtenerThumbnailsYT(video.id.videoId, apiKey);
      //   return (video.snippet.thumbnails =
      //     videoMaxRes.items[0].snippet.thumbnails);
      // });
    }

    const repos = await getRepos(false);

    state.github.repos = repos.sort((a: any, b: any) =>
      b.pushed_at.localeCompare(a.pushed_at)
    );

    const apiTwitch = new Twitch();
    state.twitch.token = await apiTwitch.getToken();
    await twitchDataInfo("ArturoDevelop", state, apiTwitch);

    state.twitch.totalViewCount = totalTwitchViews(state.twitch.videos.data)

    // console.log(state.twitch.totalTwitchViews);

    console.log("cositas?", state);

    state.loading = true;

    console.timeEnd("cargandoHTML");
  });

  return (
    state.loading && (
      <div class="text-white">
        <img
          class={cn("img-rounded hidden", {
            "animate-live-image":
              state.twitch.streams.data.length &&
              state.twitch.streams.data[0].type === "live",
          })}
          src={state.github.info.avatar_url}
          alt=""
        />
        <header class="p-6">
          <h1 class="text-5xl font-semibold leading-tight tracking-wide max-w-[230px]">
            {state.github.info.name}
          </h1>
          <figure
            class="
        flex justify-center absolute 
        top-0 right-4 w-32 h-80 z-10 
        after:bg-gradient-to-b after:from-purple-600 after:to-transparent after:w-5/6 after:absolute after:top-0 after:h-full"
          >
            <LogoIcon
              classList={["relative", "top-8", "z-[4]"]}
              width={74}
              height={74}
            />
            <img
              class="absolute bottom-[-70px] scale-110"
              src="/imgs/pordiu.png"
              alt="Arturobobo"
            />
          </figure>
          <p class="text-2xl font-medium flex flex-col mt-32">
            <span class="flex gap-2">
              Front End{" "}
              <b
                style={"--characters:9ch"}
                class="text-purple-600 animate-typing overflow-hidden whitespace-nowrap"
              >
                Developer
              </b>
            </span>
            <span class="flex gap-2">
              Content{" "}
              <b
                style={"--characters:7ch"}
                class="text-yellow-300 w-0 animate-typing animation-delay-500 overflow-hidden whitespace-nowrap"
              >
                Creator
              </b>
            </span>
            <span class="flex gap-2">
              Tech{" "}
              <b
                style={"--characters:5ch"}
                class="text-red-600 w-0 animate-typing animation-delay-1000 overflow-hidden whitespace-nowrap"
              >
                Lover
              </b>
            </span>
          </p>
        </header>
        <Weekcontent icon={<TwitchIcon/>} totalViewCount={state.twitch.totalViewCount} />
        <Timeline />

        {(state.twitch.streams.data && state.twitch.streams.data.length && (
          <TwitchStream
            stream={state.twitch.streams.data[0]}
            userinfo={state.twitch.userInfo.data[0]}
          />
        )) ||
          ``}

        {(state.twitch.videos.data.length && (
          <TwitchVideos videos={state.twitch.videos.data} />
        )) ||
          ``}

        {(state.youtube.videos.length && (
          <YoutubeVideos videos={state.youtube.videos} />
        )) ||
          ``}

        {(state.github.repos.length && (
          <GithubRepos
            repos={state.github.repos}
            iconsMatch={state.iconsMatch}
            copyUrlFN={copyUrlFN}
          />
        )) ||
          ``}

        <div
          class={cn(
            "snackbar fixed left-1/2 translate-x-[-50%] shadow flex bg-gray-800 rounded-xl bottom-2 justify-between p-4 w-[90%]",
            {
              hidden: !state.github.copyShow,
            }
          )}
        >
          <span class="font-medium text-base">Copiado al portapapeles</span>
          <button>X</button>
        </div>
      </div>
    )
  );
});

export const head: DocumentHead = {
  title: "Arturo Zarzalejo",
  links: [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css",
    },
  ],
};
