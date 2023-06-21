import { component$, useStore, useStylesScoped$, $ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

import mdStyles from "../utils/md-css.css?inline";
import YoutubeVideos from "~/components/youtube-videos/youtube-videos";
import TwitchVideos from "~/components/twitch-videos/twitch-videos";
import TwitchStream from "~/components/twitch-stream/twitch-stream";

import GithubRepos from "~/components/github-repos/github-repos";
import Timeline from "~/components/timeline/timeline";
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

      <div class="my-12 px-3 flex">
        <div class="flex flex-col sm:flex-row gap-3 w-full">
          <Weekcontent
            icon={<TwitchIcon width={40} height={28} />}
            sectionName={`Total Views`}
            platform={"Twitch"}
            stadisticsNumber={twitch.totalViewCount}
          />
        </div>
        Header
      </div>
      <Timeline />

      {twitch.streams.data.length && (
        <TwitchStream
          stream={twitch.streams.data[0]}
          userinfo={twitch.userInfo.data[0]}
        />
      )}

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
