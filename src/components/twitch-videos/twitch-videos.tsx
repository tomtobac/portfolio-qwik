import { component$ } from "@builder.io/qwik";
import { TwitchIcon } from "~/icons/twitch-icon";
import { YoutubeIcon } from "~/icons/youtube-icon";

export default component$((props: any) => {

  const filterVideos = props.videos.filter((video: any) => {
    return video.thumbnail_url.indexOf('vod-secure.twitch') === -1
  })

  return (
    <div class="my-6">
      <div class="">
        <div class="flex p-4 gap-2">
          <TwitchIcon width={40} height={28} />
          <span class="font-medium text-lg">Twitch Streams</span>
        </div>
        <ul class="flex snap-proximity overflow-x-auto overflow-y-hidden">
          {filterVideos.map((video: any) => (
            <li
              class="flex snap-center basis-[46%] shrink-0 relative p-2"
              key={video.id}
              onClick$={() => window.open(video.url)}
            >
              <div class="relative">
                <img
                  class="h-[380px] rounded-xl object-center object-cover"
                  src={video.thumbnail_url.replace(
                    "%{width}x%{height}",
                    "1664x936"
                  )}
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
                    {video.title}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
