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
  useStylesScoped$(styles);

  const state = useStore<any>({
    apiUrl: "https://api.github.com/users/arturozarzalejo",
    apiUrlLocal: "/api-github-mock.json",
    apiGithubMock: "http://localhost:5173/server/api-github-mock.json",
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
    const markdown = new MarkdownIt({
      encoding: "utf-8",
    });
    const readme = await fetch(`${repoURL}/readme`)
      .then((data) => data.json())
      .then((data) => data);

    state.github.readme = markdown.render(atob(readme.content));

    console.log("lo que queremos", readme);
  });

  const getRepos = $(async () => {
    const repos = await fetch(
      `https://api.github.com/users/ArturoZarzalejo/repos`
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        // Manejo de errores
        console.log("Error:", error);
      });

    state.github.repos = repos.sort((a, b) =>
      b.pushed_at.localeCompare(a.pushed_at)
    );

    console.log("click tontorrón", repos, state);
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

    const apiTwitch = new Twitch();
    state.twitch.token = await apiTwitch.getToken();
    await twitchDataInfo("ArturoDevelop", state, apiTwitch);

    console.log("cositas?", state);
  });

  return (
    <div class="text-white">
      <img
        class={`img-rounded ${
          state.twitch.streams.data &&
          state.twitch.streams.data[0].type === "live" &&
          `live-image`
        }`}
        src={state.dataServerJson.avatar_url}
        alt=""
      />

      {/* <div role="presentation" class="ellipsis"></div> */}
      <h1 class="text-3xl">
        {state.dataServerJson.name}
      </h1>
      <div class="card card-background-color card-box-shadow card-border-radius">
        <div class="md-css" dangerouslySetInnerHTML={state.github.readme}></div>
      </div>
      <p>
        Muy buenas!! Bienvenido a parte de mi vida, probablemente, ahora mismo
        esté haciendo stream, si no es así, me pillarás trabajando, comiendo
        como un gordito, o en el gimnasio para poder comer más. Aquí te dejo mis
        diferentes proyectos y información sobre mi, podrás ver mis videos de
        youtube o ver mis proyectos en Github{" "}
      </p>
      <div>
        <div class="card card-background-color card-box-shadow card-border-radius">
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
        </div>
      </div>

      <div class="icons-socials">
        <TwitchIcon />
        <button onClick$={() => getRepos()}>
          <GithubIcon />
        </button>
        <YoutubeIcon />
      </div>
      <ul class="repos-list-container">
        {state.youtube.videos.length &&
          state.youtube.videos.map((video) => (
            <li key={video.id.videoId}>
              <img class="" src={video.snippet.thumbnails.high.url} alt="" />
              <span>{video.snippet.title}</span>
            </li>
          ))}
      </ul>
      <ul class="repos-list-container">
        {state.github.repos &&
          state.github.repos.map((repo) => (
            <li key={repo.id} onClick$={() => getMarkdown(repo.url)}>
              {repo.name}
            </li>
          ))}
      </ul>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Flower",
};
