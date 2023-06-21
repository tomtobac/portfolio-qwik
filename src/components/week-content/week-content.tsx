import { JSXNode, Slot, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
// import { TwitchIcon } from "~/icons/twitch-icon";
import ChartJS from "chart.js/auto";
import { IoTrendingUp } from "@qwikest/icons/ionicons";

interface SocialMediaStatsProps {
  totalViewCount: number;
  platform: string;
  icon: JSXNode 
}

const transformarNumero = (numero:number) => {
  if (numero >= 1000000) {
    return (numero / 1000000).toFixed(1) + 'M';
  } else if (numero >= 1000) {
    return (numero / 1000).toFixed(1) + 'K';
  }
  
  return numero.toString();
}


const Chart = component$(() => {
  const canvasRef = useSignal<HTMLCanvasElement>();

  useVisibleTask$(() => {
    if (!canvasRef.value) return;
    const ctx = canvasRef.value.getContext("2d");
    if (!ctx) return;
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    gradient.addColorStop(0, "#5F439E");
    gradient.addColorStop(0.6, "rgba(95, 67, 158, 0.1)");

    const data = [10, 30, 20, 30, 30, 40, 30];

    new ChartJS(canvasRef.value, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Views",
            data: data,
            borderColor: "#5F439E",
            backgroundColor: gradient,
            tension: 0.3,
            fill: "start",
            pointRadius(ctx) {
              if (ctx.dataIndex === data.length - 1) {
                return 4;
              }
              return 0;
            },
            borderCapStyle: "round",
            borderWidth: 2,
            pointBackgroundColor: "#FFF",
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  });

  return (
    <div class="w-full">
      <canvas width={100} ref={canvasRef} />
    </div>
  );
});

const Card = component$<{}>(() => {
  return (
    <article class="bg-stone-900 border border-stone-800 shadow-2xl rounded">
      <Slot />
    </article>
  );
});

const SocialMediaStats = component$<SocialMediaStatsProps>((props) => {
  return (
    <Card>
      <div class="flex gap-3 p-4">
        <div class="flex flex-col justify-between flex-shrink-0">
          <div class="mb-4 flex gap-2">
            {props.icon}
            <span class="text-lg font-bold">{props.platform}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-slate-400 text-xs">Total Views</span>
            <span class="text-white font-bold font-mono text-3xl">{transformarNumero(props.totalViewCount)}</span>
          </div>
        </div>
        <div class="flex-grow flex flex-col gap-3 items-end">
          <div class="flex flex-col">
            <div class="flex align-middle gap-2">
              <IoTrendingUp class="text-green-400" />
              <span class="text-sm font-mono text-right">12.5%</span>
            </div>
            <span class="text-slate-400 text-xs">vs last week</span>
          </div>
          <Chart />
        </div>
      </div>
    </Card>
  );
});

export default component$<SocialMediaStatsProps>((props) => {
  console.log('asfasfasf', props)
  return (
    <div class="my-12 px-3 flex">
      <div class="flex flex-col sm:flex-row gap-3 w-full">
        <SocialMediaStats platform={props.platform} totalViewCount={props.totalViewCount} icon={props.icon}/>
      </div>
    </div>
  );
});
