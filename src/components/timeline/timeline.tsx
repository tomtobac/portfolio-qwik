import { component$, useStylesScoped$, $ } from "@builder.io/qwik";
import { GithubIcon } from "~/icons/github-icon";
import styles from "./timeline.css";

export default component$((props: any) => {
  useStylesScoped$(styles);
  const timeline = [
    {
      icon: <GithubIcon width={60} height={40} />,
      title: "Despierta!",
      description: "Toca trabajar que hay que pagar la cena",
      time: "8:30am",
      direction: "",
    },
    {
      icon: <GithubIcon width={60} height={40} />,
      title: "Code",
      description: "Aprendemos algo nuevo?!",
      time: "12:30",
      direction: "flex-row-reverse",
    },
    {
      icon: <GithubIcon width={60} height={40} />,
      title: "Gym & Comida",
      description: "Mantenerse Fit!",
      time: "14:00",
      direction: "",
    },
    {
      icon: <GithubIcon width={60} height={40} />,
      title: "Streaming",
      description: "Creamos contenido?",
      time: "19:00pm",
      direction: "flex-row-reverse",
    },
    {
      icon: <GithubIcon width={60} height={40} />,
      title: "Dormir & Repetir",
      description: "Por que esta es la vida que quiero",
      time: "00:00",
      direction: "",
    },
  ];
  const cositas = $(() => {});

  return (
    <div class="my-6">
      <div class="">
        <div class="flex p-4 gap-2">
          <GithubIcon width={40} height={28} />
          <span class="font-medium text-lg">Un dia en mi vida</span>
        </div>
        <div class="timeline-border z-10 hidden"></div>
        <div class="timeline flex flex-wrap items-center relative">
          {timeline.map((item, key) => (
            <div
              key={key}
              class={`${item.direction} flex flex-1 basis-full px-10`}
            >
              <div
                class={`${
                  !item.direction && `text-right`
                } grow basis-[45%] flex flex-col justify-center py-4`}
              >
                <span class="font-semibold text-lg">{item.title}</span>
                <span class="text-base">{item.description}</span>
              </div>
              <span
                class={`basis-[10%] items-center justify-center flex flex-col`}
              >
                <span class="test-line"></span>
                <span class="py-2">{item.icon}</span>

                <span class="test-line"></span>
              </span>
              <div
                class={`${
                  item.direction && `text-right`
                } basis-[45%] font-light flex flex-col justify-center`}
              >
                <span class="text-sm">{item.time}</span>
              </div>
            </div>
          ))}
          {/* <div class="flex flex-1">
            <div class="grow basis-[45%] font-medium text-lg flex flex-col text-right justify-center">
              <span class="text-base">Eat</span>
              <span class="text-sm">Because you need strength</span>
            </div>
            <span class="basis-[10%] items-center justify-center flex">
              <GithubIcon width={60} height={36} />
            </span>
            <div class="basis-[45%] font-medium text-lg flex flex-col justify-center">
              <span class="text-base">9:30</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
});
