import { component$ } from "@builder.io/qwik";
import { YoutubeIcon } from "~/icons/youtube-icon";

export default component$((props: any) => {
  return (
    <div class="my-6">
      <div class="">
        <div class="flex p-4 gap-2">
          <YoutubeIcon width={40} height={28} fill="#FF0000" />
          <span class="font-medium text-lg">YouTube Videos</span>
        </div>
        <ul class="flex snap-proximity overflow-x-auto overflow-y-hidden">
          {props.videos.map((video: any) => (
            <li
              class="flex snap-center basis-[46%] shrink-0 relative p-2"
              key={video.id.videoId}
              onClick$={() =>
                window.open(
                  "https://www.youtube.com/shorts/" + video.id.videoId
                )
              }
            >
              <div class="relative">
                <img
                  class="h-[380px] rounded-xl object-center object-cover"
                  src={
                    (video.snippet.thumbnails.maxres &&
                      video.snippet.thumbnails.maxres.url) ||
                    video.snippet.thumbnails.high.url
                  }
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
                    {video.snippet.title}
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
