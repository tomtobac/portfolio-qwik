import { component$, useStore, useStylesScoped$, $, useVisibleTask$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

import mdStyles from "../utils/md-css.css?inline";
import YoutubeVideos from "~/components/youtube-videos/youtube-videos";
import TwitchVideos from "~/components/twitch-videos/twitch-videos";
import TwitchStream from "~/components/twitch-stream/twitch-stream";

import GithubRepos from "~/components/github-repos/github-repos";
// import Timeline from "~/components/timeline/timeline";
import Weekcontent from "~/components/week-content/week-content";
import { cn } from "~/utils/cn";
import {
  getYoutubeVideos,
  getGithubRepos,
  getGithubUser,
  getTwitchData,
} from "~/services/api";
import { TwitchIcon } from "~/icons/twitch-icon";
import { Header } from "~/components/header/header";
import { YoutubeIcon } from "~/icons/youtube-icon";

export const useDataLoader = routeLoader$(async () => {
  const [videos, repos, user, twitch] = await Promise.all([
    getYoutubeVideos(),
    getGithubRepos(),
    getGithubUser(),
    getTwitchData(),
  ]);
  return { youtube: { videos }, github: { repos, user }, twitch };
});

export default component$(() => {
  useStylesScoped$(mdStyles);

  const {
    value: { github, twitch, youtube },
  } = useDataLoader();

  const state = useStore<any>({
    copyShow: false,
    iconsMatch: {
      javascript: "devicon-javascript-plain colored",
      html: "devicon-html5-plain colored",
      typescript: "devicon-typescript-plain colored",
      css: "devicon-css3-plain colored",
    },
  });

  const copyUrlFN = $((cloneUrlRepo: string) => {
    navigator.clipboard.writeText(cloneUrlRepo);
    state.copyShow = !state.copyShow;
    setTimeout(() => {
      state.copyShow = !state.copyShow;
    }, 2000);
  });

  useVisibleTask$(() => {
    console.log(twitch, youtube)
  })

  return (
    <div class="text-white">
      <img
        class={cn("img-rounded hidden", {
          "animate-live-image":
            twitch.streams.data.length &&
            twitch.streams.data[0].type === "live",
        })}
        src={github.user.avatar_url}
        alt=""
      />
      <Header name={github.user.name} />

      <div class="my-12 px-3 flex flex-row items-center justify-center">
        <button class="p-4 gap-2 font-extrabold items-center flex flex-row rounded-xl border bg-white text-lg text-center justify-center text-black">Un repaso? <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><path fill="currentColor" d="M6 12.05q0 .425.063.825t.187.8q.125.425.025.863t-.425.762q-.275.275-.662.25t-.538-.375q-.325-.75-.488-1.538T4 12.05q0-3.35 2.325-5.7T12 4h.175l-.9-.9Q11 2.825 11 2.4t.275-.7q.275-.275.7-.275t.7.275l2.6 2.6q.3.3.3.7t-.3.7l-2.6 2.6q-.275.275-.7.275t-.7-.275Q11 8.025 11 7.6t.275-.7l.9-.9H12Q9.5 6 7.75 7.763T6 12.05Zm12-.1q0-.425-.063-.825t-.187-.8q-.125-.425-.025-.862t.425-.763q.275-.275.663-.25t.537.375q.325.75.488 1.538T20 11.95q0 3.35-2.325 5.7T12 20h-.175l.9.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275l-2.6-2.6q-.3-.3-.3-.7t.3-.7l2.6-2.6q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-.9.9H12q2.5 0 4.25-1.762T18 11.95Z"></path></svg></button>
      </div>


      <div class="my-12 px-3 flex flex-col gap-2 sm:flex-row">
        <div class="flex flex-col w-full p-2 basis-full">
          <Weekcontent
            icon={<TwitchIcon width={40} height={28} />}
            sectionName={`Total Views`}
            platform={"Twitch"}
            stadisticsNumber={twitch.totalViewCount}
          />
        </div>
        <div class="flex flex-col w-full p-2 basis-full">
          <Weekcontent
            icon={<YoutubeIcon width={40} height={28} fill="red" />}
            sectionName={`Total Views`}
            platform={"Youtube"}
            stadisticsNumber={twitch.totalViewCount}
          />
        </div>
        {/* Header */}
      </div>
      {/* <Timeline /> */}

      {twitch.streams.data.length && (
        <TwitchStream
          stream={twitch.streams.data[0]}
          userinfo={twitch.userInfo.data[0]}
        />
      ) || ``}

      <TwitchVideos videos={twitch.videos.data} />

      <YoutubeVideos videos={youtube.videos} />

      <GithubRepos
        repos={github.repos}
        iconsMatch={state.iconsMatch}
        copyUrlFN={copyUrlFN}
      />

      {/* @todo: esto deberia ser un snackbar global */}
      <div
        class={cn(
          "snackbar fixed left-1/2 translate-x-[-50%] shadow flex bg-gray-800 rounded-xl bottom-2 justify-between p-4 w-[90%]",
          {
            hidden: !state.copyShow,
          }
        )}
      >
        <span class="font-medium text-base">Copiado al portapapeles</span>
        <button>X</button>
      </div>
    </div>
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
