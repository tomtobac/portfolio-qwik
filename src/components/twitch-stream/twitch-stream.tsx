import { component$ } from "@builder.io/qwik";
import { TwitchIcon } from "~/icons/twitch-icon";

export default component$((props: any) => {
  return (
    <div class="my-12 mb-6">
      <div class="">
        <div class="flex p-4 gap-4">
          <TwitchIcon width={28} height={28} />
          <span class="font-medium text-lg">Twitch</span>
        </div>

        <img
          class="thumbnail-twitch"
          src={props.stream.thumbnail_url.replace(
            "{width}x{height}",
            "1920x1080"
          )}
          alt=""
        />
        <div class="flex p-4 gap-4 justify-center">
          <img
            class="w-12 h-12 rounded-lg"
            src={props.userinfo.profile_image_url}
            alt={props.userinfo.display_name}
          />
          <span class=" flex items-center font-medium text-sm leading-tight">
            {props.stream.title}
          </span>
        </div>
      </div>
    </div>
  );
});
