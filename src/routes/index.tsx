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
import MarkdownIt from 'markdown-it';

import styles from "./styles.css?inline";
import mdStyles from "../utils/md-css.css?inline";

const twitchDataInfo = $(async function (name: string, state: any, apiTwitch: any) {
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

async function obtenerShortsYVideosDeCanal(apiKey: string, channelId: string, state: any) {
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
      streams: {}
    },
    youtube: {
      videos: [],
    },
  });

  const getMarkdown = $(async (repoURL: string) => {

    const markdown = new MarkdownIt({
      encoding: 'utf-8'
    });
    const readme = await fetch(`${repoURL}/readme`)
      .then(data => data.json())
      .then(data => data);

    state.github.readme = markdown.render(atob(readme.content));

    console.log('lo que queremos', readme)
  })

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

    state.youtube.videos = await obtenerShortsYVideosDeCanal(apiKey, channelId, state);

    const apiTwitch = new Twitch()
    state.twitch.token = await apiTwitch.getToken();
    await twitchDataInfo("ArturoDevelop", state, apiTwitch);

    console.log("cositas?", state);
  });

  return (
    <div class="container container-center">
      <img class={`img-rounded ${state.twitch.streams.data && state.twitch.streams.data[0].type === 'live' && `live-image`}`} src={state.dataServerJson.avatar_url} alt="" />

      {/* <div role="presentation" class="ellipsis"></div> */}
      <h1>
        <span class="highlight">{state.dataServerJson.name}</span>
      </h1>
      <div class="card card-background-color card-box-shadow card-border-radius">
        <div class="md-css" dangerouslySetInnerHTML={state.github.readme}></div>
      </div>
      <p>Muy buenas!! Bienvenido a parte de mi vida, probablemente, ahora mismo esté haciendo stream,
        si no es así, me pillarás trabajando, comiendo como un gordito, o en el gimnasio para poder comer más.
        Aquí te dejo mis diferentes proyectos y información sobre mi, podrás ver mis videos de youtube o ver mis proyectos en Github </p>
      <div>
        <div class="card card-background-color card-box-shadow card-border-radius">
          {state.twitch.streams.data && <img class="thumbnail-twitch card-border-radius" src={state.twitch.streams.data[0].thumbnail_url.replace('{width}x{height}', '1920x1080')} alt="" /> || ``}
        </div>

      </div>

      <div class="icons-socials">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="245"
          height="245"
          viewBox="0 0 245 245"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.8203 0L5.35938 42.052V213.916H63.8684V245H96.7788L127.863 213.916H175.401L239.392 149.925V0H21.8203ZM217.453 138.961L180.879 175.52H122.374L91.2893 206.604V175.52H41.9256V21.9352H217.445V138.961H217.453ZM180.879 63.9909V127.982H158.944V63.9909H180.879ZM122.37 63.9909V127.982H100.435V63.9909H122.37Z"
            fill="#6441A4"
          />
        </svg>
        <svg
          onClick$={() => getRepos()}
          xmlns="http://www.w3.org/2000/svg"
          width="317"
          height="317"
          viewBox="0 0 317 317"
          fill="none"
        >
          <path
            d="M158.5 31.7C88.4747 31.7 31.7 88.4747 31.7 158.5C31.7 217.916 72.6141 267.633 127.772 281.39C127.18 279.679 126.8 277.692 126.8 275.23V253.558C121.654 253.558 113.032 253.558 110.865 253.558C102.19 253.558 94.4765 249.828 90.7359 242.896C86.5832 235.193 85.8647 223.411 75.5728 216.205C72.519 213.806 74.8437 211.069 78.3624 211.439C84.8609 213.278 90.2499 217.737 95.3218 224.351C100.373 230.977 102.75 232.477 112.186 232.477C116.762 232.477 123.609 232.213 130.054 231.199C133.52 222.397 139.512 214.292 146.834 210.467C104.61 206.124 84.4593 185.117 84.4593 156.598C84.4593 144.32 89.6898 132.443 98.5764 122.436C95.66 112.503 91.9934 92.247 99.6965 84.5333C118.695 84.5333 130.181 96.8541 132.939 100.183C142.407 96.9386 152.805 95.1 163.73 95.1C174.678 95.1 185.117 96.9386 194.606 100.204C197.332 96.8963 208.829 84.5333 227.87 84.5333C235.605 92.2576 231.896 112.598 228.948 122.51C237.782 132.495 242.98 144.341 242.98 156.598C242.98 185.096 222.862 206.092 180.701 210.456C192.303 216.511 200.767 233.523 200.767 246.341V275.23C200.767 276.329 200.524 277.121 200.397 278.062C249.807 260.743 285.3 213.827 285.3 158.5C285.3 88.4747 228.525 31.7 158.5 31.7Z"
            fill="white"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="445"
          height="333"
          viewBox="0 0 445 333"
          fill="none"
        >
          <path
            d="M356.993 90.1656C353.764 76.5207 344.253 65.7747 332.173 62.1278C310.283 55.5 222.499 55.5 222.499 55.5C222.499 55.5 134.717 55.5 112.826 62.1278C100.746 65.7747 91.2325 76.5207 88.0063 90.1656C82.1411 114.898 82.1411 166.501 82.1411 166.501C82.1411 166.501 82.1411 218.101 88.0063 242.836C91.2325 256.482 100.746 267.225 112.825 270.876C134.716 277.501 222.498 277.501 222.498 277.501C222.498 277.501 310.282 277.501 332.172 270.876C344.251 267.227 353.763 256.482 356.991 242.837C362.858 218.102 362.858 166.502 362.858 166.502C362.858 166.502 362.858 114.899 356.991 90.167"
            fill="#FF0000"
          />
          <path
            d="M193.79 213.352L267.158 166.503L193.79 119.65V213.352Z"
            fill="white"
          />
        </svg>
      </div>
      <ul class="repos-list-container">
        {state.youtube.videos.length &&
          state.youtube.videos.map((video) => (
            <li key={video.id.videoId}>
              <img
                class=""
                src={video.snippet.thumbnails.high.url}
                alt=""
              />
              <span>{video.snippet.title}</span>
            </li>
          ))}
      </ul>
      <ul class="repos-list-container">
        {state.github.repos &&
          state.github.repos.map((repo) => (
            <li
              key={repo.id}
              onClick$={() => getMarkdown(repo.url)}
            >
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
