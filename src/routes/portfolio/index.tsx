import {
  component$,
  useVisibleTask$,
  useTask$,
  useStore,
  useStylesScoped$,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import styles from "./portfolio.css?inline";

async function obtenerShortsYVideosDeCanal(apiKey, channelId) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?channelId=${channelId}&maxResults=10&channelType=any&part=snippet&key=${apiKey}`
    // https://content-youtube.googleapis.com/youtube/v3/search?channelId=UC9h5heKFR7KaoLSzjWIIxjw&channelType=any&part=snippet&maxResults=10&key=AIzaSyAa8yy0GdcGPHdtD083HiGGx_S0vMPScDM

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al obtener los shorts y videos");
    }

    const data = await response.json();

    const shorts = data.items;
    console.log("Shorts:", shorts);

    // Obtén los videos del canal (realiza otra solicitud si es necesario)
    // ...
  } catch (error) {
    console.error("Error al obtener los shorts y videos:", error);
  }
}

export default component$(() => {
  useStylesScoped$(styles);

  const state = useStore({
    apiUrl: "https://api.github.com/users/arturozarzalejo",
    apiUrlLocal: "/api-github-mock.json",
    apiUrlServer: "http://localhost:5173/server/api-github-mock.json",
    dataServerJson: {},
  });

  useTask$(async () => {
    state.dataServerJson = await fetch(state.apiUrlServer)
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

    const youtubeVideos = obtenerShortsYVideosDeCanal(apiKey, channelId);

    console.log("videosyoutube", youtubeVideos);

    const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // Maneja la respuesta del API
        console.log(data);
      })
      .catch((error) => {
        // Maneja cualquier error de la llamada al API
        console.error(error);
      });

    console.log("cositas?2", state.dataServerJson);
  });

  return (
    <div class="container container-center">
      <div role="presentation" class="ellipsis"></div>
      <h1>
        <span class="highlight">Portfolio {state.dataServerJson.name}</span>
        <img class="img-rounded" src={state.dataServerJson.avatar_url} alt="" />
      </h1>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Qwik Flower",
};
