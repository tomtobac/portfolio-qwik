import { component$ } from "@builder.io/qwik";
import { LogoIcon } from "~/icons/logo-icon";

type Props = {
  name: string;
};

export const Header = component$<Props>(({ name }) => {
  return (
    <header class="p-6">
      <h1 class="text-5xl font-semibold leading-tight tracking-wide max-w-[230px]">
        {name}
      </h1>
      <figure
        class="
  flex justify-center absolute 
  top-0 right-4 w-32 h-80 z-10 
  after:bg-gradient-to-b after:from-purple-600 after:to-transparent after:w-5/6 after:absolute after:top-0 after:h-full"
      >
        <LogoIcon
          classList={["relative", "top-8", "z-[4]"]}
          width={74}
          height={74}
        />
        <img
          class="absolute bottom-[-70px] scale-110"
          src="/imgs/pordiu.png"
          alt="Arturobobo"
        />
      </figure>
      <p class="text-2xl font-medium flex flex-col mt-32">
        <span class="flex gap-2">
          Front End{" "}
          <b
            style={"--characters:9ch"}
            class="text-purple-600 animate-typing overflow-hidden whitespace-nowrap"
          >
            Developer
          </b>
        </span>
        <span class="flex gap-2">
          Content{" "}
          <b
            style={"--characters:7ch"}
            class="text-yellow-300 w-0 animate-typing animation-delay-500 overflow-hidden whitespace-nowrap"
          >
            Creator
          </b>
        </span>
        <span class="flex gap-2">
          Tech{" "}
          <b
            style={"--characters:5ch"}
            class="text-red-600 w-0 animate-typing animation-delay-1000 overflow-hidden whitespace-nowrap"
          >
            Lover
          </b>
        </span>
      </p>
    </header>
  );
});
