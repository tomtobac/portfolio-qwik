import { component$, useVisibleTask$, useTask$, useStore, useStylesScoped$, unwrapProxy } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import styles from './portfolio.css?inline';

const apiUrlServer = 'http://localhost:5173/server/api-github-mock.json';

export default component$(() => {

  useStylesScoped$(styles);

  // const data = { data: {} }

  const state = useStore({
    apiUrl: 'https://api.github.com/users/arturozarzalejo',
    apiUrlLocal: '/api-github-mock.json',
    apiUrlServer: 'http://localhost:5173/server/api-github-mock.json',
    dataServerJson: {}
  });

  useTask$(async () => {
    state.dataServerJson = await fetch(apiUrlServer)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        // Manejo de errores
        console.log('Error:', error);
      });
  });

  useVisibleTask$(async ({ cleanup }) => {

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

