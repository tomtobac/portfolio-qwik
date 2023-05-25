import { component$, useVisibleTask$, useTask$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import styles from './portfolio.css?inline';
import { google } from 'googleapis';

console.log(google);



export default component$(() => {

  useStylesScoped$(styles);

  const state = useStore({
    apiUrl: 'https://api.github.com/users/arturozarzalejo',
    apiUrlLocal: '/api-github-mock.json',
    apiUrlServer: 'http://localhost:5173/server/api-github-mock.json',
    dataServerJson: {}
  });

  useTask$(async () => {
    state.dataServerJson = await fetch(state.apiUrlServer)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        // Manejo de errores
        console.log('Error:', error);
      });

  });

  useVisibleTask$(async ({ cleanup }) => {

    console.log('google', google)

    // const apiKey = 'AIzaSyDjyp6v1Zb1SV8JdeoV-rLT_rR1MONAL9U';
    // const youtube = google.youtube({
    //   version: 'v3',
    //   auth: apiKey
    // });

    // youtube.search.list({
    //   part: 'snippet',
    //   channelId: 'ID_DEL_CANAL',
    //   order: 'date',
    //   type: 'video',
    //   videoDuration: 'short',
    //   maxResults: 10
    // })
    //   .then((response) => {
    //     const shorts = response.data.items;
    //     // Procesa la respuesta de la API
    //   })
    //   .catch((error) => {
    //     console.error('Error al realizar la solicitud:', error);
    //   });

    console.log('cositas?2', state.dataServerJson)

  })

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
  title: 'Qwik Flower',
};

