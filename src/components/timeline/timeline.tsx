import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import { GithubIcon } from "~/icons/github-icon";
import styles from "./timeline.css";

export default component$((props: any) => {
  useStylesScoped$(styles);
  const timeline = [
    {
      icon: (
        <svg
          class="rounded-full bg-white fill-black p-2"
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path d="M320.175-410q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5Zm160 0q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5Zm160 0q12.825 0 21.325-8.675 8.5-8.676 8.5-21.5 0-12.825-8.675-21.325-8.676-8.5-21.5-8.5-12.825 0-21.325 8.675-8.5 8.676-8.5 21.5 0 12.825 8.675 21.325 8.676 8.5 21.5 8.5ZM479-82q-74 0-139.5-28t-114-76.5q-48.5-48.5-77-114T120-440.733q0-74.733 28.5-140T225.5-695q48.5-49 114-77T479-800q74 0 139.5 28T733-695q49 49 77 114.267t28 140Q838-366 810-300.5t-77 114Q684-138 618.5-110T479-82Zm0-357ZM214-867l42 42L92-667l-42-42 164-158Zm530 0 164 158-42 42-164-158 42-42ZM479.043-142Q604-142 691-229.043t87-212Q778-566 690.957-653t-212-87Q354-740 267-652.957t-87 212Q180-316 267.043-229t212 87Z" />
        </svg>
      ),
      title: "Despierta!",
      description: "",
      time: "8:30am",
      direction: "",
    },
    {
      icon: (
        <svg
          class="rounded-full bg-white fill-black p-2"
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path d="M320-242 80-482l242-242 43 43-199 199 197 197-43 43Zm318 2-43-43 199-199-197-197 43-43 240 240-242 242Z" />
        </svg>
      ),
      title: "Code",
      description: "Aprendemos algo nuevo?!",
      time: "12:30",
      direction: "flex-row-reverse",
    },
    {
      icon: (
        <svg
          class="rounded-full bg-white fill-black p-2"
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path d="m550-84-42-42 142-142-382-382-142 142-42-42 56-58-56-56 85-85-42-42 42-42 43 41 84-84 56 56 58-56 42 42-142 142 382 382 142-142 42 42-56 58 56 56-86 86 42 42-42 42-42-42-84 84-56-56-58 56Z" />
        </svg>
      ),
      title: "Gym",
      description: "Mantenerse Fit!",
      time: "14:00",
      direction: "",
    },
    {
      icon: (
        <svg
          class="rounded-full bg-white fill-black p-2"
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path d="M481-480Zm340 320H601q0-15-1-30t-3-30h224v-520H141v60q-15-2-30-3t-30-1v-56q0-24.75 17.625-42.375T141-800h680q24.75 0 42.375 17.625T881-740v520q0 24.75-17.625 42.375T821-160Zm-740 0v-104q41.667 0 70.833 30.333Q181-203.333 181-160H81Zm200 0q0-84.66-58-144.33Q165-364 81-364v-60q108.643 0 184.321 77.5Q341-269 341-160h-60Zm160 0q0-75-28-141.5t-77-116q-49-49.5-114.5-78T81-524v-60q87 0 163.5 33.5t133.5 91q57 57.5 90 135T501-160h-60Z" />
        </svg>
      ),
      title: "Streaming",
      description: "Creamos contenido?",
      time: "19:00pm",
      direction: "flex-row-reverse",
    },
    {
      icon: (
        <svg
          class="rounded-full bg-white fill-black p-2"
          xmlns="http://www.w3.org/2000/svg"
          height="36"
          viewBox="0 -960 960 960"
          width="36"
        >
          <path d="M280-80 120-240l160-160 42 44-86 86h464v-160h60v220H236l86 86-42 44Zm-80-450v-220h524l-86-86 42-44 160 160-160 160-42-44 86-86H260v160h-60Z" />
        </svg>
      ),
      title: "Repetir",
      description: "",
      time: "00:00",
      direction: "",
    },
  ];
  const cositas = $(() => {});

  return (
    <div class="my-6 isolate relative">
      <div class="absolute w-full h-52 -z-1 right-10 top-0 [background-image:radial-gradient(48.64%_49.21%_at_49.24%_50.03%,_theme(colors.purple.700_/_25%)_0%,_theme(colors.purple.500_/_0%)_100%)] -rotate-45" />
      <div class="absolute w-full h-52 -z-1 left-10 bottom-0  dark:[background-image:radial-gradient(48.64%_49.21%_at_49.24%_50.03%,_theme(colors.blue.700_/_25%)_0%,_theme(colors.blue.500_/_0%)_100%)] rotate-45" />
      <div class="">
        <div class="flex p-4 gap-2">
          <GithubIcon width={40} height={28} />
          <span class="font-medium text-lg">Un día con Arturo</span>
        </div>
        <div class="timeline-border z-10 hidden"></div>
        <div class="timeline flex flex-wrap items-center relative">
          {timeline.map((item, key) => (
            <div
              key={key}
              class={`${item.direction} flex flex-1 basis-full px-10 ${
                ((key == 0 || key + 1 === timeline.length) && `h-28`) || ``
              }`}
            >
              <div
                class={`${
                  !item.direction && `text-right`
                } grow basis-[40%] flex flex-col justify-center py-4`}
              >
                <span class="font-semibold text-xl">{item.title}</span>
                <span class="text-base font-normal">{item.description}</span>
              </div>
              <span
                class={`basis-[20%] items-center justify-center flex flex-col`}
              >
                <span
                  class={`${(!(key == 0) && ` test-line`) || `grow`}`}
                ></span>

                <span class="py-2">{item.icon}</span>

                <span
                  class={`${
                    (!(key + 1 === timeline.length) && ` test-line`) || `grow`
                  }`}
                ></span>
              </span>
              <div
                class={`${
                  item.direction && `text-right`
                } basis-[40%] font-light flex flex-col justify-center`}
              >
                <span class="text-sm">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
