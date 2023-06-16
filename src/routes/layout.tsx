import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: "vale vale entendí",
  };
});

export default component$(() => {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Slot />
      </main>
      {/* <Footer /> */}
    </>
  );
});
