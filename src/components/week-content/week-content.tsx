import { component$ } from "@builder.io/qwik";
import { TwitchIcon } from "~/icons/twitch-icon";

export default component$(() => {
  return (
    <div class="my-6">
      <div class="">
        <div class="flex p-4 gap-2">
          <TwitchIcon width={40} height={28} />
          <span class="font-medium text-lg">Twitch</span>

        </div>
        <div class="flex flex-col sm:flex-row basis-full">
          <div class="flex p-2 w-full">
            <div class="flex flex-col">
              <span>Stadistics</span>
              <span>Total View Count</span>
              <span>3000</span>
            </div>
            <div class="">
              <img src="" alt="" />
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M176 64h64v384h-64z" fill="currentColor" /><path d="M80 336h64v112H80z" fill="currentColor" /><path d="M272 272h64v176h-64z" fill="currentColor" /><path d="M368 176h64v272h-64z" fill="currentColor" /></svg>
            </div>
          </div>
          <div class="flex p-2 w-full">
            <div class="flex flex-col">
              <span>Stadistics</span>
              <span>Total View Count</span>
              <span>3000</span>
            </div>
            <div class="">
              <img src="" alt="" />
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M176 64h64v384h-64z" fill="currentColor" /><path d="M80 336h64v112H80z" fill="currentColor" /><path d="M272 272h64v176h-64z" fill="currentColor" /><path d="M368 176h64v272h-64z" fill="currentColor" /></svg>
            </div>
          </div>
          <div class="flex p-2 w-full">
            <div class="flex flex-col">
              <span>Stadistics</span>
              <span>Total View Count</span>
              <span>3000</span>
            </div>
            <div class="">
              <img src="" alt="" />
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M176 64h64v384h-64z" fill="currentColor" /><path d="M80 336h64v112H80z" fill="currentColor" /><path d="M272 272h64v176h-64z" fill="currentColor" /><path d="M368 176h64v272h-64z" fill="currentColor" /></svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
});
