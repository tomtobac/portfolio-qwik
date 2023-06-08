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

import styles from "./styles.css";
import mdStyles from "../utils/md-css.css";
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

async function obtenerShortsYVideosDeCanal(
  apiKey: string,
  channelId: string,
  state: any
) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&maxResults=10&channelType=any&type=video&order=date&part=snippet&key=${apiKey}`;
    // https://content-youtube.googleapis.com/youtube/v3/search?channelId=UC9h5heKFR7KaoLSzjWIIxjw&channelType=any&part=snippet&maxResults=10&key=AIzaSyAa8yy0GdcGPHdtD083HiGGx_S0vMPScDM

    const response = await fetch(state.apiYoutubeMock);

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

export default component$(() => {
  useStylesScoped$(mdStyles);
  // useStylesScoped$(styles);

  const state = useStore<any>({
    apiGithubUrl: "https://api.github.com/users/arturozarzalejo",
    apiGithubMock: "http://localhost:5173/server/api-github-mock.json",
    apiGithubReposMock: "http://localhost:5173/server/api-github-repos.json",
    apiYoutubeMock: "http://localhost:5173/server/api-youtube-mock.json",
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
  });

  const getMarkdown = $(async (repoURL: string) => {
    const markdown = new MarkdownIt();
    const readme = await fetch(`${repoURL}/readme`)
      .then((data) => data.json())
      .then((data) => data);

    state.github.readme = markdown.render(atob(readme.content));

    console.log("lo que queremos", readme);
  });

  const getRepos = $(async () => {
    return fetch(
      state.apiGithubReposMock
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        // Manejo de errores
        console.log("Error:", error);
      });

  });

  useTask$(async () => {
    state.dataServerJson = await fetch(state.apiGithubMock)
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        // Manejo de errores
        console.log("Error:", error);
      });

  });

  useVisibleTask$(async ({ cleanup }) => {
    const apiKey = "AIzaSyDjyp6v1Zb1SV8JdeoV-rLT_rR1MONAL9U";
    const channelId = "UC9h5heKFR7KaoLSzjWIIxjw"; // ID del canal "arturodevelop"

    state.youtube.videos = await obtenerShortsYVideosDeCanal(
      apiKey,
      channelId,
      state
    );

    const repos = await getRepos()

    state.github.repos = repos.sort((a:any, b:any) =>
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
        <figure class="
        flex justify-center absolute 
        top-0 right-4 w-32 h-80 z-10 
        after:bg-gradient-to-b after:from-[#9046FF] after:to-[rgba(0,0,0,0)] after:w-5/6 after:absolute after:top-0 after:h-full">
          <LogoIcon className={['relative', 'top-8', 'z-[4]']} width={74} height={74} />
          <img class="absolute bottom-[-50px] scale-110" src="/imgs/pordiu.png" alt="Arturobobo" />
        </figure>

        <p class="text-2xl font-medium flex flex-col mt-24">
          <span class="">Front End <b class="text-[#9046FF]">Developer</b></span>
          <span class="">Content <b class="text-[#ECFF15]">Creator</b></span>
          <span class="">Tech <b class="text-[#DF3939]">Lover</b></span>
        </p>
      </header>

      {/* <div class="card card-background-color card-box-shadow card-border-radius">
        <div class="md-css" dangerouslySetInnerHTML={state.github.readme}></div>
      </div> */}

      <div class="my-12 mb-6">

        <div class="">
          <div class="flex p-4 gap-4">
            <TwitchIcon width={28} height={28} />
            <span class="font-medium text-lg">Twitch</span>
          </div>
          {(state.twitch.streams.data && state.twitch.streams.data.length && (
            <img
              class="thumbnail-twitch card-border-radius"
              src={state.twitch.streams.data[0].thumbnail_url.replace(
                "{width}x{height}",
                "1920x1080"
              )}
              alt=""
            />
          )) ||
            ``}
          {(state.twitch.userInfo.data && state.twitch.userInfo.data.length && (
            <div class="flex p-4 gap-4 justify-center">
              <img class="w-12 h-12 rounded-lg" src={state.twitch.userInfo.data[0].profile_image_url} alt={state.twitch.userInfo.data[0].display_name} />
              <span class=" flex items-center font-medium text-sm leading-tight">{state.twitch.streams.data[0].title}</span>
            </div>
          )) || ``}
        </div>
      </div>

      <div class="my-6">

        <div class="">
          <div class="flex p-4 gap-2">
            <YoutubeIcon width={40} height={28} />
            <span class="font-medium text-lg">YouTube Videos</span>
          </div>
          <ul class="flex snap-proximity overflow-x-auto overflow-y-hidden">
            {state.youtube.videos.length &&
              state.youtube.videos.map((video: any) => (
                <li class="flex snap-center basis-[42%] shrink-0 relative p-2" key={video.id.videoId}>
                  <div class="relative">
                    <img class="h-[360px] rounded-xl object-center object-cover" src={video.snippet.thumbnails.high.url} alt="" />
                    <div class="bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0)] absolute top-0 left-0 h-full w-full z-2 rounded-xl">
                      <span class="absolute bottom-4 p-2 font-medium text-xs">{video.snippet.title}</span>
                    </div>
                  </div>

                </li>
              )) || ``}
          </ul>
        </div>
      </div>

      <div class="my-6">

        <div class="">
          <div class="flex p-4 gap-2">
            <GithubIcon width={40} height={28} />
            <span class="font-medium text-lg">Github Repos</span>
          </div>
          <ul class="flex flex-col overflow-x-auto overflow-y-hidden">
            {state.github.repos &&
              state.github.repos.slice(0, 4).map((repo: any) => (
                <li key={repo.id} onClick$={() => getMarkdown(repo.url)}>
                  {repo.name}
                </li>
              )) || ``}
          </ul>
        </div>
      </div>

      {/* <div class="icons-socials hidden" >
        
        <GithubIcon />
        <YoutubeIcon />
      </div> */}
      <ul class="repos-list-container hidden">
        {state.youtube.videos.length &&
          state.youtube.videos.map((video:any) => (
            <li key={video.id.videoId}>
              <img class="" src={video.snippet.thumbnails.high.url} alt="" />
              <span>{video.snippet.title}</span>
            </li>
          ))}
      </ul>
      <ul class="repos-list-container hidden">

      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Flower",
};
